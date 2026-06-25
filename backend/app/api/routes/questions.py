from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.routes.mappers import question_public
from app.core.database import get_db
from app.repositories.question_repository import list_active_questions
from app.schemas.question_schema import SCALE_LABELS, QuestionsResponse

router = APIRouter(prefix="/questions", tags=["questions"])


from typing import Literal

@router.get("", response_model=QuestionsResponse)
def get_questions(
    course_code: str = "MLN111",
    limit: int | None = None,
    db: Session = Depends(get_db)
) -> QuestionsResponse:
    randomize = limit is not None
    questions = list_active_questions(db, course_code=course_code, limit=limit, randomize=randomize)
    return QuestionsResponse(
        questions=[question_public(question) for question in questions],
        scale=SCALE_LABELS,
    )
