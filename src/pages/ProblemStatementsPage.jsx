import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  categoryDetails,
  problemStatements,
} from "../data/problemStatements";
import "./problem-statements.css";

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7 9V3h10v6" />
      <path d="M7 18H5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M7 14h10v7H7z" />
    </svg>
  );
}

function DetailBlock({ label, children, tone = "default" }) {
  return (
    <section className={`th26-ps-detail th26-ps-detail--${tone}`}>
      <h4>{label}</h4>
      <p>{children}</p>
    </section>
  );
}

function ProblemCard({ item, expanded, onToggle }) {
  const detailsId = `details-${item.code.toLowerCase()}`;
  const flowLabel = item.category === "ml" ? "Minimum scope" : "Required flow";

  return (
    <article
      className={`th26-ps-card ${expanded ? "is-expanded" : ""}`}
      id={item.code.toLowerCase()}
    >
      <button
        className="th26-ps-card__summary"
        type="button"
        aria-expanded={expanded}
        aria-controls={detailsId}
        onClick={onToggle}
      >
        <span className="th26-ps-code">{item.code}</span>
        <span className="th26-ps-card__heading">
          <strong>{item.title}</strong>
          <span>{item.problem}</span>
        </span>
        <span className="th26-ps-chevron" aria-hidden="true" />
      </button>

      {expanded && (
        <div className="th26-ps-card__details" id={detailsId}>
          <section className="th26-ps-mvp">
            <h4>Expected 48-hour MVP</h4>
            <ul>
              {item.mvp.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>

          <div className="th26-ps-detail-grid">
            <DetailBlock label="Build goal">{item.goal}</DetailBlock>
            <DetailBlock label={flowLabel}>{item.flow}</DetailBlock>
            <DetailBlock label="Important rules" tone="warning">
              {item.rules}
            </DetailBlock>
            
          </div>
        </div>
      )}
    </article>
  );
}

export default function ProblemStatementsPage() {
  const [activeCategory, setActiveCategory] = useState("web");
  const [query, setQuery] = useState("");
  const [expandedCodes, setExpandedCodes] = useState(new Set());

  const categoryItems = useMemo(
    () => problemStatements.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return categoryItems;

    return categoryItems.filter((item) =>
      [
        item.code,
        item.title,
        item.problem,
        item.goal,
        item.flow,
        item.rules,
       
        ...item.mvp,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [categoryItems, query]);

  const allVisibleExpanded =
    visibleItems.length > 0 &&
    visibleItems.every((item) => expandedCodes.has(item.code));

  function changeCategory(category) {
    setActiveCategory(category);
    setQuery("");
    setExpandedCodes(new Set());
  }

  function toggleCard(code) {
    setExpandedCodes((current) => {
      const next = new Set(current);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  }

  function toggleAllVisible() {
    setExpandedCodes((current) => {
      const next = new Set(current);
      visibleItems.forEach((item) => {
        if (allVisibleExpanded) next.delete(item.code);
        else next.add(item.code);
      });
      return next;
    });
  }

  function printCurrentCategory() {
    setExpandedCodes(
      new Set(categoryItems.map((item) => item.code))
    );
    window.setTimeout(() => window.print(), 80);
  }

  return (
    <main className="th26-ps-page">
      <div className="tez-sections th26-ps-sections">
        <section className="tez-content-panel th26-ps-intro">
          <Link className="th26-ps-home-link" to="/">
            <span aria-hidden="true">←</span> Back to home
          </Link>

          <div className="tez-section-heading th26-ps-main-heading">
            <span className="tez-section-number">PS</span>

            <div>
              <p className="tez-handwritten-label">Official Participant Release</p>
              <h1>Problem Statements</h1>
            </div>
          </div>

          <div className="th26-ps-intro-copy">
            <p>
              Choose one category and read the complete scope before submitting your
              preferences. Every statement is designed for a working 48-hour prototype.
            </p>

            <div className="th26-ps-count-note" aria-label="16 problem statements">
              <strong>16</strong>
              <span>8 Web + 8 ML</span>
            </div>
          </div>

          <aside className="th26-ps-notice" aria-label="Problem statement selection rules">
            <p className="tez-handwritten-label">Before You Choose</p>
            <ol>
              <li>Select only one category and one problem statement.</li>
              <li>Keep a second and third preference ready.</li>
              <li>Allocation is first-confirmed. A confirmed statement cannot be changed.</li>
              <li>The compulsory challenge card will be drawn separately after allocation.</li>
            </ol>
          </aside>
        </section>

        <section className="tez-content-panel th26-ps-browser" aria-labelledby="browse-title">
          <div className="th26-ps-browser__heading">
            <div className="tez-section-heading th26-ps-browser-title">
              <span className="tez-section-number">01</span>

              <div>
                <p className="tez-handwritten-label">Choose a Category</p>
              <h2 id="browse-title">Find your problem statement</h2>
              </div>
            </div>

            <button
              className="th26-ps-print"
              type="button"
              onClick={printCurrentCategory}
            >
              <PrintIcon /> Print / Save PDF
            </button>
          </div>

          <div className="th26-ps-toolbar">
            <div className="th26-ps-tabs" role="tablist" aria-label="Problem statement category">
              {Object.entries(categoryDetails).map(([key, details]) => {
                const count = problemStatements.filter((item) => item.category === key).length;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === key}
                    className={activeCategory === key ? "is-active" : ""}
                    onClick={() => changeCategory(key)}
                  >
                    {details.label}
                    <span>{count}</span>
                  </button>
                );
              })}
            </div>

            <label className="th26-ps-search">
              <span className="sr-only">Search problem statements</span>
              <SearchIcon />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search ${categoryDetails[activeCategory].shortLabel} statements`}
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search">
                  ×
                </button>
              )}
            </label>
          </div>

          <div className="th26-ps-list-heading">
            <div>
              <strong>{categoryDetails[activeCategory].label}</strong>
              <span>{categoryDetails[activeCategory].description}</span>
            </div>
            <button type="button" onClick={toggleAllVisible} disabled={!visibleItems.length}>
              {allVisibleExpanded ? "Collapse all" : "Expand all"}
            </button>
          </div>

          <p className="th26-ps-result-count" aria-live="polite">
            Showing {visibleItems.length} of {categoryItems.length} statements
          </p>

          <div className="th26-ps-list">
            {visibleItems.map((item) => (
              <ProblemCard
                key={item.code}
                item={item}
                expanded={expandedCodes.has(item.code)}
                onToggle={() => toggleCard(item.code)}
              />
            ))}
          </div>

          {!visibleItems.length && (
            <div className="th26-ps-empty">
              <strong>No matching statement found.</strong>
              <p>Try another keyword or clear the search.</p>
              <button type="button" onClick={() => setQuery("")}>Clear search</button>
            </div>
          )}
        </section>

        <footer className="th26-ps-footer">
          <p>
            Questions about unclear wording may be raised with the organising team.
            Technical solutions or implementation steps will not be provided.
          </p>
          <Link to="/">TEZHACK 2026</Link>
        </footer>
      </div>
    </main>
  );
}
