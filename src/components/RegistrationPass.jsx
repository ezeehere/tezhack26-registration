import "./RegistrationPass.css";
import tezhackLogo from "../assets/tezhack-logo.png";

function RegistrationPass({
  registrationId,
  teamName,
  teamSize,
  totalAmount,
  paymentStatus = "Pending Verification",
}) {


  return (
    <section className="th26-pass-section">
      <div className="th26-registration-pass">
        <span
          className="th26-pass-fold th26-pass-fold-one"
          aria-hidden="true"
        />

        <span
          className="th26-pass-fold th26-pass-fold-two"
          aria-hidden="true"
        />

        <header className="th26-pass-header">
          <div className="th26-pass-brand">
            <img
              src={tezhackLogo}
              alt="TEZHACK logo"
            />

            <div>
              <strong>TEZHACK</strong>
              <span>2026</span>
            </div>
          </div>

          <p>REGISTRATION PASS</p>
        </header>

        <div className="th26-pass-registration">
          <span>Registration ID</span>
          <strong>{registrationId}</strong>
        </div>

        <div className="th26-pass-team">
          <span>Registered Team</span>
          <h2>{teamName}</h2>
        </div>

        <div className="th26-pass-information">
          <div>
            <span>Team Size</span>
            <strong>
              {teamSize} {Number(teamSize) === 1 ? "Member" : "Members"}
            </strong>
          </div>

          <div>
            <span>Event Dates</span>
            <strong>4, 5 and 6 September 2026</strong>
          </div>

          <div>
            <span>Venue</span>
            <strong>CSE Department, Tezpur University</strong>
          </div>

          <div>
            <span>Registration Total</span>
            <strong>₹{totalAmount}</strong>
          </div>
        </div>

        <div className="th26-pass-payment">
          <div>
            <span>Payment Status</span>
            <strong>{paymentStatus}</strong>
          </div>

          <span className="th26-pass-status-dot" />
        </div>

        <footer className="th26-pass-footer">
          <p>
            This pass confirms that your registration was submitted
            successfully.
          </p>

          <p>
            Payment will be manually verified by the organizing team.
          </p>
        </footer>
      </div>
    </section>
  );
}

export default RegistrationPass;