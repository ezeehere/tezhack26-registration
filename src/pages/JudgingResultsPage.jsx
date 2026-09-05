import {
  useEffect,
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


function average(values) {
  if (!values.length) {
    return 0;
  }

  return (
    values.reduce(
      (sum, value) =>
        sum + Number(value),
      0
    ) /
    values.length
  );
}


function round2(value) {
  return (
    Math.round(
      (
        Number(value) +
        Number.EPSILON
      ) *
        100
    ) /
    100
  );
}


function signed(value) {
  const number =
    round2(value);

  return number > 0
    ? `+${number}`
    : String(number);
}


export default function JudgingResultsPage() {
  const navigate =
    useNavigate();


  const panel =
    sessionStorage.getItem(
      JUDGING_STORAGE.PANEL
    );


  const [
    data,
    setData,
  ] = useState(null);


  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    if (!panel) {
      navigate(
        "/judging",
        {
          replace: true,
        }
      );

      return;
    }


    loadResults();

  }, []);


  async function loadResults() {
    setLoading(true);
    setError("");


    try {
      const result =
        await judgingApi
          .getResultsState();


      setData(result);

    } catch (err) {
      setError(
        err.message
      );

    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return (
      <main className="judge-page">

        <section className="judge-content-card">

          <p className="judge-handwritten">
            TEZHACK 2026
          </p>

          <h2>
            CHECKING RESULTS...
          </h2>

        </section>

      </main>
    );
  }


  if (error) {
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


  if (!data.ready) {
    return (
      <main className="judge-page">

        <section className="judge-results-hero">

          <p className="judge-handwritten">
            TEZHACK 2026
          </p>

          <h1>
            FINAL
            <span>RESULTS</span>
          </h1>

          <p>
            Final ranking will appear after both judging panels are complete.
          </p>

        </section>


        <section className="judge-content-card">

          <div className="judge-waiting">

            <span>
              SCORES RECORDED
            </span>

            <h2>
              {data.progress.scored}
              {" / "}
              {data.progress.total}
            </h2>

            <p>
              TEAMS SCORED
            </p>

          </div>


          <div className="judge-panel-status-grid">

            <article>

              <span>
                GROUP 01
              </span>

              <strong>
                {data.progress.group1.scored}
                {" / "}
                {data.progress.group1.total}
              </strong>

              <small>
                {data.progress.group1.complete
                  ? "PANEL COMPLETE ✓"
                  : "IN PROGRESS"}
              </small>

            </article>


            <article>

              <span>
                GROUP 02
              </span>

              <strong>
                {data.progress.group2.scored}
                {" / "}
                {data.progress.group2.total}
              </strong>

              <small>
                {data.progress.group2.complete
                  ? "PANEL COMPLETE ✓"
                  : "IN PROGRESS"}
              </small>

            </article>

          </div>


          <div className="judge-result-actions">

            <button
              className="judge-secondary-button"
              onClick={() =>
                navigate(
                  "/judging/panel"
                )
              }
            >
              ← BACK TO PANEL
            </button>


            <button
              className="judge-primary-button"
              onClick={loadResults}
            >
              <span>
                REFRESH STATUS
              </span>

              <b>↻</b>
            </button>

          </div>

        </section>

      </main>
    );
  }


  const teams =
    data.teams;

  const scores =
    data.scores;


  const group1Web =
    teams.filter(
      (team) =>
        team.group === "GROUP_1" &&
        team.category === "WEB"
    );


  const group2Web =
    teams.filter(
      (team) =>
        team.group === "GROUP_2" &&
        team.category === "WEB"
    );


  const group1Average =
    average(
      group1Web.map(
        (team) =>
          scores[team.id]
      )
    );


  const group2Average =
    average(
      group2Web.map(
        (team) =>
          scores[team.id]
      )
    );


  const reference =
    (
      group1Average +
      group2Average
    ) /
    2;


  const adjustment1 =
    reference -
    group1Average;


  const adjustment2 =
    reference -
    group2Average;


  const leaderboard =
    teams
      .map((team) => {

        const raw =
          Number(
            scores[team.id]
          );


        const adjustment =
          team.group ===
          "GROUP_1"
            ? adjustment1
            : adjustment2;


        return {
          ...team,

          rawScore:
            round2(raw),

          normalizedScore:
            round2(
              Math.max(
                0,
                Math.min(
                  100,
                  raw +
                    adjustment
                )
              )
            ),

          rank: 0,
          tie: false,
        };
      })
      .sort(
        (a, b) =>
          b.normalizedScore -
          a.normalizedScore
      );


  let previousScore = null;
  let previousRank = 0;


  leaderboard.forEach(
    (team, index) => {

      if (
        previousScore !== null &&
        team.normalizedScore ===
          previousScore
      ) {
        team.rank =
          previousRank;

        team.tie =
          true;

        leaderboard[
          index - 1
        ].tie =
          true;

      } else {

        team.rank =
          index + 1;

        previousRank =
          team.rank;
      }


      previousScore =
        team.normalizedScore;
    }
  );


  const topThree =
    leaderboard.slice(
      0,
      3
    );


  return (
    <main className="judge-page">

      <section className="judge-results-hero">

        <p className="judge-handwritten">
          TEZHACK 2026
        </p>

        <h1>
          FINAL
          <span>
            LEADERBOARD
          </span>
        </h1>

        <p>
          Both judging panels are complete. Final scores have been normalized using Web teams as the common panel reference.
        </p>

      </section>


      <section className="judge-content-card">

        <div className="judge-section-heading">

          <span className="judge-section-number">
            01
          </span>

          <div>

            <p className="judge-handwritten">
              Panel calculation
            </p>

            <h2>
              NORMALIZATION
            </h2>

          </div>

        </div>


        <div className="judge-normalization-grid">

          <article>

            <span>
              GROUP 01 WEB AVG
            </span>

            <strong>
              {round2(
                group1Average
              )}
            </strong>

          </article>


          <article>

            <span>
              GROUP 02 WEB AVG
            </span>

            <strong>
              {round2(
                group2Average
              )}
            </strong>

          </article>


          <article className="reference">

            <span>
              REFERENCE AVG
            </span>

            <strong>
              {round2(
                reference
              )}
            </strong>

          </article>


          <article>

            <span>
              GROUP 01 ADJUSTMENT
            </span>

            <strong>
              {signed(
                adjustment1
              )}
            </strong>

          </article>


          <article>

            <span>
              GROUP 02 ADJUSTMENT
            </span>

            <strong>
              {signed(
                adjustment2
              )}
            </strong>

          </article>

        </div>

      </section>


      <section className="judge-content-card">

        <div className="judge-section-heading">

          <span className="judge-section-number">
            02
          </span>

          <div>

            <p className="judge-handwritten">
              Overall ranking
            </p>

            <h2>
              TOP THREE
            </h2>

          </div>

        </div>


        <div className="judge-podium">

          {topThree.map(
            (team) => (

              <article
                key={team.id}
                className={
                  team.rank === 1
                    ? "winner"
                    : ""
                }
              >

                <span>
                  RANK #{team.rank}
                </span>

                <small>
                  {team.id}
                  {" • "}
                  {team.category}
                </small>

                <h3>
                  {team.name}
                </h3>

                <strong>
                  {
                    team.normalizedScore
                  }
                </strong>

                <p>
                  NORMALIZED SCORE
                </p>

                {team.tie && (
                  <div className="judge-tie">
                    TIE, JUDGE REVIEW
                  </div>
                )}

              </article>

            )
          )}

        </div>

      </section>


      <section className="judge-content-card">

        <div className="judge-section-heading">

          <span className="judge-section-number">
            03
          </span>

          <div>

            <p className="judge-handwritten">
              Complete ranking
            </p>

            <h2>
              ALL TEAMS
            </h2>

          </div>

        </div>


        <div className="judge-table-wrap">

          <table>

            <thead>

              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Type</th>
                <th>Panel</th>
                <th>Raw</th>
                <th>Final</th>
              </tr>

            </thead>


            <tbody>

              {leaderboard.map(
                (team) => (

                  <tr key={team.id}>

                    <td>
                      <strong>
                        #{team.rank}
                      </strong>
                    </td>

                    <td>

                      <strong>
                        {team.name}
                      </strong>

                      <small className="judge-team-id">
                        {team.id}
                      </small>

                    </td>

                    <td>
                      {team.category}
                    </td>

                    <td>
                      {team.group ===
                      "GROUP_1"
                        ? "G1"
                        : "G2"}
                    </td>

                    <td>
                      {team.rawScore}
                    </td>

                    <td>
                      <strong>
                        {
                          team.normalizedScore
                        }
                      </strong>
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}