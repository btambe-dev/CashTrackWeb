"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  userId: string;
  monthKey: string;
  paycheck: number;
  onSaved: () => void;
};

export function PaycheckPanel({ userId, monthKey, paycheck, onSaved }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState(paycheck > 0 ? String(paycheck) : "");

  async function save() {
    await supabase.from("paychecks").upsert(
      {
        user_id: userId,
        month_key: monthKey,
        amount: Number(amount || 0),
        updated_at: new Date().toISOString()
      },
      { onConflict: "user_id,month_key" }
    );
    setIsEditing(false);
    onSaved();
  }

  if (!isEditing) {
    return (
      <button className="small-link" onClick={() => setIsEditing(true)}>
        {paycheck > 0 ? "Edit paycheck" : "Add paycheck"}
      </button>
    );
  }

  return (
    <div className="paycheck-editor">
      <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="This month's paycheck" />
      <button className="primary-button compact" onClick={save}>
        Save
      </button>
      <button className="ghost-button compact" onClick={() => setIsEditing(false)}>
        Done
      </button>
    </div>
  );
}
