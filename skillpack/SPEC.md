# Project SPEC (Skillpack)

Fill this file in before asking any agent to route/select skills.

## Goal
- Build the full-stack academic MVP web app "TriếtLýLàGì?" for a Vietnamese philosophy quiz with deterministic scoring, shareable results, browser history, and an admin dashboard.

## Scope
### In scope
- FastAPI backend with SQLAlchemy, Alembic, deterministic weighted scoring, seed data, public APIs, JWT-protected admin APIs, Docker support, and documentation.
- React/Vite/TypeScript/Tailwind frontend with quiz flow, result pages, history, admin login/dashboard, CRUD screens, and local SVG illustrations.
- PostgreSQL-ready configuration for Neon and local docker-compose PostgreSQL.
- Backend unit/API tests for scoring and survey submission.

### Out of scope
- External AI APIs.
- User login for quiz takers.
- Collection of personal identity data.

## Project types (tick all that apply)
- [x] Backend API
- [x] Frontend Web
- [ ] Mobile
- [x] DevOps/Infra

## Stack preferences
- Languages: Python 3.12+, TypeScript
- Frameworks: FastAPI, SQLAlchemy 2.0, Alembic, React, Vite, Tailwind CSS, React Router, Zustand, Recharts
- Hosting/infra: Neon PostgreSQL for production database; local Docker Compose PostgreSQL
- CI: Not required for MVP
- Testing level: unit + basic API integration
- Security/compliance constraints: JWT for admin APIs; no quiz-taker PII; public result links only expose non-sensitive result content

## Non-functional requirements
- Performance: lightweight deterministic scoring and small API payloads
- Reliability: validation for complete 20-question submissions and duplicate/unknown answers
- Maintainability: layered backend, modular frontend, typed contracts, seed data separated from services
- Observability: health endpoint and clear docs for local/prod setup

## Acceptance criteria
- The acceptance criteria are the full checklist from the user-provided project request, including frontend quiz/result/history/admin flows, backend APIs, migrations, seed data, tests, Docker, and Vietnamese result copy.
