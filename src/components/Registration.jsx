import { useMemo, useState } from "react";
import upiQr from "../assets/upi-qr.png";
import RegistrationPass from "./RegistrationPass";

const WHATSAPP_COMMUNITY_URL =
  import.meta.env.VITE_WHATSAPP_COMMUNITY_URL || "";

const UPI_ID = "Registration is Over";

const REGISTRATION_FEES = {
  2: 100,
  3: 150,
  4: 200,
};

const STEPS = [
  { number: 1, label: "Team" },
  { number: 2, label: "Participants" },
  { number: 3, label: "Requirements" },
  { number: 4, label: "Payment" },
];

const REQUIRED_PARTICIPANT_FIELDS = [
  "fullName",
  "email",
  "phone",
  "institution",
  "courseProgramme",
  "departmentBranch",
  "yearSemester",
];

const createParticipant = () => ({
  fullName: "",
  email: "",
  phone: "",
  institution: "",
  courseProgramme: "",
  departmentBranch: "",
  yearSemester: "",
  github: "",
  linkedin: "",
});

function FormField({
  label,
  optional = false,
  ...inputProps
}) {
  return (
    <label className="tez-form-field">
      <span>
        {label}

        {optional && (
          <small>Optional</small>
        )}
      </span>

      <input {...inputProps} />
    </label>
  );
}

