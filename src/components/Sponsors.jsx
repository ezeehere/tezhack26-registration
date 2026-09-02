import "./Sponsors.css";

import oilIndiaLogo from "../assets/oil-india-logo.png";
import gdgJistLogo from "../assets/gdg-jist-logo.png";

function Sponsors() {
  return (
    <section
      className="th26-partners"
      aria-labelledby="th26-partners-title"
    >
      <div className="th26-partners-dots" aria-hidden="true" />

      <header className="th26-partners-header">
        <p>TEZHACK 2026</p>

        

        <span aria-hidden="true" />
      </header>

      <div className="th26-partners-board">
        <article className="th26-partner th26-partner-title">
          <span
            className="th26-partner-tape"
            aria-hidden="true"
          />

          <p className="th26-partner-label">
            Title Sponsor
          </p>

          <img
            src={oilIndiaLogo}
            alt="Oil India Limited, Title Sponsor of TEZHACK 2026"
            className="th26-partner-oil-logo"
          />
        </article>

        <div
          className="th26-partners-divider"
          aria-hidden="true"
        >
          <span>×</span>
        </div>

        <article className="th26-partner th26-partner-community">
          <span
            className="th26-partner-tape"
            aria-hidden="true"
          />

          <p className="th26-partner-label">
            Community Partner
          </p>

          <img
            src={gdgJistLogo}
            alt="Google Developer Group on Campus, Jorhat Institute of Science and Technology"
            className="th26-partner-gdg-logo"
          />
        </article>
      </div>
    </section>
  );
}

export default Sponsors;