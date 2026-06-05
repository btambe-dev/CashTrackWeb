"use client";

import { useEffect, useMemo, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { FileText, LogOut, Plus, TrendingDown, WalletCards } from "lucide-react";
import { AuthView } from "@/components/AuthView";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { PaycheckPanel } from "@/components/PaycheckPanel";
import { StatementsView } from "@/components/StatementsView";
import { supabase } from "@/lib/supabase";
import { Expense, Paycheck } from "@/lib/types";
import { currentMonthKey, expenseMonthKey, formatCurrency, monthTitle } from "@/lib/date";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [paychecks, setPaychecks] = useState<Paycheck[]>([]);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showStatements, setShowStatements] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session?.user.id) {
      setExpenses([]);
      setPaychecks([]);
      return;
    }

    loadData(session.user.id);
  }, [session?.user.id]);

  async function loadData(userId: string) {
    const [{ data: expenseRows }, { data: paycheckRows }] = await Promise.all([
      supabase.from("expenses").select("*").eq("user_id", userId).order("spent_at", { ascending: false }),
      supabase.from("paychecks").select("*").eq("user_id", userId)
    ]);

    setExpenses((expenseRows ?? []) as Expense[]);
    setPaychecks((paycheckRows ?? []) as Paycheck[]);
  }

  const monthKey = currentMonthKey();
  const currentMonthExpenses = expenses.filter((expense) => expenseMonthKey(expense.spent_at) === monthKey);
  const spentThisMonth = currentMonthExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const paycheck = paychecks.find((item) => item.month_key === monthKey)?.amount ?? 0;
  const remaining = paycheck - spentThisMonth;
  const spendRate = paycheck > 0 ? Math.min((spentThisMonth / paycheck) * 100, 100) : 0;
  const displayName = session?.user.user_metadata?.name || session?.user.email?.split("@")[0] || "there";

  const statementMonths = useMemo(() => {
    return Array.from(new Set(expenses.map((expense) => expenseMonthKey(expense.spent_at)))).sort().reverse();
  }, [expenses]);

  if (loading) {
    return <main className="center-screen">Loading CashTrack...</main>;
  }

  if (!session) {
    return <AuthView />;
  }

  return (
    <main className="app-shell">
      <section className="topbar">
        <div>
          <p className="eyebrow">Welcome back, {displayName}</p>
          <h1>Your money dashboard</h1>
          <p className="topbar-copy">Track this month&apos;s paycheck, spending, and statements in one place.</p>
        </div>
        <button className="ghost-button" onClick={() => supabase.auth.signOut()}>
          <LogOut size={18} />
          Log out
        </button>
      </section>

      <section className="summary-card">
        <div className="summary-header">
          <div>
            <p className="eyebrow">{monthTitle(monthKey)}</p>
            <strong className={remaining < 0 ? "amount danger" : "amount"}>{formatCurrency(remaining)}</strong>
            <p className="summary-subtitle">available after tracked expenses</p>
          </div>
          <div className="summary-icon">
            <WalletCards size={34} />
          </div>
        </div>
        <div className="progress-wrap">
          <div className="progress-header">
            <span>Monthly spend progress</span>
            <strong>{Math.round(spendRate)}%</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${spendRate}%` }} />
          </div>
        </div>
        <div className="summary-grid">
          <Metric label="Paycheck" value={formatCurrency(paycheck)} detail="saved for this month" />
          <Metric label="Spent" value={formatCurrency(spentThisMonth)} detail="tracked expenses" />
          <Metric label="Expenses" value={String(currentMonthExpenses.length)} detail="entries this month" />
        </div>
        <PaycheckPanel
          userId={session.user.id}
          monthKey={monthKey}
          paycheck={paycheck}
          onSaved={() => loadData(session.user.id)}
        />
      </section>

      <section className="actions-row">
        <button className="primary-button" onClick={() => setShowExpenseForm(true)}>
          <Plus size={18} />
          Add Expense
        </button>
        <button className={showStatements ? "secondary-button active" : "secondary-button"} onClick={() => setShowStatements((value) => !value)}>
          <FileText size={18} />
          {showStatements ? "Viewing statements" : "Statements"}
        </button>
        <div className="insight-pill">
          <TrendingDown size={16} />
          {currentMonthExpenses.length === 0 ? "No spending logged yet" : `${currentMonthExpenses.length} expenses this month`}
        </div>
      </section>

      <section className="content-grid">
        <div>
          {showExpenseForm && (
            <ExpenseForm
              userId={session.user.id}
              onClose={() => setShowExpenseForm(false)}
              onSaved={() => loadData(session.user.id)}
            />
          )}

          {showStatements ? (
            <StatementsView expenses={expenses} monthKeys={statementMonths} />
          ) : (
            <ExpenseList expenses={expenses} onDeleted={() => loadData(session.user.id)} />
          )}
        </div>
        <aside className="side-panel">
          <p className="eyebrow">Quick view</p>
          <h2>{remaining >= 0 ? "You are in control." : "Spending is over plan."}</h2>
          <p className="muted">
            {paycheck > 0
              ? `${formatCurrency(Math.max(remaining, 0))} remains from your saved paycheck.`
              : "Add this month's paycheck to unlock your remaining balance."}
          </p>
          <div className="mini-stat">
            <span>Statement months</span>
            <strong>{statementMonths.length}</strong>
          </div>
          <div className="mini-stat">
            <span>Total expenses</span>
            <strong>{expenses.length}</strong>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}
