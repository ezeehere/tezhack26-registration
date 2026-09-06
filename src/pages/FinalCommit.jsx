import { useEffect, useState } from "react";
import "./FinalCommit.css";

import {
  finalDayAgenda,
  checklist,
  finalResources,
} from "../data/finalDay";

const TARGET_DATE = new Date(
  "2026-09-06T11:00:00+05:30"
).getTime();

function getTimeLeft() {
  const difference = TARGET_DATE - Date.now();

  if (difference <= 0) {
    return {
      started: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    started: false,
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function CountdownItem({ value, label }) {
  return (
    <div className="final-countdown-box">
      <strong>{String(value).padStart(2, "0")}</strong>
      <span>{label}</span>
    </div>
  );
}

function ChecklistBlock({ title, items }) {
  return (
    <article className="final-check-card">
      <h3>{title}</h3>

      <div className="final-check-items">
        {items.map((item) => (
          <div className="final-check-item" key={item}>
            <span className="final-checkbox" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function FinalCommit() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="final-page">

      {/* HERO */}
      <section className="final-hero">
  <div className="final-fold final-fold-one" />
  <div className="final-fold final-fold-two" />

  <div className="final-hero-content">

    <div className="final-hero-main">

      {/* LEFT */}
      <div className="final-title-area">

  <div className="th26-title-lockup final-tezhack-lockup">

    <div className="th26-title-paper">
      <h1>TEZHACK</h1>
    </div>

    <div className="th26-year-paper">
      2026
    </div>

    <div className="final-commit-paper">
      THE FINAL COMMIT
    </div>

  </div>

  <p className="final-intro">
    Verification, presentation, judging and results.
  </p>

</div>


      {/* RIGHT */}
      <div className="final-countdown-area">

        {!timeLeft.started ? (
          <>
            <p className="final-starting-label">
              STARTING IN
            </p>

            <div className="final-countdown">
              <CountdownItem
                value={timeLeft.days}
                label="DAYS"
              />

              <CountdownItem
                value={timeLeft.hours}
                label="HOURS"
              />

              <CountdownItem
                value={timeLeft.minutes}
                label="MIN"
              />

              <CountdownItem
                value={timeLeft.seconds}
                label="SEC"
              />
            </div>
          </>
        ) : (
          <div className="final-live">
            THE FINAL COMMIT IS LIVE
          </div>
        )}

      </div>

    </div>


    <div className="final-hero-bottom">

      <div className="final-event-line">
        <span>06 SEPTEMBER 2026</span>
        <span>11:00 AM</span>
        <span>CSE BUILDING, TU</span>
      </div>

      <div className="final-report-note">
        All participants must report to the Seminar Hall by 11:00 AM.
      </div>

    </div>

  </div>
</section>


      {/* AGENDA */}
      <section className="final-section">

        <div className="final-container">

          <div className="final-heading">
            <span>01 / SCHEDULE</span>

            <h2>TODAY'S AGENDA</h2>

            <p>
              Everything happening during The Final Commit,
            </p>
          </div>

          <div className="final-agenda">

            <div className="final-agenda-header">
              <span>TIME</span>
              <span>ACTIVITY</span>
              <span>DETAILS</span>
            </div>

            {finalDayAgenda.map((item) => (
              <div
                className="final-agenda-row"
                key={`${item.time}-${item.activity}`}
              >
                <strong>{item.time}</strong>

                <h3>{item.activity}</h3>

                <p>{item.details}</p>
              </div>
            ))}

          </div>

        </div>
      </section>


      {/* JUDGING */}
      <section className="final-judging">

        <div className="final-container">

          <div className="final-judging-layout">

            <div>
              <span className="final-dark-kicker">
                02 / JUDGING
              </span>

              <h2>JUDGING FORMAT</h2>

              <p>
                Two panels will evaluate projects simultaneously.
                Scores from both panels will be normalized before
                the final ranking.
              </p>
            </div>

            <div className="final-stat-grid">

              <div>
                <strong>27</strong>
                <span>TEAMS</span>
              </div>

              <div>
                <strong>02</strong>
                <span>PANELS</span>
              </div>

              <div>
                <strong>08</strong>
                <span>MIN / TEAM</span>
              </div>

              <div>
                <strong>01</strong>
                <span>FINAL RANKING</span>
              </div>

            </div>

          </div>

          <div className="final-eight-minute">
            <strong>8 MINUTES</strong>

            <span>
              PPT + PROJECT DEMO + Q&amp;A
            </span>
          </div>

        </div>
        
      </section>


      {/* CHECKLIST */}
      <section className="final-section">

        <div className="final-container">

          <div className="final-heading">
            <span>03 / BEFORE YOU PRESENT</span>
            <h2>FINAL CHECKLIST</h2>

            <p>
              Run through this before your team is called.
            </p>
          </div>

          <div className="final-check-grid">

            <ChecklistBlock
              title="PROJECT"
              items={checklist.project}
            />

            <ChecklistBlock
              title="CODE"
              items={checklist.code}
            />

            <ChecklistBlock
              title="PRESENTATION"
              items={checklist.presentation}
            />

            <ChecklistBlock
              title="TEAM"
              items={checklist.team}
            />

          </div>

          <div className="final-warning">
            8 MINUTES TOTAL. KEEP YOUR PPT AND PROJECT READY
            BEFORE YOUR JUDGING SLOT.
          </div>

        </div>
      </section>


      {/* RESOURCES */}
      <section className="final-resources">

        <div className="final-container">

          <div className="final-heading final-heading-light">
            <span>04 / RESOURCES</span>
            <h2>PRESENTATION RESOURCES</h2>

            <p>
              Use the provided presentation template for your
              final presentation.
            </p>
          </div>

          <div className="final-resource-grid">

            <article className="final-resource-card">
              <span>WEB PROJECTS</span>

              <h3>
                WEB PPT
                <br />
                TEMPLATE
              </h3>

              <p>
                Presentation template for web based submissions.
              </p>

              <a
                href={finalResources.webPpt}
                target="_blank"
                rel="noreferrer"
              >
                OPEN TEMPLATE ↗
              </a>
            </article>


            <article className="final-resource-card">
              <span>ML PROJECTS</span>

              <h3>
                ML PPT
                <br />
                TEMPLATE
              </h3>

              <p>
                Presentation template for machine learning based
                submissions.
              </p>

              <a
                href={finalResources.appPpt}
                target="_blank"
                rel="noreferrer"
              >
                OPEN TEMPLATE ↗
              </a>
            </article>

          </div>


          

        </div>
      </section>


      {/* COMING SOON */}

      <section className="fc-judging-section">

  <div className="fc-section-head">
    <span>05 / FINAL JUDGING</span>

    <h2>
      JUDGING
      <strong> STRUCTURE</strong>
    </h2>

    <p>
      Two panels will judge simultaneously.
      All teams will be ranked together after
      panel normalization.
    </p>
  </div>


  {/* PANEL SPLIT */}

  <div className="fc-panel-grid">

    <article className="fc-panel-card">

      <span className="fc-card-tag">
        PANEL A
      </span>

      <h3>13 TEAMS</h3>

      <div className="fc-panel-counts">
        <strong>5 ML</strong>
        <strong>8 WEB</strong>
      </div>

      <p>
        Panel A will include the judge with
        stronger ML knowledge.
      </p>

      
    </article>


    <article className="fc-panel-card fc-panel-card-yellow">

      <span className="fc-card-tag">
        PANEL B
      </span>

      <h3>14 TEAMS</h3>

      <div className="fc-panel-counts">
        <strong>14 WEB</strong>
      </div>

      <p>
        Panel B will evaluate the remaining
        Web teams using the same marking
        criteria.
      </p>

      

    </article>

  </div>


  {/* FLOATING JUDGE */}

  <article className="fc-floating-card">

    <div>
      <span>7TH JUDGE</span>
      <h3>COMMON / FLOATING JUDGE</h3>
    </div>

    <div className="fc-floating-points">
      <p>Observe both panels</p>
      <p>Assist with difficult technical cases</p>
      <p>Check scoring consistency</p>
      <p>Help resolve close scores or ties</p>
    </div>

  </article>


  {/* 8 MIN FLOW */}

  <div className="fc-subsection">

    <div className="fc-subsection-title">
      <span>01</span>

      <div>
        <p>Per team</p>
        <h3>8-MINUTE JUDGING FLOW</h3>
      </div>
    </div>


    <div className="fc-time-grid">

      <article>
        <strong>00-04</strong>
        <span>MIN</span>
        <h4>PPT</h4>
        <p>
          Problem, approach and solution.
        </p>
      </article>

      <article>
        <strong>04-06</strong>
        <span>MIN</span>
        <h4>DEMO</h4>
        <p>
          Working project demonstration.
        </p>
      </article>

      <article>
        <strong>06-08</strong>
        <span>MIN</span>
        <h4>Q&A</h4>
        <p>
          Questions from the judges.
        </p>
      </article>

    </div>


    <div className="fc-note-strip">
      Teams must keep their PPT and project
      ready before their judging slot.
    </div>

  </div>


  {/* MARKING */}

  <div className="fc-subsection">

    <div className="fc-subsection-title">
      <span>02</span>

      <div>
        <p>Same rubric for both panels</p>
        <h3>JUDGING CRITERIA</h3>
      </div>
    </div>


    <div className="fc-marking-table">

      <div className="fc-mark-row">
        <span>
          Problem Understanding & Relevance
        </span>
        <strong>10</strong>
      </div>

      <div className="fc-mark-row">
        <span>
          Solution & Innovation
        </span>
        <strong>15</strong>
      </div>

      <div className="fc-mark-row fc-mark-highlight">
        <span>
          Challenge Integration
        </span>
        <strong>15</strong>
      </div>

      <div className="fc-mark-row">
        <span>
          Technical Implementation
        </span>
        <strong>25</strong>
      </div>

      <div className="fc-mark-row">
        <span>
          Working Prototype & Completeness
        </span>
        <strong>20</strong>
      </div>

      <div className="fc-mark-row">
        <span>
          Practical Usefulness
        </span>
        <strong>5</strong>
      </div>

      <div className="fc-mark-row">
        <span>
          Presentation & Q&A
        </span>
        <strong>10</strong>
      </div>

      <div className="fc-mark-row fc-mark-total">
        <span>TOTAL</span>
        <strong>100</strong>
      </div>

    </div>

  </div>


  {/* CRITERIA EXPLANATION */}

  <div className="fc-criteria-grid">

    <article>
      <span>01 / 10</span>
      <h4>PROBLEM UNDERSTANDING</h4>
      <p>
        Does the team clearly understand the
        problem and its relevance?
      </p>
    </article>

    <article>
      <span>02 / 15</span>
      <h4>SOLUTION & INNOVATION</h4>
      <p>
        Is the solution meaningful and more
        than a very basic implementation?
      </p>
    </article>

    <article>
      <span>03 / 15</span>
      <h4>CHALLENGE INTEGRATION</h4>
      <p>
        Was the assigned random challenge
        genuinely incorporated into the
        solution?
      </p>
    </article>

    <article>
      <span>04 / 25</span>
      <h4>TECHNICAL IMPLEMENTATION</h4>
      <p>
        Judges will consider architecture,
        logic, integrations, database,
        APIs, model work and technical quality
        where applicable.
      </p>
    </article>

    <article>
      <span>05 / 20</span>
      <h4>WORKING PROTOTYPE</h4>
      <p>
        Does the actual project work?
        Strong slides alone should not receive
        high marks.
      </p>
    </article>

    <article>
      <span>06 / 5</span>
      <h4>PRACTICAL USEFULNESS</h4>
      <p>
        Could the proposed solution provide
        real practical value?
      </p>
    </article>

    <article>
      <span>07 / 10</span>
      <h4>PRESENTATION & Q&A</h4>
      <p>
        Can the team clearly explain its work
        and answer technical questions?
      </p>
    </article>

  </div>


  {/* INDIVIDUAL JUDGE SCORING */}

  <div className="fc-subsection">

    <div className="fc-subsection-title">
      <span>03</span>

      <div>
        <p>Independent scoring</p>
        <h3>TEAM RAW SCORE</h3>
      </div>
    </div>


    <div className="fc-score-example">

      <div>
        <span>JUDGE 01</span>
        <strong>82</strong>
      </div>

      <div>
        <span>JUDGE 02</span>
        <strong>86</strong>
      </div>

      <div>
        <span>JUDGE 03</span>
        <strong>79</strong>
      </div>

      <div className="fc-score-final">
        <span>RAW TEAM SCORE</span>
        <strong>82.33</strong>
      </div>

    </div>


    <code className="fc-formula">
      (82 + 86 + 79) / 3 = 82.33
    </code>

  </div>


  {/* NORMALIZATION */}

  <div className="fc-subsection">

    <div className="fc-subsection-title">
      <span>04</span>

      <div>
        <p>Cross-panel scoring</p>
        <h3>NORMALIZATION</h3>
      </div>
    </div>


    <p className="fc-normalization-intro">
      Since Panel A contains all ML teams,
      overall panel averages will not be used.
      Web teams present in both panels will act
      as the common scoring reference.
    </p>


    <div className="fc-normalization-grid">

      <article>
        <span>PANEL A WEB AVG</span>
        <strong>74</strong>
      </article>

      <article>
        <span>PANEL B WEB AVG</span>
        <strong>80</strong>
      </article>

      <article className="fc-reference-card">
        <span>REFERENCE AVG</span>
        <strong>77</strong>
      </article>

    </div>


    <div className="fc-adjustment-grid">

      <article>
        <span>PANEL A</span>
        <h4>+3</h4>
        <p>
          77 - 74 = +3
        </p>
      </article>

      <article>
        <span>PANEL B</span>
        <h4>-3</h4>
        <p>
          77 - 80 = -3
        </p>
      </article>

    </div>


    <div className="fc-normalized-example">

      <article>
        <span>ML TEAM A03</span>
        <strong>84 + 3 = 87</strong>
      </article>

      <article>
        <span>WEB TEAM B09</span>
        <strong>88 - 3 = 85</strong>
      </article>

    </div>

  </div>


  {/* FINAL RANKING */}

  <div className="fc-subsection">

    <div className="fc-subsection-title">
      <span>05</span>

      <div>
        <p>After normalization</p>
        <h3>FINAL RANKING</h3>
      </div>
    </div>


    <div className="fc-ranking-demo">

      <div>
        <b>#01</b>
        <span>TEAM X</span>
        <small>ML / PANEL A</small>
        <strong>87</strong>
      </div>

      <div>
        <b>#02</b>
        <span>TEAM Y</span>
        <small>WEB / PANEL B</small>
        <strong>86</strong>
      </div>

      <div>
        <b>#03</b>
        <span>TEAM Z</span>
        <small>WEB / PANEL A</small>
        <strong>85</strong>
      </div>

    </div>

  </div>


  {/* TIES */}

  <div className="fc-tie-card">

    <span>TIE BREAKING ORDER</span>

    <ol>
      <li>
        Higher Technical Implementation
      </li>

      <li>
        Higher Working Prototype score
      </li>

      <li>
        Higher Challenge Integration score
      </li>

      <li>
        Floating judge and panel judges take
        the final call if still tied
      </li>
    </ol>

  </div>

</section>
      <section className="final-coming">

        <span>05 / NEXT UPDATE</span>

        <h2>
          MORE DETAILS
          <strong>COMING SOON</strong>
        </h2>

        <p>
          Panel allocation, presentation order and additional
          final instructions will be updated here.
        </p>

      </section>

    </main>
  );
}