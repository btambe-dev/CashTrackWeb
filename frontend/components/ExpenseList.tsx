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
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p className="muted">No expenses yet.</p>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <article className="expense-row" key={expense.id}>
              <div>
                <strong>{expense.title}</strong>
                <span>
                  {expense.category} · {new Date(`${expense.spent_at}T00:00:00`).toLocaleDateString()}
                </span>
              </div>
              <div className="row-actions">
                <strong>{formatCurrency(Number(expense.amount))}</strong>
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
