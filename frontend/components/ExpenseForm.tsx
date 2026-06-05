"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { categories, Category } from "@/lib/types";

type Props = {
  userId: string;
  onClose: () => void;
  onSaved: () => void;
};

export function ExpenseForm({ userId, onClose, onSaved }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [spentAt, setSpentAt] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");

  async function save() {
    if (!title || !amount) return;

    await supabase.from("expenses").insert({
      user_id: userId,
      title,
      amount: Number(amount),
      category,
      spent_at: spentAt,
      note
    });

    onSaved();
    onClose();
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Add expense</h2>
        <button className="ghost-button compact" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="form-grid">
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" />
        <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Amount" type="number" />
        <select value={category} onChange={(event) => setCategory(event.target.value as Category)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <input value={spentAt} onChange={(event) => setSpentAt(event.target.value)} type="date" />
        <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Note" />
      </div>
      <button className="primary-button" onClick={save}>
        Save expense
      </button>
    </section>
  );
}
