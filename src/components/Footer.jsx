import "./Footer.css";
import tuGate from "../assets/tu-gate.png";

const contacts = [
  {
    name: "Bishwas Das",
    email: "csm25052@tezu.ac.in",
    phone: "8474845027",
  },
  {
    name: "Pipal Deka",
    email: "csb24040@tezu.ac.in",
    phone: "6003937007",
  },
];

function Footer() {
  return (
    <footer className="th26-footer">
      <div className="th26-footer-main">
        <section className="th26-footer-brand">
          <span>OFFICIAL REGISTRATION WEBSITE</span>

          <h2>
            TEZHACK <b>2026</b>
          </h2>

          <p>48 Hour Hackathon</p>
        </section>

        <div
          className="th26-footer-gate-crop"
          aria-hidden="true"
        >
          <img src={tuGate} alt="" />
        </div>

        <address className="th26-footer-contact">
          <span>Official Contacts</span>

          <div className="th26-contact-grid">
            {contacts.map((contact) => (
              <div
                className="th26-contact-person"
                key={contact.email}
              >
                <strong>{contact.name}</strong>

                <a href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>

                <a href={`tel:+91${contact.phone}`}>
                  +91 {contact.phone}
                </a>
              </div>
            ))}
          </div>
        </address>
      </div>

      <div className="th26-footer-bottom">
        <div className="th26-footer-event">
          <strong>4, 5 and 6 September 2026</strong>
          <span>CSE Building, Tezpur University</span>
        </div>

        <p>
          Tezpur University Computer Society
          <b> × </b>
          CSE Career Hub
        </p>
      </div>
    </footer>
  );
}

export default Footer;