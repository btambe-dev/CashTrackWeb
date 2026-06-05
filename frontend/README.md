# Frontend

Next.js app deployed on Vercel.

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Set these in `.env.local` and in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## Deploy

In Vercel, set the project root directory to:

```text
frontend
```

Then add the environment variables above.
