import { createHmac } from "node:crypto";

const MAX_BODY_LENGTH = 50000;

const REGISTRATION_DEADLINE = new Date(
  "2026-09-04T03:30:00.000Z"
);

const LIMITS = {
  teamName: 80,
  institution: 150,
  city: 80,
  state: 80,
  fullName: 100,
  email: 254,
  phone: 20,
  courseProgramme: 120,
  departmentBranch: 120,
  yearSemester: 60,
  profileUrl: 300,
  transactionId: 80,
};

class InputError extends Error {}

function sendJson(response, status, data) {
  response.setHeader("Cache-Control", "no-store");
  response.setHeader(
    "Content-Type",
    "application/json; charset=utf-8"
  );

  return response.status(status).json(data);
}

function getClientIp(request) {
  const forwarded =
    request.headers["x-forwarded-for"];

  if (Array.isArray(forwarded)) {
    return forwarded[0] || "unknown";
  }

  if (
    typeof forwarded === "string" &&
    forwarded.trim()
  ) {
    return forwarded.split(",")[0].trim();
  }

  return (
    request.socket?.remoteAddress ||
    "unknown"
  );
}

function createClientKey(request, secret) {
  const clientIp = getClientIp(request);

  return createHmac("sha256", secret)
    .update(clientIp)
    .digest("hex");
}

function requireObject(value, label) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    throw new InputError(
      `${label} is not valid.`
    );
  }

  return value;
}

function cleanText(
  value,
  label,
  maxLength,
  humanText = false
) {
  if (typeof value !== "string") {
    throw new InputError(
      `${label} is required.`
    );
  }

  const cleaned = value.trim();

  if (!cleaned) {
    throw new InputError(
      `${label} is required.`
    );
  }

  if (cleaned.length > maxLength) {
    throw new InputError(
      `${label} is too long.`
    );
  }

  /*
   * Prevent Google Sheets formula injection.
   */
  if (/^[=+\-@]/.test(cleaned)) {
    throw new InputError(
      `${label} contains unsupported characters.`
    );
  }

  /*
   * Reject basic HTML and script content.
   */
  if (/[<>]/.test(cleaned)) {
    throw new InputError(
      `${label} contains unsupported characters.`
    );
  }

  /*
   * Reject hidden control characters.
   */
  if (
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(
      cleaned
    )
  ) {
    throw new InputError(
      `${label} contains unsupported characters.`
    );
  }

  /*
   * Reject emoji-only or symbol-only names.
   */
  if (
    humanText &&
    !/[\p{L}\p{N}]/u.test(cleaned)
  ) {
    throw new InputError(
      `${label} must contain letters or numbers.`
    );
  }

  return cleaned;
}

function cleanOptionalUrl(value, label) {
  if (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  ) {
    return "";
  }

  const cleaned = cleanText(
    String(value),
    label,
    LIMITS.profileUrl
  );

  let parsedUrl;

  try {
    parsedUrl = new URL(cleaned);
  } catch {
    throw new InputError(
      `${label} must be a complete URL.`
    );
  }

  if (
    parsedUrl.protocol !== "http:" &&
    parsedUrl.protocol !== "https:"
  ) {
    throw new InputError(
      `${label} must use http or https.`
    );
  }

  return parsedUrl.toString();
}

function cleanRequirement(
  value,
  teamSize,
  label
) {
  const requirement = requireObject(
    value,
    `${label} information`
  );

  if (
    typeof requirement.required !==
    "boolean"
  ) {
    throw new InputError(
      `${label} information is not valid.`
    );
  }

  if (!requirement.required) {
    return {
      required: false,
      people: 0,
      days: 0,
    };
  }

  const people = Number(
    requirement.people
  );

  const days = Number(
    requirement.days
  );

  if (
    !Number.isSafeInteger(people) ||
    people < 1 ||
    people > teamSize
  ) {
    throw new InputError(
      `${label} participants must be between 1 and the selected team size.`
    );
  }

  if (
    !Number.isSafeInteger(days) ||
    days < 1 ||
    days > 30
  ) {
    throw new InputError(
      `${label} days must be between 1 and 30.`
    );
  }

  return {
    required: true,
    people,
    days,
  };
}

