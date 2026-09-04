import { useMemo, useState, useEffect, useRef } from "react";
import "./TeamCallerPage.css";

const teams = [
  "Tetragram",

"Royal Synergy Technology",

"Memory Leak",

"Rookie_Coders",

"Cuckoo",

"Tinkerers",

"Lumos",

"Nos",

"The Random Four"
];

const STORAGE_KEY = "tezhack-called-teams";

function getSavedTeams() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function secureRandomIndex(length) {
  const values = new Uint32Array(1);
  window.crypto.getRandomValues(values);
  return values[0] % length;
}

function TeamCallerPage() {
  const [calledTeams, setCalledTeams] = useState(getSavedTeams);
  const [displayedTeam, setDisplayedTeam] = useState("READY?");
  const [isSelecting, setIsSelecting] = useState(false);
  const intervalRef = useRef(null);

  const remainingTeams = useMemo(
    () => teams.filter((team) => !calledTeams.includes(team)),
    [calledTeams]
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(calledTeams));
  }, [calledTeams]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function callNextTeam() {
    if (isSelecting || remainingTeams.length === 0) return;

    setIsSelecting(true);

    intervalRef.current = setInterval(() => {
      const temporaryTeam =
        remainingTeams[secureRandomIndex(remainingTeams.length)];

      setDisplayedTeam(temporaryTeam);
    }, 90);

    setTimeout(() => {
      clearInterval(intervalRef.current);

      const selectedTeam =
        remainingTeams[secureRandomIndex(remainingTeams.length)];

      setDisplayedTeam(selectedTeam);
      setCalledTeams((current) => [...current, selectedTeam]);
      setIsSelecting(false);
    }, 1600);
  }

  function undoLastCall() {
    if (calledTeams.length === 0 || isSelecting) return;

    const updatedTeams = calledTeams.slice(0, -1);

    setCalledTeams(updatedTeams);
    setDisplayedTeam(
      updatedTeams.length
        ? updatedTeams[updatedTeams.length - 1]
        : "READY?"
    );
  }

  function resetAllTeams() {
    if (isSelecting) return;

    const confirmed = window.confirm(
      "Reset the complete team calling order?"
    );

    if (!confirmed) return;

    setCalledTeams([]);
    setDisplayedTeam("READY?");
    localStorage.removeItem(STORAGE_KEY);
  }

  function openFullscreen() {
    document.documentElement.requestFullscreen?.();
  }

  return (
    <main className="team-caller-page">
      <header className="caller-header">
        <div>
          <p className="caller-label">TEZHACK 2026</p>
          <h1>Random Team Caller</h1>
        </div>

        <button
          type="button"
          className="fullscreen-button"
          onClick={openFullscreen}
        >
          Full Screen
        </button>
      </header>

      <section className="caller-stage">
        <p className="stage-label">
          {isSelecting ? "SELECTING TEAM..." : "NEXT TEAM"}
        </p>

        <div
          className={`selected-team ${
            isSelecting ? "is-selecting" : ""
          }`}
          aria-live="polite"
        >
          {remainingTeams.length === 0 && !isSelecting
            ? "ALL TEAMS CALLED"
            : displayedTeam}
        </div>

        <button
          type="button"
          className="call-button"
          onClick={callNextTeam}
          disabled={isSelecting || remainingTeams.length === 0}
        >
          {isSelecting ? "Selecting..." : "Call Next Team"}
        </button>

        <p className="remaining-count">
          {remainingTeams.length} of {teams.length} teams remaining
        </p>
      </section>

      <section className="caller-bottom">
        <div className="remaining-panel">
          <h2>Remaining Teams</h2>

          <div className="team-list">
            {remainingTeams.length ? (
              remainingTeams.map((team) => (
                <span key={team}>{team}</span>
              ))
            ) : (
              <p>Every team has been called.</p>
            )}
          </div>
        </div>

        <div className="history-panel">
          <div className="history-heading">
            <h2>Call Order</h2>
            <span>{calledTeams.length}</span>
          </div>

          <ol className="history-list">
            {calledTeams.length ? (
              calledTeams.map((team, index) => (
                <li key={team}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{team}</strong>
                </li>
              ))
            ) : (
              <p>No team has been called yet.</p>
            )}
          </ol>

          <div className="caller-actions">
            <button
              type="button"
              onClick={undoLastCall}
              disabled={!calledTeams.length || isSelecting}
            >
              Undo Last
            </button>

            <button
              type="button"
              className="reset-button"
              onClick={resetAllTeams}
              disabled={!calledTeams.length || isSelecting}
            >
              Reset All
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TeamCallerPage;