# Architecture

## System Overview

TriếtLýLàGì? is a deterministic quiz app. The frontend collects 20 Likert-scale answers, FastAPI validates the complete submission, the scoring service calculates weighted normalized scores, and PostgreSQL stores the public result behind a share slug.

```mermaid
flowchart TD
    A[User opens Landing Page] --> B[Starts Quiz]
    B --> C[Frontend loads Questions from FastAPI]
    C --> D[User answers 20 questions]
    D --> E[Submit answers]
    E --> F[FastAPI validates answers]
    F --> G[Scoring Service calculates weighted scores]
    G --> H[Store Session, Answers, Result, Scores in PostgreSQL]
    H --> I[Return Share Slug]
    I --> J[Frontend shows Result Page]
    J --> K[User can share public result link]
    J --> L[Result saved in local browser history]
```

## Database Design

```mermaid
erDiagram
    philosophies ||--o{ question_weights : weights
    questions ||--o{ question_weights : has
    survey_sessions ||--o{ survey_answers : records
    questions ||--o{ survey_answers : answered
    survey_sessions ||--|| survey_results : produces
    philosophies ||--o{ survey_results : dominant
    survey_results ||--o{ survey_result_scores : has
    philosophies ||--o{ survey_result_scores : scored
    admin_users ||--o{ admin_users : authenticates
```

Main tables:

- `philosophies`: profile copy, strengths, blind spots, style explanations, illustration key.
- `questions`: scenario question text, section, order, active flag.
- `question_weights`: deterministic scoring weights by question and philosophy.
- `survey_sessions`: anonymous client id, public share slug, user agent, completion timestamps.
- `survey_answers`: validated Likert answers.
- `survey_results`: summary and dominant/secondary philosophy.
- `survey_result_scores`: raw score, normalized percentage, rank for every philosophy.
- `admin_users`: email and hashed password for JWT login.

## API Flow

```mermaid
sequenceDiagram
    participant UI as React UI
    participant API as FastAPI
    participant DB as PostgreSQL
    UI->>API: GET /api/questions
    API->>DB: active questions + weights hidden
    API-->>UI: question list + scale labels
    UI->>API: POST /api/survey/submit
    API->>API: validate 20 answers
    API->>API: calculate weighted scores
    API->>DB: save session, answers, result, scores
    API-->>UI: resultId + shareSlug + topThree
    UI->>API: GET /api/results/{shareSlug}
    API->>DB: load public result
    API-->>UI: explanation + scores + disclaimer
```

## Scoring Flow

For each answer:

```text
score[philosophy] += answer_value * weight
```

Normalization is per philosophy:

```text
percentage = raw_score / max_possible_score_for_that_philosophy * 100
```

This keeps profiles with fewer weighted questions from being unfairly penalized. Ties are deterministic: higher percentage, then higher raw score, then philosophy key.

## Admin Flow

```mermaid
flowchart LR
    A[Admin Login] --> B[JWT Access Token]
    B --> C[Dashboard Stats]
    B --> D[Question CRUD]
    B --> E[Philosophy CRUD]
    D --> F[Edit Question Weights]
    E --> G[Update Result Copy]
```

Admin endpoints require a bearer token. Quiz takers never log in and are only tracked by a browser-generated anonymous client id.

## Boundaries

- API routes stay thin and call services.
- Services contain business rules and validation.
- Repositories contain SQLAlchemy data access.
- `scoring_service.py` is pure and unit-testable.
- Seed content lives in `app/seed`, separate from runtime logic.
