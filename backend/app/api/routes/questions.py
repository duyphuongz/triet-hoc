from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.routes.mappers import question_public
from app.core.database import get_db
from app.repositories.question_repository import list_active_questions
from app.schemas.question_schema import SCALE_LABELS, QuestionsResponse

router = APIRouter(prefix="/questions", tags=["questions"])


@router.get("", response_model=QuestionsResponse)
def get_questions(db: Session = Depends(get_db)) -> QuestionsResponse:
    return QuestionsResponse(
        questions=[question_public(question) for question in list_active_questions(db)],
        scale=SCALE_LABELS,
    )
