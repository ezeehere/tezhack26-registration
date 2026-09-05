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
              Everything happening during The Final Commit.
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