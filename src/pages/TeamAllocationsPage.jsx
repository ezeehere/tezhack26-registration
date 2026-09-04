import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { teamAllocations } from "../data/teamAllocations";
import "./team-allocations.css";

export default function TeamAllocationsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const visibleTeams = useMemo(() => {
    const search = query.trim().toLowerCase();
    return teamAllocations
      .filter((team) => category === "All" || team.category === category)
      .filter((team) => !search || [team.teamId, team.teamName, team.problemId, team.problem, team.challengeId, team.challenge].some((value) => value.toLowerCase().includes(search)))
      .sort((a, b) => a.teamName.localeCompare(b.teamName));
  }, [query, category]);

  const webCount = teamAllocations.filter((team) => team.category === "Web Development").length;
  const mlCount = teamAllocations.length - webCount;

  return (
    <main className="ta-page">
      <header className="ta-hero">
        <div className="ta-hero-top"><Link to="/">← Back to TEZHACK</Link><span>OFFICIAL ALLOCATION • 4 SEPTEMBER 2026</span></div>
        <p className="ta-handwritten">Problem Statement &amp; Challenge Card</p>
        <h1>Team Allocations</h1>
        <p className="ta-intro">Find your team and check the assigned problem statement, compulsory challenge card and verification requirement.</p>
        <div className="ta-stats"><span><strong>{teamAllocations.length}</strong> Teams</span><span><strong>{webCount}</strong> Web</span><span><strong>{mlCount}</strong> ML</span></div>
      </header>

      <section className="ta-content">
        <div className="ta-controls">
          <label><span>Find your team</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search team name, Team ID, PS or challenge..." /></label>
          <div className="ta-filters" aria-label="Filter by category">
            {["All", "Web Development", "Machine Learning"].map((item) => <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item === "Web Development" ? "Web" : item === "Machine Learning" ? "ML" : item}</button>)}
          </div>
        </div>

        <p className="ta-result-count">Showing {visibleTeams.length} team{visibleTeams.length === 1 ? "" : "s"}</p>

        <div className="ta-grid">
          {visibleTeams.map((team, index) => (
            <details className={`ta-card ${team.category === "Machine Learning" ? "ta-card-ml" : ""}`} key={team.teamId} style={{ "--card-index": index }}>
              <summary>
                <div className="ta-card-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="ta-team-heading"><span>TEAM ID {team.teamId}</span><h2>{team.teamName}</h2></div>
                <div className="ta-category">{team.category === "Web Development" ? "WEB" : "ML"}</div>
                <span className="ta-open-icon" aria-hidden="true">+</span>
              </summary>
              <div className="ta-card-body">
                <section><div className="ta-section-label"><span>{team.problemId}</span> Problem Statement</div><h3>{team.problem}</h3></section>
                <section className="ta-challenge"><div className="ta-section-label"><span>{team.challengeId}</span> Challenge Card</div><h3>{team.challenge}</h3><p>{team.task}</p></section>
                <section className="ta-check"><strong>How it will be checked</strong><p>{team.judgeCheck}</p></section>
              </div>
            </details>
          ))}
        </div>

        {!visibleTeams.length && <div className="ta-empty"><strong>No matching team found.</strong><span>Check the spelling or select All.</span></div>}
      </section>
    </main>
  );
}
