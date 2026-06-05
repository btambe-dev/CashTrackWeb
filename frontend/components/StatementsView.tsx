"use client";

import jsPDF from "jspdf";
import { Download } from "lucide-react";
import { expenseMonthKey, formatCurrency, monthTitle } from "@/lib/date";
import { categories, Expense } from "@/lib/types";

type Props = {
  expenses: Expense[];
  monthKeys: string[];
};

export function StatementsView({ expenses, monthKeys }: Props) {
  function download(monthKey: string) {
    const rows = expenses.filter((expense) => expenseMonthKey(expense.spent_at) === monthKey);
    const total = rows.reduce((sum, expense) => sum + Number(expense.amount), 0);
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("CashTrack Statement", 20, 22);
    doc.setFontSize(14);
    doc.text(monthTitle(monthKey), 20, 34);
    doc.setFontSize(20);
    doc.text(`Total: ${formatCurrency(total)}`, 20, 52);

    let y = 72;
    doc.setFontSize(13);
    doc.text("Category totals", 20, y);
    y += 10;
    categories.forEach((category) => {
      const categoryTotal = rows
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + Number(expense.amount), 0);
      if (categoryTotal > 0) {
        doc.text(`${category}: ${formatCurrency(categoryTotal)}`, 20, y);
        y += 8;
      }
    });

    y += 8;
    doc.text("Expenses", 20, y);
    y += 10;
    rows.forEach((expense) => {
      if (y > 275) {
        doc.addPage();
        y = 20;
      }
      doc.text(`${expense.spent_at}  ${expense.title}  ${formatCurrency(Number(expense.amount))}`, 20, y);
      y += 8;
    });

    doc.save(`CashTrack-${monthKey}.pdf`);
  }

  return (
    <section className="panel">
      <h2>Monthly statements</h2>
      {monthKeys.length === 0 ? (
        <p className="muted">No statements yet.</p>
      ) : (
        <div className="statement-list">
          {monthKeys.map((monthKey) => {
            const rows = expenses.filter((expense) => expenseMonthKey(expense.spent_at) === monthKey);
            const total = rows.reduce((sum, expense) => sum + Number(expense.amount), 0);

            return (
              <article className="statement-row" key={monthKey}>
                <div>
                  <strong>{monthTitle(monthKey)}</strong>
                  <span>{rows.length} expenses</span>
                </div>
                <div className="row-actions">
                  <strong>{formatCurrency(total)}</strong>
                  <button className="icon-button" onClick={() => download(monthKey)} aria-label="Download statement PDF">
                    <Download size={16} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
