# Backend

CashTrack uses Supabase as the backend:

- Supabase Auth handles signup/login.
- Supabase Postgres stores expenses and monthly paychecks.
- Row Level Security keeps each user's data private.

There is no separate custom server yet. If the app later needs server-side jobs, Stripe billing, admin tools, or secure email/PDF automation, add them here as API routes or server functions.