function Registration({
  showHeading = true,
}) {
  const [
    currentStep,
    setCurrentStep,
  ] = useState(1);

  const [
    activeParticipant,
    setActiveParticipant,
  ] = useState(0);

  const [team, setTeam] = useState({
    teamName: "",
    teamSize: 2,
    primaryInstitution: "",
    city: "",
    state: "",
  });

  const [
    participants,
    setParticipants,
  ] = useState([
    createParticipant(),
    createParticipant(),
  ]);

  const [
    accommodation,
    setAccommodation,
  ] = useState({
    required: false,
    people: 1,
    days: 1,
  });

  const [food, setFood] = useState({
    required: false,
    people: 1,
    days: 1,
  });

  const [
    transactionId,
    setTransactionId,
  ] = useState("");

  const [
    submitting,
    setSubmitting,
  ] = useState(false);

  const [
    formMessage,
    setFormMessage,
  ] = useState("");

  const [success, setSuccess] =
    useState(null);

  const [
    upiCopied,
    setUpiCopied,
  ] = useState(false);

  /*
   * Hidden bot field.
   * Real users will never interact with it.
   */
  const [website, setWebsite] =
    useState("");

  const costs = useMemo(() => {
    const registration =
      REGISTRATION_FEES[
        Number(team.teamSize)
      ];

    const accommodationCost =
      accommodation.required
        ? Number(
            accommodation.people
          ) *
          Number(
            accommodation.days
          ) *
          100
        : 0;

    const foodCost =
      food.required
        ? Number(food.people) *
          Number(food.days) *
          100
        : 0;

    return {
      registration,
      accommodation:
        accommodationCost,
      food: foodCost,

      total:
        registration +
        accommodationCost +
        foodCost,
    };
  }, [
    team.teamSize,
    accommodation,
    food,
  ]);

  function participantLabel(index) {
    return index === 0
      ? "Team Leader"
      : `Member ${index + 1}`;
  }

  function scrollToRegistration() {
    window.setTimeout(() => {
      document
        .querySelector(
          ".tez-stepper"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 0);
  }

  function changeTeamField(event) {
    const { name, value } =
      event.target;

    setTeam((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function changeTeamSize(event) {
    const newSize = Number(
      event.target.value
    );

    setTeam((current) => ({
      ...current,
      teamSize: newSize,
    }));

    setParticipants((current) =>
      Array.from(
        { length: newSize },
        (_, index) =>
          current[index] ||
          createParticipant()
      )
    );

    setActiveParticipant(
      (current) =>
        Math.min(
          current,
          newSize - 1
        )
    );

    setAccommodation(
      (current) => ({
        ...current,

        people: Math.min(
          Number(current.people),
          newSize
        ),
      })
    );

    setFood((current) => ({
      ...current,

      people: Math.min(
        Number(current.people),
        newSize
      ),
    }));
  }

  function changeParticipant(
    index,
    event
  ) {
    const { name, value } =
      event.target;

    setParticipants(
      (current) =>
        current.map(
          (
            participant,
            participantIndex
          ) =>
            participantIndex ===
            index
              ? {
                  ...participant,
                  [name]: value,
                }
              : participant
        )
    );
  }

  function copyPrimaryInstitution(
    index
  ) {
    setParticipants(
      (current) =>
        current.map(
          (
            participant,
            participantIndex
          ) =>
            participantIndex ===
            index
              ? {
                  ...participant,

                  institution:
                    team.primaryInstitution,
                }
              : participant
        )
    );
  }

  function changeAccommodation(
    event
  ) {
    const {
      name,
      type,
      checked,
      value,
    } = event.target;

    setAccommodation(
      (current) => ({
        ...current,

        [name]:
          type === "checkbox"
            ? checked
            : Number(value),
      })
    );
  }

  function changeFood(event) {
    const {
      name,
      type,
      checked,
      value,
    } = event.target;

    setFood((current) => ({
      ...current,

      [name]:
        type === "checkbox"
          ? checked
          : Number(value),
    }));
  }

  function validateTeamStep() {
    const requiredFields = [
      team.teamName,
      team.primaryInstitution,
      team.city,
      team.state,
    ];

    const hasMissingField =
      requiredFields.some(
        (value) =>
          !String(value).trim()
      );

    if (hasMissingField) {
      return "Please complete all team information.";
    }

    return "";
  }

  function validateParticipantsStep() {
    for (
      let index = 0;
      index < participants.length;
      index += 1
    ) {
      const participant =
        participants[index];

      const hasMissingField =
        REQUIRED_PARTICIPANT_FIELDS.some(
          (field) =>
            !String(
              participant[field]
            ).trim()
        );

      if (hasMissingField) {
        setActiveParticipant(
          index
        );

        return `Please complete all required fields for ${participantLabel(
          index
        )}.`;
      }

      const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          participant.email.trim()
        );

      if (!validEmail) {
        setActiveParticipant(
          index
        );

        return `Please enter a valid email address for ${participantLabel(
          index
        )}.`;
      }

      const phoneDigits =
        participant.phone.replace(
          /\D/g,
          ""
        );

      if (
        phoneDigits.length < 7 ||
        phoneDigits.length > 15
      ) {
        setActiveParticipant(
          index
        );

        return `Please enter a valid phone number for ${participantLabel(
          index
        )}.`;
      }
    }

    return "";
  }

  function validateRequirementsStep() {
    if (
      accommodation.required &&
      Number(
        accommodation.people
      ) > Number(team.teamSize)
    ) {
      return "Accommodation participants cannot exceed the team size.";
    }

    if (
      accommodation.required &&
      Number(
        accommodation.days
      ) < 1
    ) {
      return "Enter the required number of accommodation days.";
    }

    if (
      food.required &&
      Number(food.people) >
        Number(team.teamSize)
    ) {
      return "Food participants cannot exceed the team size.";
    }

    if (
      food.required &&
      Number(food.days) < 1
    ) {
      return "Enter the required number of food days.";
    }

    return "";
  }

  function validatePaymentStep() {
    const cleanedTransactionId =
      transactionId.trim();

    if (!cleanedTransactionId) {
      return "Please enter the Transaction ID or UTR.";
    }

    if (
      !/^[A-Za-z0-9._/-]{6,80}$/.test(
        cleanedTransactionId
      )
    ) {
      return "Please enter a valid Transaction ID or UTR.";
    }

    return "";
  }

  function validateCurrentStep() {
    if (currentStep === 1) {
      return validateTeamStep();
    }

    if (currentStep === 2) {
      return validateParticipantsStep();
    }

    if (currentStep === 3) {
      return validateRequirementsStep();
    }

    if (currentStep === 4) {
      return validatePaymentStep();
    }

    return "";
  }

  function moveToStep(step) {
    setCurrentStep(step);
    setFormMessage("");
    scrollToRegistration();
  }

  function goNext() {
    const validationMessage =
      validateCurrentStep();

    if (validationMessage) {
      setFormMessage(
        validationMessage
      );

      scrollToRegistration();

      return;
    }

    if (currentStep < 4) {
      moveToStep(
        currentStep + 1
      );
    }
  }

  function goBack() {
    if (currentStep > 1) {
      moveToStep(
        currentStep - 1
      );
    }
  }

  async function copyUpiId() {
    if (!UPI_ID) {
      return;
    }

    try {
      await navigator.clipboard.writeText(
        UPI_ID
      );

      setUpiCopied(true);

      window.setTimeout(() => {
        setUpiCopied(false);
      }, 1800);
    } catch {
      setFormMessage(
        "The UPI ID could not be copied. Please copy it manually."
      );
    }
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    if (currentStep < 4) {
      goNext();
      return;
    }

    setFormMessage("");

    const validationMessage =
      validateCurrentStep();

    if (validationMessage) {
      setFormMessage(
        validationMessage
      );

      scrollToRegistration();

      return;
    }

    const payload = {
      teamName:
        team.teamName.trim(),

      teamSize:
        Number(team.teamSize),

      primaryInstitution:
        team.primaryInstitution.trim(),

      city: team.city.trim(),

      state: team.state.trim(),

      participants:
        participants.map(
          (
            participant,
            index
          ) => ({
            role:
              participantLabel(
                index
              ),

            fullName:
              participant.fullName.trim(),

            email:
              participant.email.trim(),

            phone:
              participant.phone.trim(),

            institution:
              participant.institution.trim(),

            courseProgramme:
              participant.courseProgramme.trim(),

            departmentBranch:
              participant.departmentBranch.trim(),

            yearSemester:
              participant.yearSemester.trim(),

            github:
              participant.github.trim(),

            linkedin:
              participant.linkedin.trim(),
          })
        ),

      accommodation: {
        required:
          accommodation.required,

        people:
          accommodation.required
            ? Number(
                accommodation.people
              )
            : 0,

        days:
          accommodation.required
            ? Number(
                accommodation.days
              )
            : 0,
      },

      food: {
        required:
          food.required,

        people:
          food.required
            ? Number(food.people)
            : 0,

        days:
          food.required
            ? Number(food.days)
            : 0,
      },

      transactionId:
        transactionId.trim(),

      website,
    };

    try {
      setSubmitting(true);

      /*
       * The browser now sends data
       * only to the Vercel function.
       *
       * The Apps Script URL and secret
       * are never sent to the browser.
       */
      const response =
        await fetch(
          "/api/register",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                payload
              ),
          }
        );

      const result =
        await response
          .json()
          .catch(() => ({
            success: false,

            message:
              "The registration service returned an invalid response.",
          }));

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ||
            "Registration could not be submitted."
        );
      }

      if (
        !result.registrationId
      ) {
        throw new Error(
          "The registration was received, but no registration ID was returned. Please contact the organizing team before submitting again."
        );
      }

      setSuccess({
        teamName:
          team.teamName.trim(),

        teamSize:
          Number(
            team.teamSize
          ),

        registrationId:
          result.registrationId,

        totalAmount:
          result.totalAmount ??
          costs.total,

        paymentStatus:
          result.paymentStatus ||
          "Pending Verification",
      });
    } catch (error) {
      setFormMessage(
        error?.message ||
          "Registration could not be submitted. Please try again."
      );

      scrollToRegistration();
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <section
        className="tez-content-panel tez-registration"
        id="registration"
      >
        <div className="tez-registration-success">
          <span className="tez-success-mark">
            ✓
          </span>

          <p className="tez-handwritten-label">
            Registration Submitted
          </p>

          <h2>
            Thank you,{" "}
            {success.teamName}.
          </h2>

          <p>
            Your payment has been
            submitted for manual
            verification.
          </p>

          <RegistrationPass
            registrationId={
              success.registrationId
            }
            teamName={
              success.teamName
            }
            teamSize={
              success.teamSize
            }
            totalAmount={
              success.totalAmount
            }
            paymentStatus={
              success.paymentStatus
            }
          />

          {WHATSAPP_COMMUNITY_URL ? (
            <a
              className="tez-whatsapp-button"
              href={
                WHATSAPP_COMMUNITY_URL
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              Join WhatsApp Community
            </a>
          ) : (
            <button
              className="tez-whatsapp-button is-disabled"
              type="button"
              disabled
            >
              WhatsApp Community,
              Coming Soon
            </button>
          )}
        </div>
      </section>
    );
  }

  const participant =
    participants[
      activeParticipant
    ];

  return (
    <section
      className="tez-content-panel tez-registration"
      id="registration"
    >
      {showHeading && (
        <div className="tez-section-heading">
          <span className="tez-section-number">
            03
          </span>

          <div>
            <p className="tez-handwritten-label">
              Registration
            </p>

            <h2>
              Register your team.
            </h2>
          </div>
        </div>
      )}

      <form
        className="tez-registration-form"
        onSubmit={handleSubmit}
      >
        {/*
         * Honeypot field.
         * Keep this hidden field.
         */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(event) =>
            setWebsite(
              event.target.value
            )
          }
          tabIndex="-1"
          autoComplete="off"
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        <div className="tez-stepper">
          {STEPS.map((step) => {
            const isActive =
              currentStep ===
              step.number;

            const isComplete =
              currentStep >
              step.number;

            return (
              <button
                type="button"
                key={step.number}
                className={[
                  "tez-step-button",

                  isActive
                    ? "is-active"
                    : "",

                  isComplete
                    ? "is-complete"
                    : "",
                ].join(" ")}
                disabled={
                  step.number >
                  currentStep
                }
                onClick={() =>
                  moveToStep(
                    step.number
                  )
                }
              >
                <span>
                  {step.number}
                </span>

                <strong>
                  {step.label}
                </strong>
              </button>
            );
          })}
        </div>

        {formMessage && (
          <p
            className="tez-form-message"
            role="alert"
          >
            {formMessage}
          </p>
        )}

        <div className="tez-wizard-shell">
          {currentStep === 1 && (
            <fieldset className="tez-form-block">
              <legend>
                Team Information
              </legend>

              <p className="tez-step-description">
                Start with the basic
                information about your
                team.
              </p>

              <div className="tez-form-grid">
                <FormField
                  label="Team Name"
                  name="teamName"
                  value={
                    team.teamName
                  }
                  onChange={
                    changeTeamField
                  }
                  maxLength={80}
                  required
                />

                <label className="tez-form-field">
                  <span>
                    Team Size
                  </span>

                  <select
                    name="teamSize"
                    value={
                      team.teamSize
                    }
                    onChange={
                      changeTeamSize
                    }
                  >
                    <option value={2}>
                      2 Members
                    </option>

                    <option value={3}>
                      3 Members
                    </option>

                    <option value={4}>
                      4 Members
                    </option>
                  </select>
                </label>

                <FormField
                  label="Primary Institution"
                  name="primaryInstitution"
                  value={
                    team.primaryInstitution
                  }
                  onChange={
                    changeTeamField
                  }
                  maxLength={150}
                  required
                />

                <FormField
                  label="City"
                  name="city"
                  value={team.city}
                  onChange={
                    changeTeamField
                  }
                  maxLength={80}
                  required
                />

                <FormField
                  label="State"
                  name="state"
                  value={team.state}
                  onChange={
                    changeTeamField
                  }
                  maxLength={80}
                  required
                />
              </div>
            </fieldset>
          )}

          {currentStep === 2 && (
            <div className="tez-participant-step">
              <div className="tez-member-tabs">
                {participants.map(
                  (_, index) => (
                    <button
                      type="button"
                      key={index}
                      className={
                        activeParticipant ===
                        index
                          ? "is-active"
                          : ""
                      }
                      onClick={() => {
                        setActiveParticipant(
                          index
                        );

                        setFormMessage(
                          ""
                        );
                      }}
                    >
                      <span>
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      {participantLabel(
                        index
                      )}
                    </button>
                  )
                )}
              </div>

              <article className="tez-active-participant">
                <header className="tez-active-member-header">
                  <div>
                    <span>
                      Participant{" "}
                      {activeParticipant +
                        1}{" "}
                      of{" "}
                      {team.teamSize}
                    </span>

                    <h3>
                      {participantLabel(
                        activeParticipant
                      )}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      copyPrimaryInstitution(
                        activeParticipant
                      )
                    }
                  >
                    Use Primary
                    Institution
                  </button>
                </header>

                <div className="tez-form-grid">
                  <FormField
                    label="Full Name"
                    name="fullName"
                    value={
                      participant.fullName
                    }
                    onChange={(
                      event
                    ) =>
                      changeParticipant(
                        activeParticipant,
                        event
                      )
                    }
                    maxLength={100}
                    required
                  />

                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={
                      participant.email
                    }
                    onChange={(
                      event
                    ) =>
                      changeParticipant(
                        activeParticipant,
                        event
                      )
                    }
                    maxLength={254}
                    autoComplete="email"
                    required
                  />

                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={
                      participant.phone
                    }
                    onChange={(
                      event
                    ) =>
                      changeParticipant(
                        activeParticipant,
                        event
                      )
                    }
                    maxLength={20}
                    inputMode="tel"
                    autoComplete="tel"
                    required
                  />

                  <FormField
                    label="Institution"
                    name="institution"
                    value={
                      participant.institution
                    }
                    onChange={(
                      event
                    ) =>
                      changeParticipant(
                        activeParticipant,
                        event
                      )
                    }
                    maxLength={150}
                    required
                  />

                  <FormField
                    label="Course / Programme"
                    name="courseProgramme"
                    value={
                      participant.courseProgramme
                    }
                    onChange={(
                      event
                    ) =>
                      changeParticipant(
                        activeParticipant,
                        event
                      )
                    }
                    maxLength={120}
                    required
                  />

                  <FormField
                    label="Department / Branch"
                    name="departmentBranch"
                    value={
                      participant.departmentBranch
                    }
                    onChange={(
                      event
                    ) =>
                      changeParticipant(
                        activeParticipant,
                        event
                      )
                    }
                    maxLength={120}
                    required
                  />

                  <FormField
                    label="Year / Semester"
                    name="yearSemester"
                    value={
                      participant.yearSemester
                    }
                    onChange={(
                      event
                    ) =>
                      changeParticipant(
                        activeParticipant,
                        event
                      )
                    }
                    maxLength={60}
                    required
                  />
                </div>

                <details className="tez-optional-profiles">
                  <summary>
                    Optional Profiles
                  </summary>

                  <div className="tez-form-grid">
                    <FormField
                      label="GitHub Profile"
                      name="github"
                      type="url"
                      value={
                        participant.github
                      }
                      onChange={(
                        event
                      ) =>
                        changeParticipant(
                          activeParticipant,
                          event
                        )
                      }
                      maxLength={300}
                      placeholder="https://github.com/username"
                      optional
                    />

                    <FormField
                      label="LinkedIn Profile"
                      name="linkedin"
                      type="url"
                      value={
                        participant.linkedin
                      }
                      onChange={(
                        event
                      ) =>
                        changeParticipant(
                          activeParticipant,
                          event
                        )
                      }
                      maxLength={300}
                      placeholder="https://linkedin.com/in/username"
                      optional
                    />
                  </div>
                </details>

                <div className="tez-member-controls">
                  <button
                    type="button"
                    disabled={
                      activeParticipant ===
                      0
                    }
                    onClick={() =>
                      setActiveParticipant(
                        (current) =>
                          current - 1
                      )
                    }
                  >
                    Previous Member
                  </button>

                  <button
                    type="button"
                    disabled={
                      activeParticipant ===
                      participants.length -
                        1
                    }
                    onClick={() =>
                      setActiveParticipant(
                        (current) =>
                          current + 1
                      )
                    }
                  >
                    Next Member
                  </button>
                </div>
              </article>
            </div>
          )}

          {currentStep === 3 && (
            <div className="tez-requirements-step">
              <div className="tez-extra-grid">
                <article className="tez-extra-card">
                  <label className="tez-checkbox">
                    <input
                      type="checkbox"
                      name="required"
                      checked={
                        accommodation.required
                      }
                      onChange={
                        changeAccommodation
                      }
                    />

                    <span>
                      Accommodation
                      required
                    </span>
                  </label>

                  <p>
                    ₹100 per person
                    per day
                  </p>

                  {accommodation.required && (
                    <div className="tez-extra-fields">
                      <label className="tez-form-field">
                        <span>
                          Number of
                          People
                        </span>

                        <select
                          name="people"
                          value={
                            accommodation.people
                          }
                          onChange={
                            changeAccommodation
                          }
                        >
                          {Array.from(
                            {
                              length:
                                Number(
                                  team.teamSize
                                ),
                            },

                            (
                              _,
                              index
                            ) =>
                              index + 1
                          ).map(
                            (
                              number
                            ) => (
                              <option
                                value={
                                  number
                                }
                                key={
                                  number
                                }
                              >
                                {number}
                              </option>
                            )
                          )}
                        </select>
                      </label>

                      <FormField
                        label="Number of Days"
                        name="days"
                        type="number"
                        min="1"
                        max="30"
                        value={
                          accommodation.days
                        }
                        onChange={
                          changeAccommodation
                        }
                        required
                      />
                    </div>
                  )}
                </article>

                <article className="tez-extra-card">
                  <label className="tez-checkbox">
                    <input
                      type="checkbox"
                      name="required"
                      checked={
                        food.required
                      }
                      onChange={
                        changeFood
                      }
                    />

                    <span>
                      Food required
                    </span>
                  </label>

                  <p>
                    ₹100 per person
                    per day
                  </p>

                  {food.required && (
                    <div className="tez-extra-fields">
                      <label className="tez-form-field">
                        <span>
                          Number of
                          People
                        </span>

                        <select
                          name="people"
                          value={
                            food.people
                          }
                          onChange={
                            changeFood
                          }
                        >
                          {Array.from(
                            {
                              length:
                                Number(
                                  team.teamSize
                                ),
                            },

                            (
                              _,
                              index
                            ) =>
                              index + 1
                          ).map(
                            (
                              number
                            ) => (
                              <option
                                value={
                                  number
                                }
                                key={
                                  number
                                }
                              >
                                {number}
                              </option>
                            )
                          )}
                        </select>
                      </label>

                      <FormField
                        label="Number of Days"
                        name="days"
                        type="number"
                        min="1"
                        max="30"
                        value={
                          food.days
                        }
                        onChange={
                          changeFood
                        }
                        required
                      />
                    </div>
                  )}
                </article>
              </div>

              <section className="tez-price-card tez-wide-price-card">
                <p className="tez-handwritten-label">
                  Price Summary
                </p>

                <div>
                  <span>
                    Team Registration
                  </span>

                  <strong>
                    ₹
                    {
                      costs.registration
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Accommodation
                  </span>

                  <strong>
                    ₹
                    {
                      costs.accommodation
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Food
                  </span>

                  <strong>
                    ₹{costs.food}
                  </strong>
                </div>

                <div className="tez-total-row">
                  <span>
                    Total
                  </span>

                  <strong>
                    ₹{costs.total}
                  </strong>
                </div>
              </section>
            </div>
          )}

          {currentStep === 4 && (
            <div className="tez-payment-layout">
              <section className="tez-review-card">
                <p className="tez-handwritten-label">
                  Review
                </p>

                <div className="tez-review-row">
                  <span>
                    Team
                  </span>

                  <strong>
                    {team.teamName}
                  </strong>
                </div>

                <div className="tez-review-row">
                  <span>
                    Team Size
                  </span>

                  <strong>
                    {team.teamSize}{" "}
                    Members
                  </strong>
                </div>

                <div className="tez-review-row">
                  <span>
                    Institution
                  </span>

                  <strong>
                    {
                      team.primaryInstitution
                    }
                  </strong>
                </div>

                <div className="tez-review-members">
                  <span>
                    Participants
                  </span>

                  {participants.map(
                    (
                      member,
                      index
                    ) => (
                      <div
                        key={index}
                      >
                        <strong>
                          {participantLabel(
                            index
                          )}
                        </strong>

                        <p>
                          {
                            member.fullName
                          }

                          <small>
                            {
                              member.email
                            }
                          </small>
                        </p>
                      </div>
                    )
                  )}
                </div>

                <div className="tez-review-row">
                  <span>
                    Accommodation
                  </span>

                  <strong>
                    {accommodation.required
                      ? `${accommodation.people} people, ${accommodation.days} days`
                      : "Not Required"}
                  </strong>
                </div>

                <div className="tez-review-row">
                  <span>
                    Food
                  </span>

                  <strong>
                    {food.required
                      ? `${food.people} people, ${food.days} days`
                      : "Not Required"}
                  </strong>
                </div>

                <div className="tez-review-row tez-review-total">
                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{costs.total}
                  </strong>
                </div>
              </section>

              <section className="tez-payment-card">
                <p className="tez-handwritten-label">
                  UPI Payment
                </p>

                <div className="tez-payment-total">
                  <span>
                    Amount to Pay
                  </span>

                  <strong>
                    ₹{costs.total}
                  </strong>
                </div>

                <div className="tez-qr-container">
                  <img
                    src={upiQr}
                    alt="TEZHACK 2026 UPI payment QR code"
                  />
                </div>

                <div className="tez-upi-id-box">
                  <span>
                    UPI ID
                  </span>

                  <div className="tez-upi-copy-row">
                    <code>
                      {UPI_ID ||
                        "To Be Added"}
                    </code>

                    <button
                      type="button"
                      onClick={
                        copyUpiId
                      }
                      disabled={
                        !UPI_ID
                      }
                    >
                      {upiCopied
                        ? "Copied"
                        : "Copy"}
                    </button>
                  </div>
                </div>

                <FormField
                  label="Transaction ID / UTR"
                  name="transactionId"
                  value={
                    transactionId
                  }
                  onChange={(
                    event
                  ) =>
                    setTransactionId(
                      event.target
                        .value
                    )
                  }
                  maxLength={80}
                  autoComplete="off"
                  required
                />

                <p className="tez-payment-note">
                  Payment will be marked
                  as Pending Verification
                  and manually checked by
                  the organizing team.
                </p>
              </section>
            </div>
          )}
        </div>

        <footer className="tez-wizard-footer">
          <button
            className="tez-back-button"
            type="button"
            onClick={goBack}
            disabled={
              currentStep === 1 ||
              submitting
            }
          >
            Back
          </button>

          <div className="tez-live-total">
            <span>
              Current Total
            </span>

            <strong>
              ₹{costs.total}
            </strong>
          </div>

          {currentStep < 4 ? (
            <button
              className="tez-continue-button"
              type="button"
              onClick={goNext}
              disabled={submitting}
            >
              Continue
            </button>
          ) : (
            <button
              className="tez-continue-button"
              type="submit"
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Registration"}
            </button>
          )}
        </footer>
      </form>
    </section>
  );
}

export default Registration;
