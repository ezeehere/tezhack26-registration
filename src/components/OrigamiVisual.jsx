import PaperPiece from "./PaperPiece";

function OrigamiVisual() {
  return (
    <div className="origami-visual">
      <div
        className="origami-background"
        aria-hidden="true"
      ></div>

      <div
        className="origami-placeholder"
        aria-label="Temporary origami artwork placeholder"
      >
        <span className="origami-letter origami-t">
          T
        </span>

        <span className="origami-letter origami-h">
          H
        </span>
      </div>

      <p className="visual-placeholder-label">
        ORIGAMI ART PLACEHOLDER
      </p>

      <PaperPiece className="prize-note">
        <small>PRIZE POOL</small>
        <strong>₹20,000</strong>
      </PaperPiece>

      <svg
        className="circuit-path"
        viewBox="0 0 600 420"
        aria-hidden="true"
      >
        <path d="M30 340H142L194 288H260" />
        <path d="M362 88H449L500 139H570" />

        <circle cx="30" cy="340" r="7" />
        <circle cx="260" cy="288" r="7" />
        <circle cx="362" cy="88" r="7" />
        <circle cx="570" cy="139" r="7" />
      </svg>
    </div>
  );
}

export default OrigamiVisual;