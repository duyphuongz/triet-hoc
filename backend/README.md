# Backend

FastAPI backend for **TriếtLýLàGì?** with SQLAlchemy 2.0, Alembic, deterministic weighted scoring, PostgreSQL storage, and JWT-protected admin APIs.

## Local Commands

```bash
cd backend
cp .env.example .env
docker compose up --build
```

Manual local run:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
python -m app.seed.seed_data
uvicorn app.main:app --reload
```

## API Groups

- `GET /api/health`
- `GET /api/questions`
- `GET /api/philosophies`
- `POST /api/survey/submit`
- `GET /api/results/{share_slug}`
- `GET /api/history/{anonymous_client_id}`
- `POST /api/admin/auth/login`
- `GET/POST/PUT/DELETE /api/admin/questions`
- `GET/POST/PUT /api/admin/philosophies`
- `GET /api/admin/results`
- `GET /api/admin/stats`
