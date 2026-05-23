# TriếtLýLàGì?

Full-stack academic MVP web app for a Vietnamese, Gen Z-friendly philosophy quiz. The app helps users reflect on which everyday philosophical tendencies they may lean toward. It is educational and playful, not a medical, psychological, or professional diagnosis.

## Tech Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router, Zustand, Recharts
- Backend: FastAPI, Python 3.12+, SQLAlchemy 2.0, Alembic, Pydantic v2
- Database: PostgreSQL locally or Neon PostgreSQL in production
- Auth: simple admin email/password login with JWT
- Testing: backend unit tests for scoring and basic API tests

## Run Backend

```bash
cd backend
cp .env.example .env
docker compose up --build
```

Manual backend run:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
python -m app.seed.seed_data
uvicorn app.main:app --reload
```

Backend API runs at `http://localhost:8000/api`.

## Run Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Neon PostgreSQL

Create a Neon project, open the Project Dashboard, and use the **Connect** button to copy a PostgreSQL connection string. Neon documents this flow in [Connecting Neon to your stack](https://neon.com/docs/get-started-with-neon/connect-neon). Put that value in `backend/.env` as `DATABASE_URL`.

Use a direct Neon connection string for Alembic migrations. Neon supports pooled strings with `-pooler` in the hostname for high-concurrency app traffic, but its pooling docs recommend direct connections for ORM/schema migration tools: [Neon connection pooling](https://neon.com/docs/connect/connection-pooling).

Example:

```env
DATABASE_URL=postgresql://user:password@ep-example.us-east-1.aws.neon.tech/dbname?sslmode=require
```

The backend normalizes `postgresql://` to SQLAlchemy's `postgresql+psycopg://` driver internally.

## Migrations And Seed

```bash
cd backend
alembic upgrade head
python -m app.seed.seed_data
```

Seed data creates:

- 11 philosophy profiles
- exactly 20 active questions
- question weights
- one admin account from `ADMIN_EMAIL` and `ADMIN_PASSWORD`

## Scoring

Each question has weighted philosophy keys. For every answer:

```text
score[philosophy] += answer_value * weight
```

Scores are normalized per philosophy by that philosophy's maximum possible weighted score. The API returns the top 3 and a full score breakdown for all 11 profiles.

## Share Links And History

No quiz-taker login is required. The frontend creates an anonymous browser id in `localStorage`. The backend stores it with each survey session and returns a public `shareSlug`. Result pages are available at:

```text
/results/:shareSlug
```

The history page loads previous results for the same browser/device through `GET /api/history/{anonymousClientId}`.

## Admin Dashboard

Go to `/admin/login`. Default local seed credentials are:

```text
admin@example.com
admin123
```

Change them with `ADMIN_EMAIL` and `ADMIN_PASSWORD` before seeding. Admin features include stats, result overview, question CRUD with weight editing, and philosophy profile CRUD.

## Security Notes

- Do not commit real `.env` files. Only `.env.example` files are tracked.
- Do not commit a real Neon connection string or real `SECRET_KEY`; use deployment environment variables.
- Quiz takers are not asked for name, email, phone, or identity data.
- Survey history uses an anonymous browser id stored locally on the user's device.
- Public result links expose only quiz result content, not identity information.
- The backend schema has a nullable `user_agent` column for future auditing, but the public survey submit route does not store user-agent data by default.
- Admin JWT is stored in browser `sessionStorage`, so it is cleared when the browser session ends.

## Tests

```bash
uv run pytest
```

The scoring test is pure. The API test uses an in-memory SQLite database and seed data.

## Docs

- Backend notes: [backend/README.md](backend/README.md)
- Architecture: [backend/docs/architecture.md](backend/docs/architecture.md)
