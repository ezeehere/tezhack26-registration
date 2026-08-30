import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./RegistrationCTA.css";

const REGISTRATION_DEADLINE =
  new Date("2026-09-04T09:00:00+05:30").getTime();

function calculateTimeLeft() {
  const difference = Math.max(
    REGISTRATION_DEADLINE - Date.now(),
    0
  );

  return {
    total: difference,
    days: Math.floor(
      difference / (1000 * 60 * 60 * 24)
    ),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60
    ),
    seconds: Math.floor(
      (difference / 1000) % 60
    ),
  };
}


function FlipUnit({ value, label }) {
  const nextValue = String(value).padStart(2, "0");

  const [currentValue, setCurrentValue] =
    useState(nextValue);

  const [previousValue, setPreviousValue] =
    useState(nextValue);

  const [isFlipping, setIsFlipping] =
    useState(false);

  useEffect(() => {
    if (nextValue === currentValue) {
      return undefined;
    }

    setPreviousValue(currentValue);
    setCurrentValue(nextValue);
    setIsFlipping(true);

    const animationTimer = window.setTimeout(() => {
      setIsFlipping(false);
    }, 700);

    return () => {
      window.clearTimeout(animationTimer);
    };
  }, [nextValue, currentValue]);

  return (
    <div
      className="th26-flip-unit"
      aria-label={`${value} ${label}`}
    >
      <div
        className={[
          "th26-flip-card",
          isFlipping ? "is-flipping" : "",
        ].join(" ")}
        aria-hidden="true"
      >
        <div className="th26-flip-static-top">
          <span>{currentValue}</span>
        </div>

        <div className="th26-flip-static-bottom">
          <span>
            {isFlipping
              ? previousValue
              : currentValue}
          </span>
        </div>

        {isFlipping && (
          <>
            <div className="th26-flip-leaf-old">
              <span>{previousValue}</span>
            </div>

            <div className="th26-flip-leaf-new">
              <span>{currentValue}</span>
            </div>
          </>
        )}

        <i className="th26-flip-pin th26-flip-pin-left" />
        <i className="th26-flip-pin th26-flip-pin-right" />
      </div>

      <small>{label}</small>
    </div>
  );
}
function RegistrationCTA() {
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeLeft
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const registrationClosed = timeLeft.total === 0;

  return (
    <section
      className="th26-registration-cta"
      id="registration"
    >
      <div className="th26-cta-text">
        <span>TEAM REGISTRATION</span>

        <h2>Ready to build?</h2>

        <p>
          Form a team of 2 to 4 participants and register
          for TEZHACK 2026.
        </p>

        {registrationClosed ? (
          <span className="th26-registration-closed">
            Registration Closed
          </span>
        ) : (
          <Link
            className="th26-paper-register-button"
            to="/register"
          >
            Register Your Team
            <b>↗</b>
          </Link>
        )}
      </div>

      <div className="th26-countdown-area">
        <div className="th26-countdown-heading">
          <span>Registration closes in</span>
          <strong>
            4 September 2026, 9:00 AM IST
          </strong>
        </div>

        {registrationClosed ? (
          <div className="th26-countdown-closed">
            Registration has closed
          </div>
        ) : (
          <div
            className="th26-flip-clock"
            role="timer"
            aria-label="Time remaining until registration closes"
          >
            <FlipUnit
              value={timeLeft.days}
              label="Days"
            />

            <FlipUnit
              value={timeLeft.hours}
              label="Hours"
            />

            <FlipUnit
              value={timeLeft.minutes}
              label="Minutes"
            />

            <FlipUnit
              value={timeLeft.seconds}
              label="Seconds"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default RegistrationCTA;