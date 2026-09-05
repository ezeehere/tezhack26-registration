export default async function handler(req, res) {
  // Simple browser test
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      service: "TEZHACK Judging API",
    });
  }

  // Judging website uses POST
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed.",
    });
  }

  const scriptUrl =
    process.env.JUDGING_APPS_SCRIPT_URL;

  if (!scriptUrl) {
    return res.status(500).json({
      ok: false,
      error:
        "JUDGING_APPS_SCRIPT_URL is missing on Vercel.",
    });
  }

  try {
    const appsScriptResponse =
      await fetch(scriptUrl, {
        method: "POST",

        headers: {
          "Content-Type":
            "text/plain;charset=utf-8",
        },

        body: JSON.stringify(
          req.body || {}
        ),

        redirect: "follow",
      });

    const text =
      await appsScriptResponse.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "Apps Script response:",
        text
      );

      return res.status(502).json({
        ok: false,
        error:
          "Apps Script returned an invalid response.",
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error(
      "Judging API error:",
      error
    );

    return res.status(500).json({
      ok: false,
      error:
        error?.message ||
        "Could not contact judging server.",
    });
  }
}