import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  JUDGING_STORAGE,
  PANEL_PASSWORDS,
} from "../data/judgingTeams";

import "./judging.css";


export default function JudgingLoginPage() {
  const navigate = useNavigate();

  const [panel, setPanel] =
    useState("GROUP_1");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  function handleLogin(event) {
    event.preventDefault();

    setError("");

    if (!password.trim()) {
      setError("Enter the panel password.");
      return;
    }

    if (
      password !==
      PANEL_PASSWORDS[panel]
    ) {
      setError("Incorrect panel password.");
      return;
    }

    sessionStorage.setItem(
      JUDGING_STORAGE.PANEL,
      panel
    );

    navigate("/judging/panel");
  }


  return (
    <main className="judge-page">

      <section className="judge-login-shell">

        <div className="judge-corner-fold" />


        {/* LEFT */}

        <div className="judge-login-brand">

          <p className="judge-handwritten">
            TEZHACK 2026
          </p>


          <div className="judge-tezhack-lockup">

            <div className="judge-tezhack-paper">
              TEZHACK
            </div>

            <span className="judge-year">
              2026
            </span>

            <div className="judge-console-strip">
              JUDGING CONSOLE
            </div>

          </div>


          <p className="judge-login-description">
            Official scoring system for
            TEZHACK 2026.
          </p>


          <div className="judge-group-info">

            <article>
              <span>GROUP 01</span>
              <strong>13 Teams</strong>
              <small>
                5 ML + 8 Web
              </small>
            </article>

            <article>
              <span>GROUP 02</span>
              <strong>14 Teams</strong>
              <small>
                14 Web
              </small>
            </article>

          </div>

        </div>


        {/* LOGIN */}

        <form
          className="judge-access-card"
          onSubmit={handleLogin}
        >

          <span className="judge-mono-label">
            PANEL ACCESS
          </span>

          <h2>
            SELECT YOUR
            <strong>PANEL</strong>
          </h2>


          <div className="judge-panel-options">

            <button
              type="button"
              className={
                panel === "GROUP_1"
                  ? "judge-panel-option active"
                  : "judge-panel-option"
              }
              onClick={() =>
                setPanel("GROUP_1")
              }
            >
              <b>01</b>

              <span>
                <strong>
                  GROUP 01
                </strong>

                <small>
                  13 Teams
                </small>
              </span>
            </button>


            <button
              type="button"
              className={
                panel === "GROUP_2"
                  ? "judge-panel-option active"
                  : "judge-panel-option"
              }
              onClick={() =>
                setPanel("GROUP_2")
              }
            >
              <b>02</b>

              <span>
                <strong>
                  GROUP 02
                </strong>

                <small>
                  14 Teams
                </small>
              </span>
            </button>

          </div>


          <label className="judge-field">

            <span>
              PANEL PASSWORD
            </span>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              placeholder="Enter password"
              autoComplete="off"
            />

          </label>


          {error && (
            <div className="judge-error">
              {error}
            </div>
          )}


          <button
            type="submit"
            className="judge-primary-button"
          >
            <span>
              ENTER JUDGING PANEL
            </span>

            <b>→</b>
          </button>


          <p className="judge-access-note">
            Access is intended only for
            assigned judging panels.
          </p>

        </form>

      </section>

    </main>
  );
}