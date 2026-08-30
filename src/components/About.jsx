import PaperPiece from "./PaperPiece";

function StatPaper({ number, label }) {
  return (
    <PaperPiece className="about-stat">
      <strong>{number}</strong>
      <span>{label}</span>
    </PaperPiece>
  );
}

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-texture" aria-hidden="true"></div>
      <div className="about-shape about-shape-one"></div>
      <div className="about-shape about-shape-two"></div>

      <div className="about-layout">
        <div className="about-copy">
          <p className="section-kicker">
            01 / ABOUT THE EVENT
          </p>

          <h2>
            A 48-hour hackathon
            <span>open to everyone.</span>
          </h2>

          <p className="about-description">
            TEZHACK 2026 is organized by Tezpur University
            Computer Society and CSE Career Hub. Participants
            do not need to be from Tezpur University.
          </p>

          <p className="about-description">
            Students and participants from different
            institutions can form a team together.
          </p>

          <div className="about-stats">
            <StatPaper
              number="48"
              label="HOURS"
            />

            <StatPaper
              number="2-4"
              label="TEAM MEMBERS"
            />

            <StatPaper
              number="ALL"
              label="ELIGIBLE"
            />
          </div>

          <a className="about-next" href="#dates">
            Event Dates
            <span>↓</span>
          </a>
        </div>

        <div className="about-art">
          <div className="about-art-background"></div>

          <PaperPiece className="about-feature-paper">
            <small>TEZHACK 2026</small>
            <strong>48</strong>
            <span>HOURS</span>
            <p>CSE BUILDING</p>
          </PaperPiece>

          <PaperPiece className="about-date-note">
            <small>EVENT DATES</small>
            <strong>4-6 SEP</strong>
            <span>2026</span>
          </PaperPiece>

          <PaperPiece className="about-team-note">
            <small>TEAM SIZE</small>
            <strong>2 TO 4</strong>
            <span>SOLO NOT ALLOWED</span>
          </PaperPiece>

          <svg
            className="about-circuit"
            viewBox="0 0 600 500"
            aria-hidden="true"
          >
            <path d="M30 390H150L205 335H292" />
            <path d="M364 98H456L510 152H570" />

            <circle cx="30" cy="390" r="8" />
            <circle cx="292" cy="335" r="8" />
            <circle cx="364" cy="98" r="8" />
            <circle cx="570" cy="152" r="8" />
          </svg>
        </div>
      </div>
    </section>
  );
}

export default About;