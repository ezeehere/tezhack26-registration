import { useEffect, useState } from "react";

function OpeningAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="opening-screen" aria-hidden="true">
      <div className="opening-door opening-door-left">
        <span className="opening-fold-left"></span>
      </div>

      <div className="opening-door opening-door-right">
        <span className="opening-fold-right"></span>
      </div>

      <div className="opening-content">
        <small>WELCOME TO</small>

        <div className="opening-heading">
          <strong>TEZHACK</strong>
          <span>2026</span>
        </div>

        <p>48 HOUR HACKATHON</p>
      </div>
    </div>
  );
}

export default OpeningAnimation;