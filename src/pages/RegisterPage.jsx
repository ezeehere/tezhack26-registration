import { Link } from "react-router-dom";

import Registration from "../components/Registration";
import Footer from "../components/Footer";
import tezhackLogo from "../assets/tezhack-logo.png";

import "./RegisterPage.css";

function RegisterPage() {
  return (
    <>
      <main className="th26-register-page">
        <div className="th26-register-shell">
          <header className="th26-register-header">
            <Link
              className="th26-back-home"
              to="/"
            >
              <span>←</span>
              Back to Home
            </Link>

            <div className="th26-register-brand">
              <img
                src={tezhackLogo}
                alt="TEZHACK 2026"
              />

              <div>
                <strong>TEZHACK</strong>
                <span>2026</span>
              </div>
            </div>
          </header>

          <section className="th26-register-introduction">
            <div>
              <span>TEAM REGISTRATION</span>
              <h1>Register your team.</h1>

              <p>
                Complete the team, participant, requirements and
                payment steps below.
              </p>
            </div>

            <aside>
              <span>Registration closes</span>
              <strong>4 September 2026</strong>
              <small>9:00 AM IST</small>
            </aside>
          </section>

          <Registration showHeading={false} />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default RegisterPage;