function cleanRegistration(input) {
  const data = requireObject(
    input,
    "Registration data"
  );

  /*
   * Hidden bot field.
   */
  if (
    String(data.website || "").trim()
  ) {
    throw new InputError(
      "Registration could not be submitted."
    );
  }

  const teamSize = Number(
    data.teamSize
  );

  if (![2, 3, 4].includes(teamSize)) {
    throw new InputError(
      "Team size must be between 2 and 4 members."
    );
  }

  if (
    !Array.isArray(data.participants) ||
    data.participants.length !== teamSize
  ) {
    throw new InputError(
      "Participant information does not match the selected team size."
    );
  }

  const participants =
    data.participants.map(
      (rawParticipant, index) => {
        const participant =
          requireObject(
            rawParticipant,
            `Participant ${index + 1}`
          );

        const role =
          index === 0
            ? "Team Leader"
            : `Member ${index + 1}`;

        const email = cleanText(
          participant.email,
          `${role} Email`,
          LIMITS.email
        ).toLowerCase();

        if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            email
          )
        ) {
          throw new InputError(
            `Enter a valid email for ${role}.`
          );
        }

        const phone = cleanText(
          participant.phone,
          `${role} Phone`,
          LIMITS.phone
        );

        const phoneDigits =
          phone.replace(/\D/g, "");

        if (
          !/^[+\d\s()-]+$/.test(phone) ||
          phoneDigits.length < 7 ||
          phoneDigits.length > 15
        ) {
          throw new InputError(
            `Enter a valid phone number for ${role}.`
          );
        }

        return {
          role,

          fullName: cleanText(
            participant.fullName,
            `${role} Full Name`,
            LIMITS.fullName,
            true
          ),

          email,
          phone,

          institution: cleanText(
            participant.institution,
            `${role} Institution`,
            LIMITS.institution,
            true
          ),

          courseProgramme: cleanText(
            participant.courseProgramme,
            `${role} Course / Programme`,
            LIMITS.courseProgramme,
            true
          ),

          departmentBranch: cleanText(
            participant.departmentBranch,
            `${role} Department / Branch`,
            LIMITS.departmentBranch,
            true
          ),

          yearSemester: cleanText(
            participant.yearSemester,
            `${role} Year / Semester`,
            LIMITS.yearSemester,
            true
          ),

          github: cleanOptionalUrl(
            participant.github,
            `${role} GitHub Profile`
          ),

          linkedin: cleanOptionalUrl(
            participant.linkedin,
            `${role} LinkedIn Profile`
          ),
        };
      }
    );

  const transactionId = cleanText(
    data.transactionId,
    "Transaction ID / UTR",
    LIMITS.transactionId
  );

  if (
    !/^[A-Za-z0-9._/-]{6,80}$/.test(
      transactionId
    )
  ) {
    throw new InputError(
      "Enter a valid Transaction ID / UTR."
    );
  }

  return {
    teamName: cleanText(
      data.teamName,
      "Team Name",
      LIMITS.teamName,
      true
    ),

    teamSize,

    primaryInstitution: cleanText(
      data.primaryInstitution,
      "Primary Institution",
      LIMITS.institution,
      true
    ),

    city: cleanText(
      data.city,
      "City",
      LIMITS.city,
      true
    ),

    state: cleanText(
      data.state,
      "State",
      LIMITS.state,
      true
    ),

    participants,

    accommodation: cleanRequirement(
      data.accommodation,
      teamSize,
      "Accommodation"
    ),

    food: cleanRequirement(
      data.food,
      teamSize,
      "Food"
    ),

    transactionId,
  };
}

function readBody(request) {
  if (
    request.body &&
    typeof request.body === "object"
  ) {
    return request.body;
  }

  if (
    typeof request.body === "string"
  ) {
    return JSON.parse(
      request.body
    );
  }

  throw new InputError(
    "Registration data is missing."
  );
}

export default async function handler(
  request,
  response
) {
  if (request.method !== "POST") {
    response.setHeader(
      "Allow",
      "POST"
    );

    return sendJson(
      response,
      405,
      {
        success: false,
        message: "Method not allowed.",
      }
    );
  }

  const scriptUrl =
    process.env.GOOGLE_SCRIPT_URL;

  const sharedSecret =
    process.env
      .APPS_SCRIPT_SHARED_SECRET;

  if (
    !scriptUrl ||
    !sharedSecret
  ) {
    return sendJson(
      response,
      503,
      {
        success: false,
        message:
          "Registration service is not configured yet.",
      }
    );
  }

  if (
    Date.now() >=
    REGISTRATION_DEADLINE.getTime()
  ) {
    return sendJson(
      response,
      403,
      {
        success: false,
        message:
          "Registration has closed.",
      }
    );
  }

  try {
    const requestBody =
      readBody(request);

    const rawBody =
      JSON.stringify(requestBody);

    if (
      rawBody.length >
      MAX_BODY_LENGTH
    ) {
      return sendJson(
        response,
        413,
        {
          success: false,
          message:
            "Registration data is too large.",
        }
      );
    }

    const registration =
      cleanRegistration(requestBody);

    const clientKey =
      createClientKey(
        request,
        sharedSecret
      );

    const appsScriptBody =
      new URLSearchParams();

    appsScriptBody.set(
      "payload",
      JSON.stringify(registration)
    );

    appsScriptBody.set(
      "serverSecret",
      sharedSecret
    );

    appsScriptBody.set(
      "clientKey",
      clientKey
    );

    const controller =
      new AbortController();

    const timeoutId =
      setTimeout(
        () => controller.abort(),
        15000
      );

    let scriptResponse;

    try {
      scriptResponse = await fetch(
        scriptUrl,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded;charset=UTF-8",
          },

          body:
            appsScriptBody.toString(),

          redirect: "follow",

          signal:
            controller.signal,
        }
      );
    } finally {
      clearTimeout(timeoutId);
    }

    const responseText =
      await scriptResponse.text();

    let result;

    try {
      result =
        JSON.parse(responseText);
    } catch {
      return sendJson(
        response,
        502,
        {
          success: false,
          message:
            "Registration service returned an invalid response.",
        }
      );
    }

    if (
      !scriptResponse.ok ||
      !result.success
    ) {
      return sendJson(
        response,
        400,
        {
          success: false,
          message:
            result.message ||
            "Registration could not be submitted.",
        }
      );
    }

    return sendJson(
      response,
      200,
      {
        success: true,

        registrationId:
          result.registrationId,

        totalAmount:
          result.totalAmount,

        paymentStatus:
          result.paymentStatus,

        message:
          result.message ||
          "Registration submitted successfully.",
      }
    );
  } catch (error) {
    console.error(
      "Registration API error:",
      error?.message || error
    );

    if (
      error?.name === "AbortError"
    ) {
      return sendJson(
        response,
        504,
        {
          success: false,
          message:
            "Registration service timed out. Please try again.",
        }
      );
    }

    if (
      error instanceof InputError ||
      error instanceof SyntaxError
    ) {
      return sendJson(
        response,
        400,
        {
          success: false,
          message:
            error.message ||
            "Registration data is invalid.",
        }
      );
    }

    return sendJson(
      response,
      502,
      {
        success: false,
        message:
          "Registration service is temporarily unavailable.",
      }
    );
  }
}