"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export function AuthView() {
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function submit() {
    setMessage("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } }
      });
      setMessage(error ? error.message : "Account created. Check your email if confirmation is enabled.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
  }

  return (
    <main className="auth-screen">
      <section className="auth-card">
        <div className="auth-welcome">
          <div className="brand-row">
            <div className="logo-mark">CT</div>
            <span>CashTrack</span>
          </div>
          <p className="eyebrow">Personal finance, simplified</p>
          <h1>{mode === "signup" ? "Start tracking with confidence." : "Welcome back to CashTrack."}</h1>
          <p className="auth-copy">
            Keep your paycheck, spending, monthly statements, and downloadable PDF reports together in one calm,
            organized workspace.
          </p>
          <div className="auth-highlights">
            <span>Monthly paycheck reset</span>
            <span>Expense statements</span>
            <span>PDF downloads</span>
          </div>
        </div>

        <div className="auth-form">
          <div className="form-heading">
            <h2>{mode === "signup" ? "Create your account" : "Sign in"}</h2>
            <p>{mode === "signup" ? "Set up your private CashTrack space." : "Continue managing your money."}</p>
          </div>

          {mode === "signup" && (
            <label>
              Name
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
            </label>
          )}

          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
            />
          </label>

          {message && <p className="form-message">{message}</p>}

          <button className="primary-button wide" onClick={submit}>
            {mode === "signup" ? "Create account" : "Log in"}
          </button>
          <button className="text-button" onClick={() => setMode(mode === "signup" ? "login" : "signup")}>
            {mode === "signup" ? "Already have an account? Log in" : "Need an account? Sign up"}
          </button>
        </div>
      </section>
    </main>
  );
}
