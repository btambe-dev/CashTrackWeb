export type Category =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Health"
  | "Travel"
  | "Other";

export type Expense = {
  id: string;
  user_id: string;
  title: string;
  amount: number;
  category: Category;
  spent_at: string;
  note: string | null;
  created_at: string;
};

export type Paycheck = {
  id: string;
  user_id: string;
  month_key: string;
  amount: number;
  created_at: string;
  updated_at: string;
};

export const categories: Category[] = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Travel",
  "Other"
];
