import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  JUDGING_STORAGE,
} from "../data/judgingTeams";

import {
  judgingApi,
} from "../services/judgingApi";

import "./judging.css";


export default function JudgingPanelPage() {
  const navigate =
    useNavigate();


  const panel =
    sessionStorage.getItem(
      JUDGING_STORAGE.PANEL
    );


  const [
    panelData,
    setPanelData,
  ] = useState(null);


  const [
    selectedTeamId,
    setSelectedTeamId,
  ] = useState("");


  const [
    scoreInput,
    setScoreInput,
  ] = useState("");


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    saving,
    setSaving,
  ] = useState(false);


  const [
    message,
    setMessage,
  ] = useState("");


  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    if (
      panel !== "GROUP_1" &&
      panel !== "GROUP_2"
    ) {
      navigate(
        "/judging",
        {
          replace: true,
        }
      );

      return;
    }


    loadPanel();

  }, []);


  async function loadPanel() {
    setLoading(true);
    setError("");


    try {
      const data =
        await judgingApi
          .getPanelState(
            panel
          );


      setPanelData(data);


      const pending =
        data.teams.find(
          (team) =>
            !team.scored
        );


      const first =
        pending ||
        data.teams[0];


      if (first) {
        setSelectedTeamId(
          first.id
        );

        setScoreInput(
          first.score ?? ""
        );
      }

    } catch (err) {
      setError(
        err.message
      );

    } finally {
      setLoading(false);
    }
  }


  const selectedTeam =
    panelData?.teams.find(
      (team) =>
        team.id ===
        selectedTeamId
    );


  const orderedTeams =
    useMemo(() => {

      if (!panelData) {
        return [];
      }


      return [
        ...panelData.teams.filter(
          (team) =>
            !team.scored
        ),

        ...panelData.teams.filter(
          (team) =>
            team.scored
        ),
      ];

    }, [panelData]);


  function chooseTeam(
    teamId
  ) {
    setSelectedTeamId(
      teamId
    );


    const team =
      panelData.teams.find(
        (item) =>
          item.id === teamId
      );


    setScoreInput(
      team?.score ?? ""
    );


    setMessage("");
    setError("");
  }


  async function saveScore(
    event
  ) {
    event.preventDefault();


    if (!selectedTeam) {
      setError(
        "Select a team."
      );

      return;
    }


    const score =
      Number(scoreInput);


    if (
      !Number.isFinite(score) ||
      score < 0 ||
      score > 100
    ) {
      setError(
        "Enter a score between 0 and 100."
      );

      return;
    }


    setSaving(true);
    setError("");
    setMessage("");


    try {
      const data =
        await judgingApi
          .saveScore(
            panel,
            selectedTeam.id,
            score
          );


      setPanelData(data);


      setMessage(
        `${selectedTeam.name} saved: ${score}/100`
      );


      const next =
        data.teams.find(
          (team) =>
            !team.scored
        );


      if (next) {
        setSelectedTeamId(
          next.id
        );

        setScoreInput(
          next.score ?? ""
        );

      } else {

        const current =
          data.teams.find(
            (team) =>
              team.id ===
              selectedTeam.id
          );


        setScoreInput(
          current?.score ?? score
        );
      }

    } catch (err) {
      setError(
        err.message
      );

    } finally {
      setSaving(false);
    }
  }


  async function completePanel() {
    if (
      panelData.pending > 0
    ) {
      return;
    }


    const confirmed =
      window.confirm(
        "Complete and lock this panel?"
      );


    if (!confirmed) {
      return;
    }


    try {
      const data =
        await judgingApi
          .completePanel(
            panel
          );


      setPanelData(data);


      setMessage(
        "Panel completed and scores locked."
      );

    } catch (err) {
      setError(
        err.message
      );
    }
  }


  function logout() {
    sessionStorage.removeItem(
      JUDGING_STORAGE.PANEL
    );


    navigate(
      "/judging"
    );
  }


  if (loading) {
    return (
      <main className="judge-page">

        <section className="judge-content-card">

          <p className="judge-handwritten">
            TEZHACK 2026
          </p>

          <h2>
            LOADING PANEL...
          </h2>

        </section>

      </main>
    );
  }


  if (!panelData) {
    return (
      <main className="judge-page">

        <section className="judge-content-card">

          <div className="judge-error">
            {error}
          </div>

        </section>

      </main>
    );
  }


  const progress =
    panelData.total
      ? Math.round(
          (
            panelData.scored /
            panelData.total
          ) *
            100
        )
      : 0;


  return (
    <main className="judge-page">

      <section className="judge-panel-hero">

        <div>

          <p className="judge-handwritten">
            TEZHACK 2026
          </p>

          <h1>
            JUDGING

            <span>
              {panel ===
              "GROUP_1"
                ? "GROUP 01"
                : "GROUP 02"}
            </span>

          </h1>

        </div>


        <button
          className="judge-secondary-button"
          onClick={logout}
        >
          LOG OUT
        </button>


        <div className="judge-progress-area">

          <div className="judge-progress-heading">

            <strong>
              {panelData.scored}
            </strong>

            <span>
              / {panelData.total} SCORED
            </span>

          </div>


          <div className="judge-progress-bar">

            <span
              style={{
                width:
                  `${progress}%`,
              }}
            />

          </div>


          <small>
            {panelData.pending === 0
              ? "All assigned teams scored."
              : `${panelData.pending} team(s) remaining`}
          </small>

        </div>

      </section>


      <section className="judge-content-card">

        <div className="judge-section-heading">

          <span className="judge-section-number">
            01
          </span>

          <div>

            <p className="judge-handwritten">
              Team scoring
            </p>

            <h2>
              ENTER TOTAL MARKS
            </h2>

          </div>

        </div>


        {panelData.completed ? (

          <div className="judge-locked">

            <strong>
              PANEL JUDGING COMPLETE
            </strong>

            <p>
              Scores for this panel are locked.
            </p>

          </div>

        ) : (

          <form
            className="judge-score-form"
            onSubmit={saveScore}
          >

            <label className="judge-field">

              <span>
                SELECT TEAM
              </span>

              <select
                value={selectedTeamId}
                onChange={(event) =>
                  chooseTeam(
                    event.target.value
                  )
                }
              >

                {orderedTeams.map(
                  (team) => (

                    <option
                      key={team.id}
                      value={team.id}
                    >
                      {team.scored
                        ? "✓ "
                        : ""}

                      {team.id}
                      {" | "}
                      {team.name}
                    </option>

                  )
                )}

              </select>

            </label>


            {selectedTeam && (

              <article className="judge-score-card">

                <div className="judge-score-card-top">

                  <div>

                    <span>
                      {selectedTeam.id}
                    </span>

                    <h3>
                      {selectedTeam.name}
                    </h3>

                  </div>


                  <strong
                    className={
                      selectedTeam.category ===
                      "ML"
                        ? "judge-type judge-type-ml"
                        : "judge-type judge-type-web"
                    }
                  >
                    {selectedTeam.category}
                  </strong>

                </div>


                {selectedTeam.scored && (

                  <div className="judge-existing">

                    Current score:

                    <strong>
                      {selectedTeam.score}/100
                    </strong>

                  </div>

                )}


                <div className="judge-score-input-row">

                  <label className="judge-field">

                    <span>
                      TOTAL SCORE / 100
                    </span>

                    <input
                      className="judge-score-input"
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={scoreInput}
                      onChange={(event) =>
                        setScoreInput(
                          event.target.value
                        )
                      }
                    />

                  </label>


                  <button
                    className="judge-primary-button"
                    disabled={saving}
                    type="submit"
                  >

                    <span>
                      {saving
                        ? "SAVING..."
                        : selectedTeam.scored
                          ? "UPDATE SCORE"
                          : "SAVE SCORE"}
                    </span>

                    <b>✓</b>

                  </button>

                </div>

              </article>

            )}

          </form>

        )}


        {error && (
          <div className="judge-error">
            {error}
          </div>
        )}


        {message && (
          <div className="judge-success">
            {message}
          </div>
        )}

      </section>


      <section className="judge-content-card">

        <div className="judge-section-heading">

          <span className="judge-section-number">
            02
          </span>

          <div>

            <p className="judge-handwritten">
              Panel records
            </p>

            <h2>
              RECORDED SCORES
            </h2>

          </div>

        </div>


        <div className="judge-table-wrap">

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Team</th>
                <th>Type</th>
                <th>Score</th>
                <th>Status</th>
              </tr>

            </thead>


            <tbody>

              {panelData.teams.map(
                (team) => (

                  <tr key={team.id}>

                    <td>
                      {team.id}
                    </td>

                    <td>
                      <strong>
                        {team.name}
                      </strong>
                    </td>

                    <td>
                      {team.category}
                    </td>

                    <td>
                      {team.scored
                        ? `${team.score}/100`
                        : "-"}
                    </td>

                    <td>

                      <span
                        className={
                          team.scored
                            ? "judge-status saved"
                            : "judge-status pending"
                        }
                      >
                        {team.scored
                          ? "SAVED"
                          : "PENDING"}
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </section>


      <section className="judge-content-card judge-complete-section">

        <div>

          <p className="judge-handwritten">
            Final step
          </p>

          <h2>
            COMPLETE PANEL
          </h2>

          <p>
            Complete judging only after every assigned team has a score.
          </p>

        </div>


        <div className="judge-complete-actions">

          {!panelData.completed ? (

            <button
              className="judge-lock-button"
              disabled={
                panelData.pending > 0
              }
              onClick={
                completePanel
              }
            >
              {panelData.pending > 0
                ? `${panelData.pending} SCORE(S) PENDING`
                : "COMPLETE & LOCK"}
            </button>

          ) : (

            <div className="judge-complete-badge">
              ✓ PANEL COMPLETE
            </div>

          )}


          <button
            className="judge-result-button"
            onClick={() =>
              navigate(
                "/judging/results"
              )
            }
          >
            RESULT STATUS →
          </button>

        </div>

      </section>

    </main>
  );
}