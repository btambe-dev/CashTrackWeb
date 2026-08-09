# 💰 CashTrack Web

A modern personal finance application for tracking monthly income, expenses, spending progress, and financial statements.

CashTrack was built to provide a simple dashboard where users can manage everyday spending, monitor how much of their paycheck remains, and generate monthly expense statements.

🌐 **Live Application:**  
https://cash-track-web-nine.vercel.app

---

## ✨ Features

- 🔐 User authentication with Supabase Auth
- 💵 Monthly paycheck tracking
- 💳 Expense creation and management
- 📊 Monthly spending progress
- 💰 Remaining balance calculation
- 📅 Monthly expense organization
- 📄 Monthly financial statements
- 📥 PDF statement export
- 🛡️ Row Level Security for user-owned data
- ☁️ Cloud-hosted PostgreSQL database
- 🚀 Deployment through Vercel

---

## 🛠️ Tech Stack

### Frontend

- Next.js 15
- React 19
- TypeScript
- Lucide React

### Backend & Database

- Supabase
- Supabase Authentication
- PostgreSQL
- Row Level Security (RLS)

### Reporting

- jsPDF

### Deployment

- Vercel

---

## 🏗️ Architecture

```text
                   ┌─────────────────────┐
                   │       User          │
                   │   Web Browser       │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │     Next.js App     │
                   │ React / TypeScript  │
                   │       Vercel        │
                   └──────────┬──────────┘
                              │
                    Supabase Client API
                              │
               ┌──────────────┴──────────────┐
               ▼                             ▼
     ┌──────────────────┐          ┌──────────────────┐
     │  Supabase Auth   │          │   PostgreSQL     │
     │ Signup / Login   │          │                  │
     └──────────────────┘          │ • Expenses       │
                                   │ • Paychecks      │
                                   │ • RLS Policies   │
                                   └──────────────────┘
```

---

## 🔒 Security

CashTrack uses **Supabase Row Level Security** to isolate user data.

Each authenticated user can access only the expense and paycheck records associated with their own account.

Sensitive credentials are stored using environment variables and are not committed to the repository.

---

## 📊 Dashboard

The dashboard provides an overview of the current month, including:

- Monthly paycheck
- Total expenses
- Number of expense entries
- Remaining available balance
- Spending percentage
- Recent expenses

The remaining balance is calculated from:

```text
Remaining Balance = Monthly Paycheck - Monthly Expenses
```

---

## 📄 Monthly Statements

CashTrack automatically organizes expenses by month.

Users can generate downloadable PDF statements containing:

- Monthly spending total
- Spending grouped by category
- Individual expense entries

PDF generation is handled client-side using **jsPDF**.

---

## 📁 Project Structure

```text
CashTrackWeb/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   └── README.md
│
├── database/
│   ├── schema.sql
│   └── README.md
│
└── README.md
```

### `frontend/`

Next.js application containing the user interface and application logic.

### `backend/`

Documents the Supabase backend architecture and future server-side responsibilities.

### `database/`

Contains the PostgreSQL schema and Row Level Security policies used by Supabase.

---

## 🚀 Local Development

### 1. Clone the repository

```bash
git clone git@github.com:btambe-dev/CashTrackWeb.git
cd CashTrackWeb/frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the environment file

```bash
cp .env.example .env.local
```

Configure:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Configure the database

Run:

```text
database/schema.sql
```

inside the Supabase SQL Editor.

This creates the required database tables and Row Level Security policies.

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## ☁️ Deployment

The frontend is deployed using **Vercel**.

For deployment:

1. Set the Vercel root directory to `frontend`
2. Add the Supabase environment variables
3. Deploy the application

The production app is available at:

**https://cash-track-web-nine.vercel.app**

---

## 🎯 What This Project Demonstrates

CashTrack demonstrates hands-on experience with:

- Full-stack application architecture
- React and Next.js development
- TypeScript
- Authentication and authorization
- PostgreSQL databases
- Database security with Row Level Security
- Cloud-hosted backend services
- PDF report generation
- Environment variable management
- Application deployment with Vercel

---

## 🔮 Future Improvements

Potential additions include:

- Spending analytics and charts
- Budget goals
- Recurring expenses
- Additional reporting capabilities
- Automated notifications
- Improved financial insights
- Server-side automation and background jobs

---

## 👤 Author

**Bedolf Tambe**

Cloud • DevOps • Networking • Systems Administration • Software Engineering
