"use client";

import { Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/date";
import { Expense } from "@/lib/types";

export function ExpenseList({ expenses, onDeleted }: { expenses: Expense[]; onDeleted: () => void }) {
  async function remove(id: string) {
    await supabase.from("expenses").delete().eq("id", id);
    onDeleted();
  }

  return (
    <section className="panel">
      <div className="panel-title">
        <div>
          <p className="eyebrow">Recent activity</p>
          <h2>Expenses</h2>
        </div>
        <span className="count-pill">{expenses.length}</span>
      </div>
      {expenses.length === 0 ? (
        <div className="empty-state">
          <strong>No expenses yet</strong>
          <p className="muted">Add your first expense to start seeing your monthly spending picture.</p>
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <article className="expense-row" key={expense.id}>
              <div className="expense-main">
                <span className="category-chip">{expense.category}</span>
                <strong>{expense.title}</strong>
                <span>
                  {new Date(`${expense.spent_at}T00:00:00`).toLocaleDateString()}
                  {expense.note ? ` · ${expense.note}` : ""}
                </span>
              </div>
              <div className="row-actions">
                <strong className="expense-amount">{formatCurrency(Number(expense.amount))}</strong>
                <button className="icon-button" onClick={() => remove(expense.id)} aria-label="Delete expense">
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
