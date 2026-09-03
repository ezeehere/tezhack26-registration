import RegistrationCTA from "./RegistrationCTA";
const faqItems = [
  {
    question: "Who can participate?",
    answer: "We welcome absolutely everyone! Whether you're a beginner or an expert, TEZHACK is for you.",
  },
  {
    question: "Can I participate alone?",
    answer: "To make it more fun, you'll need at least one teammate! Teams must have a minimum of 2 members.",
  },
  {
    question: "What is the maximum team size?",
    answer: "You can bring up to 3 friends along! A full team can have a maximum of 4 amazing participants.",
  },
  {
    question: "Can team members belong to different institutions?",
    answer: "Absolutely! We love seeing cross-college collaboration, so feel free to team up with friends from anywhere.",
  },
  {
    question: "What is the registration fee?",
    answer: "It's super affordable! Just ₹100 for a team of two, ₹150 for a trio, and ₹200 for a full team of four.",
  },
  {
    question: "Is accommodation compulsory?",
    answer: "Not at all! You're entirely free to arrange your own stay or head home if you prefer.",
  },
  {
    question: "How much does accommodation cost?",
    answer: "If you'd like to stay with us, it's just ₹100 per person per day. We'd love to host you!",
  },
  {
    question: "Is food compulsory?",
    answer: "Nope, it's completely optional! You're welcome to bring your own snacks or grab a bite outside.",
  },
  {
    question: "How much does food cost?",
    answer: "We offer meals for just ₹100 per person per day to keep you fueled up and happily coding!",
  },
  {
    question: "Where will TEZHACK be held?",
    answer: "We'll be waiting for you at the lovely CSE Building at Tezpur University. See you there!",
  },
  {
    question: "When does registration close?",
    answer: "Make sure to grab your spot before September 4, 2026, at 9:00 AM IST. We can't wait to have you join us!",
  },
  {
    question: "What is the prize pool?",
    answer: "We have an exciting prize pool of ₹20,000 waiting to be won by our wonderful participants!",
  },
  {
    question: "When will problem statements be released?",
    answer: "We're keeping those a little secret for now! Keep an eye out, as we'll be revealing them closer to the big day.",
  },
  {
    question: "When will hackathon tracks be released?",
    answer: "Hold tight! We'll be announcing our exciting hackathon tracks very soon, so please stay tuned.",
  },
]

function EventSections() {
  return (
    <div className="tez-sections">
      <section className="tez-content-panel" id="about">
        <div className="tez-section-heading">
          <span className="tez-section-number">01</span>

          <div>
            <p className="tez-handwritten-label">About the Event</p>
            <h2>A 48 hour hackathon open to everyone.</h2>
          </div>
        </div>

        <p className="tez-section-description">
          TEZHACK 2026 is organized by Tezpur University Computer Society
          and CSE Career Hub. Participants do not need to be from Tezpur
          University, and members from different institutions can form a
          team together.
        </p>

        <div className="tez-information-grid">
          <article>
            <span>Duration</span>
            <strong>48 Hours</strong>
          </article>

          <article>
            <span>Team Size</span>
            <strong>2 to 4 Members</strong>
          </article>

          <article>
            <span>Eligibility</span>
            <strong>Open to Everyone</strong>
          </article>

          <article>
            <span>Solo Participation</span>
            <strong>Not Allowed</strong>
          </article>

          <article>
            <span>Venue</span>
            <strong>CSE Department, Tezpur University</strong>
          </article>

          <article>
            <span>Prize Pool</span>
            <strong>₹20,000</strong>
          </article>
        </div>
      </section>

      <section className="tez-content-panel" id="dates">
        <div className="tez-section-heading">
          <span className="tez-section-number">02</span>

          <div>
            <p className="tez-handwritten-label">Event Dates</p>
            <h2>Three dates. Forty-eight hours.</h2>
          </div>
   
        </div>

        

        <div className="tez-date-grid">
          <article className="tez-date-card">
            <strong>04</strong>
            <div>
              <span>September</span>
              <small>2026</small>
            </div>
          </article>
          

          <article className="tez-date-card">
            <strong>05</strong>
            <div>
              <span>September</span>
              <small>2026</small>
            </div>
          </article>

          <article className="tez-date-card">
            <strong>06</strong>
            <div>
              <span>September</span>
              <small>2026</small>
            </div>
          </article>
        </div>
        

        <div className="tez-deadline-card">
           
          <span>Hackathon Starting At</span>
          <strong>4 September 2026, 9:00 AM IST</strong>
        </div>
      </section>

      <RegistrationCTA />
     

      <section className="tez-content-panel" id="disclosures">
        <div className="tez-section-heading">
          <span className="tez-section-number">04</span>

          <div>
            <p className="tez-handwritten-label">Hackathon Information</p>
            <h2>More information will be shared later.</h2>
          </div>
        </div>

        <div className="tez-disclosure-grid">
          <article>
            <span>Problem Statements</span>
            <strong>To Be Disclosed</strong>
          </article>

          <article>
            <span>Tracks</span>
            <strong>Coming Soon</strong>
          </article>
        </div>
      </section>

      <section className="tez-content-panel" id="faq">
        <div className="tez-section-heading">
          <span className="tez-section-number">05</span>

          <div>
            <p className="tez-handwritten-label">FAQ</p>
            <h2>Frequently asked questions.</h2>
          </div>
        </div>

        <div className="tez-faq-list">
          {faqItems.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

    
    </div>
  );
}

export default EventSections;
