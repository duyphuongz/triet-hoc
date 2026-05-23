from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.main import app
from app.models import AdminUser, Philosophy, Question, QuestionWeight, SurveyAnswer
from app.seed.seed_data import seed_database


@pytest.fixture()
def client() -> Generator[TestClient, None, None]:
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    Base.metadata.create_all(bind=engine)

    with TestingSessionLocal() as db:
        seed_database(db, ensure_admin=True)

    def override_get_db() -> Generator[Session, None, None]:
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


def test_submit_survey_returns_share_slug_and_top_three(client: TestClient) -> None:
    response = client.post(
        "/api/survey/submit",
        json={
            "anonymousClientId": "browser-test-1",
            "answers": [
                {"questionCode": f"q{index:03d}", "answerValue": 4}
                for index in range(1, 21)
            ],
        },
    )

    assert response.status_code == 200, response.text
    payload = response.json()
    assert payload["shareSlug"]
    assert payload["shareUrl"] == f"/results/{payload['shareSlug']}"
    assert len(payload["topThree"]) == 3

    result_response = client.get(f"/api/results/{payload['shareSlug']}")
    assert result_response.status_code == 200
    result_payload = result_response.json()
    assert result_payload["shareSlug"] == payload["shareSlug"]
    assert "disclaimer" in result_payload
    assert len(result_payload["scoreBreakdown"]) == 11


def test_submit_rejects_duplicate_question(client: TestClient) -> None:
    answers = [{"questionCode": f"q{index:03d}", "answerValue": 3} for index in range(1, 20)]
    answers.append({"questionCode": "q001", "answerValue": 4})

    response = client.post(
        "/api/survey/submit",
        json={"anonymousClientId": "browser-test-2", "answers": answers},
    )

    assert response.status_code == 400
    assert "trùng" in response.json()["detail"]


def test_history_filters_by_anonymous_client_id(client: TestClient) -> None:
    response = client.post(
        "/api/survey/submit",
        json={
            "anonymousClientId": "browser-history",
            "answers": [
                {"questionCode": f"q{index:03d}", "answerValue": 5}
                for index in range(1, 21)
            ],
        },
    )
    assert response.status_code == 200

    history = client.get("/api/history/browser-history")
    assert history.status_code == 200
    assert len(history.json()["results"]) == 1


def test_admin_login_returns_jwt_token(client: TestClient) -> None:
    response = client.post(
        "/api/admin/auth/login",
        json={"email": "admin@example.com", "password": "admin123"},
    )

    assert response.status_code == 200, response.text
    assert response.json()["accessToken"]
    assert response.json()["tokenType"] == "bearer"
