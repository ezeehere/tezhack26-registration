const API_URL =
  "/api/judging";


async function request(payload) {
  const response =
    await fetch(
      API_URL,
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


  const text =
    await response.text();


  console.log(
    "Judging server response:",
    response.status,
    text
  );


  let data;

  try {
    data =
      JSON.parse(text);

  } catch {
    throw new Error(
      `Invalid judging server response (${response.status}). Check console.`
    );
  }


  if (!response.ok) {
    throw new Error(
      data.error ||
      `Server error ${response.status}`
    );
  }


  if (!data.ok) {
    throw new Error(
      data.error ||
      "Judging request failed."
    );
  }


  return data;
}


export const judgingApi = {

  getPanelState(panel) {
    return request({
      action:
        "getPanelState",

      panel,
    });
  },


  saveScore(
    panel,
    teamId,
    score
  ) {
    return request({
      action:
        "saveScore",

      panel,
      teamId,
      score,
    });
  },


  completePanel(panel) {
    return request({
      action:
        "completePanel",

      panel,
    });
  },


  getResultsState() {
    return request({
      action:
        "getResultsState",
    });
  },

};