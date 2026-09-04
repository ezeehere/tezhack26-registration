import "./Sponsors.css";

import oilIndiaLogo from "../assets/oil-india-logo.png";
import gdgJistLogo from "../assets/gdg-jist-logo.png";

function Sponsors() {
  return (
    <section
      className="th26-partners"
      aria-labelledby="partners-title"
    >
      <header className="th26-partners-header">
        <h2 id="partners-title">
          With support from
        </h2>

        <i aria-hidden="true" />
      </header>

      <div className="th26-title-sponsor">
        <span
          className="th26-paper-tape"
          aria-hidden="true"
        />

        <p>Official Title Sponsor</p>

        <img
          src={oilIndiaLogo}
          alt="Oil India Limited, Official Title Sponsor"
        />
      </div>

    </section>
  );
}

export default Sponsors;