import "./Hero.css";

import tucsLogo from "../assets/tucs-logo.png";
import tezhackLogo from "../assets/tezhack-logo.png";
import origamiArt from "../assets/origami-art.png";
import { Link } from "react-router-dom";

function EventLogo({ src, alt }) {
  return (
    <div className="th26-logo-placeholder">
      <img src={src} alt={alt} />
    </div>
  );
}

const importantNotes = [
  {
    label: "Format",
    value: "48 Hour Hackathon",
    color: "cream",
  },
  {
    label: "Event Dates",
    value: "4, 5 and 6 September 2026",
    color: "sage",
  },
  {
    label: "Venue",
    value: "CSE Department, Tezpur University",
    color: "cream",
  },
  {
    label: "Prize Pool",
    value: "₹20,000",
    color: "yellow",
  },
];

function Hero() {
  return (
    <main className="th26-home" id="home">
      <section className="th26-hero">
        <div
          className="th26-paper-grain"
          aria-hidden="true"
        />

        <span
          className="th26-background-fold th26-background-fold-one"
          aria-hidden="true"
        />

        <span
          className="th26-background-fold th26-background-fold-two"
          aria-hidden="true"
        />

        <header className="th26-header">
          <p className="th26-organizer">
            TEZPUR UNIVERSITY COMPUTER SOCIETY
            <span>×</span>
            CSE CAREER HUB
          </p>

          <div className="th26-logo-group">
            <EventLogo
              src={tucsLogo}
              alt="Tezpur University Computer Society logo"
            />

            <EventLogo
              src={tezhackLogo}
              alt="TEZHACK 2026 logo"
            />
          </div>
        </header>

        <div className="th26-main-layout">
          <div className="th26-intro">
            <div className="th26-welcome-paper">
              Welcome to
            </div>

            <div className="th26-title-lockup">
              <div className="th26-title-paper">
                <h1>TEZHACK</h1>
              </div>

              <div className="th26-hackathon-paper">
                HACKATHON
              </div>

              <span className="th26-year-paper">
                2026
              </span>
            </div>

            <p className="th26-intro-text">
              Open to everyone. Form a team of 2
              to 4 participants and build together
              at Tezpur University.
            </p>
          </div>

          <aside
            className="th26-art-stage"
            aria-label="Origami artwork placeholder"
          >
            <span
              className="th26-floating-fold th26-floating-fold-one"
              aria-hidden="true"
            />

            <span
              className="th26-floating-fold th26-floating-fold-two"
              aria-hidden="true"
            />

            <span
              className="th26-floating-fold th26-floating-fold-three"
              aria-hidden="true"
            />

            <img
                className="th26-origami-image"
                src={origamiArt}
                alt="TEZHACK origami artwork"
                />
          </aside>

          <div className="th26-notes">
            {importantNotes.map(
              (note, index) => (
                <article
                  className={`th26-note th26-note-${note.color}`}
                  key={note.label}
                  style={{
                    "--note-delay": `${
                      0.45 + index * 0.1
                    }s`,
                  }}
                >
                  <span>{note.label}</span>
                  <strong>{note.value}</strong>
                </article>
              )
            )}
          </div>

       

          <div className="th26-hero-register-wrap">
            <Link
              className="th26-hero-register-button"
              to="/register"
            >
              <span>Register Now</span>
              <b>↗</b>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Hero;