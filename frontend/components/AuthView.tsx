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
        <div className="logo-mark">CT</div>
        <h1>{mode === "signup" ? "Create CashTrack" : "Welcome back"}</h1>
        <p>Track paychecks, spending, monthly statements, and PDF reports from any device.</p>

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
          {mode === "signup" ? "Sign up" : "Log in"}
        </button>
        <button className="text-button" onClick={() => setMode(mode === "signup" ? "login" : "signup")}>
          {mode === "signup" ? "Already have an account? Log in" : "Need an account? Sign up"}
        </button>
      </section>
    </main>
  );
}
