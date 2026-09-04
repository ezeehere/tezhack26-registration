import { useEffect, useMemo, useState } from "react";
import { challengeCards, problemStatements } from "../data/challengeCards";
import "./challenge-jar.css";

const STORAGE_KEY = "tezhack-2026-challenge-draws-v1";

function loadDraws() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function randomIndex(length) {
  const values = new Uint32Array(1);
  const limit = 0xffffffff - (0xffffffff % length);
  do window.crypto.getRandomValues(values);
  while (values[0] >= limit);
  return values[0] % length;
}

function formatTime(value) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

function escapeCsv(value) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

export default function ChallengeJarPage() {
  const [draws, setDraws] = useState(loadDraws);
  const [teamId, setTeamId] = useState("");
  const [teamName, setTeamName] = useState("");
  const [category, setCategory] = useState("web");
  const [problemId, setProblemId] = useState("WEB01");
  const [confirmed, setConfirmed] = useState(false);
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draws));
  }, [draws]);

  useEffect(() => {
    setProblemId(problemStatements[category][0][0]);
    setConfirmed(false);
  }, [category]);

  const existingIds = useMemo(
    () => new Set(draws.map((draw) => draw.teamId)),
    [draws],
  );

  function drawChallenge(event) {
    event.preventDefault();
    const normalizedId = teamId.trim().toUpperCase();
    const normalizedName = teamName.trim();

    if (!normalizedId || !normalizedName || !problemId || !confirmed) {
      setMessage("Complete every field and confirm the final selection before drawing.");
      return;
    }

    if (existingIds.has(normalizedId)) {
      const oldDraw = draws.find((draw) => draw.teamId === normalizedId);
      setResult(oldDraw);
      setMessage("This team has already drawn a card. Its original result is shown below.");
      return;
    }

    const card = challengeCards[category][randomIndex(challengeCards[category].length)];
    const problemTitle = problemStatements[category].find(([id]) => id === problemId)?.[1];
    const newDraw = {
      teamId: normalizedId,
      teamName: normalizedName,
      category,
      problemId,
      problemTitle,
      cardId: card.id,
      cardTitle: card.title,
      task: card.task,
      check: card.check,
      drawnAt: new Date().toISOString(),
    };

    setDraws((current) => [...current, newDraw]);
    setResult(newDraw);
    setMessage("Draw recorded successfully. Repeated cards across different teams are allowed.");
  }

  function prepareNextTeam() {
    setTeamId("");
    setTeamName("");
    setConfirmed(false);
    setResult(null);
    setMessage("");
  }

  function exportCsv() {
    if (!draws.length) return;
    const headings = ["Team ID", "Team Name", "Category", "Problem ID", "Problem Statement", "Challenge ID", "Challenge", "Task", "Judge Check", "Drawn At (IST)"];
    const rows = draws.map((draw) => [draw.teamId, draw.teamName, draw.category === "web" ? "Web Development" : "Machine Learning", draw.problemId, draw.problemTitle, draw.cardId, draw.cardTitle, draw.task, draw.check, formatTime(draw.drawnAt)]);
    const csv = [headings, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "tezhack-2026-challenge-draws.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  function clearRecords() {
    if (!draws.length) return;
    const answer = window.prompt("This removes every saved draw from this browser. Type RESET to continue.");
    if (answer !== "RESET") return;
    setDraws([]);
    setResult(null);
    setMessage("All local draw records were removed.");
  }

  return (
    <main className="tez-jar-page">
      <div className="tez-jar-shell">
        <header className="tez-jar-hero">
          <p className="tez-handwritten-label">Coordinator Console</p>
          <h1>Challenge Card Jar</h1>
          <p>Enter the team’s confirmed details, then draw exactly one compulsory challenge card.</p>
          <div className="tez-jar-badges">
            <span>16 Web cards</span><span>16 ML cards</span><span>Repeats allowed</span>
          </div>
        </header>

        <section className="tez-content-panel tez-jar-panel">
          <div className="tez-section-heading">
            <span className="tez-section-number">01</span>
            <div><p className="tez-handwritten-label">Official Draw</p><h2>Confirm the team first.</h2></div>
          </div>

          <form className="tez-jar-form" onSubmit={drawChallenge}>
            <label>Team ID<input value={teamId} onChange={(e) => setTeamId(e.target.value)} placeholder="Example: TH26-014" autoComplete="off" /></label>
            <label>Team name<input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Enter registered team name" autoComplete="off" /></label>
            <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option value="web">Web Development</option><option value="ml">Machine Learning</option></select></label>
            <label>Confirmed problem statement<select value={problemId} onChange={(e) => { setProblemId(e.target.value); setConfirmed(false); }}>{problemStatements[category].map(([id, title]) => <option key={id} value={id}>{id} — {title}</option>)}</select></label>
            <label className="tez-jar-confirm"><input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} /><span>The team confirms that its category and problem statement are final.</span></label>
            <button className="tez-jar-draw-button" type="submit">Confirm &amp; Draw One Card</button>
          </form>

          {message && <p className="tez-jar-message" role="status">{message}</p>}

          {result && (
            <article className="tez-jar-result" aria-live="polite">
              <div><span>{result.cardId}</span><small>{result.category === "web" ? "WEB DEVELOPMENT" : "MACHINE LEARNING"}</small></div>
              <h2>{result.cardTitle}</h2>
              <p>{result.task}</p>
              <section><strong>How it will be checked</strong><p>{result.check}</p></section>
              <footer><span>{result.teamId} · {result.teamName}</span><span>{result.problemId}</span><span>{formatTime(result.drawnAt)} IST</span></footer>
              <button type="button" onClick={prepareNextTeam}>Prepare for Next Team</button>
            </article>
          )}
        </section>

        <section className="tez-content-panel tez-jar-panel">
          <div className="tez-section-heading">
            <span className="tez-section-number">02</span>
            <div><p className="tez-handwritten-label">Saved on this device</p><h2>Draw register ({draws.length})</h2></div>
          </div>
          
          <div className="tez-jar-actions"><button type="button" onClick={exportCsv} disabled={!draws.length}>Download CSV</button><button className="danger" type="button" onClick={clearRecords} disabled={!draws.length}>Clear All Records</button></div>
          <div className="tez-jar-table-wrap">
            <table><thead><tr><th>Team</th><th>Category / PS</th><th>Challenge</th><th>Drawn at</th></tr></thead>
              <tbody>{draws.length ? [...draws].reverse().map((draw) => <tr key={draw.teamId}><td><strong>{draw.teamId}</strong><br />{draw.teamName}</td><td>{draw.category === "web" ? "Web" : "ML"}<br />{draw.problemId}</td><td><strong>{draw.cardId}</strong><br />{draw.cardTitle}</td><td>{formatTime(draw.drawnAt)} IST</td></tr>) : <tr><td colSpan="4" className="empty">No challenge cards have been drawn yet.</td></tr>}</tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
