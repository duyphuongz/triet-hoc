from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.routes.mappers import question_admin
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.question import Question
from app.repositories import philosophy_repository, question_repository
from app.schemas.question_schema import QuestionAdminPayload, QuestionAdminResponse

router = APIRouter(
    prefix="/admin/questions",
    tags=["admin-questions"],
    dependencies=[Depends(get_current_admin)],
)


def _weights_by_key(db: Session, payload: QuestionAdminPayload):
    philosophies = philosophy_repository.key_map(db, payload.courseCode)
    weights = {}
    for item in payload.weights:
        philosophy = philosophies.get(item.philosophyKey)
        if philosophy is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Không có hệ triết học: {item.philosophyKey}",
            )
        weights[item.philosophyKey] = (philosophy, item.weight)
    return weights


@router.get("", response_model=list[QuestionAdminResponse])
def list_questions(db: Session = Depends(get_db)) -> list[QuestionAdminResponse]:
    return [question_admin(question) for question in question_repository.list_admin_questions(db)]


@router.post("", response_model=QuestionAdminResponse)
def create_question(
    payload: QuestionAdminPayload, db: Session = Depends(get_db)
) -> QuestionAdminResponse:
    if not payload.code:
        raise HTTPException(status_code=400, detail="Mã câu hỏi là bắt buộc.")
    if question_repository.get_by_code(db, payload.code):
        raise HTTPException(status_code=400, detail="Mã câu hỏi đã tồn tại.")

    question = Question(
        code=payload.code,
        course_code=payload.courseCode,
        section=payload.section,
        text=payload.text,
        order_index=payload.orderIndex,
        illustration_key=payload.illustrationKey,
        is_active=payload.isActive,
    )
    created = question_repository.create_question(db, question, _weights_by_key(db, payload))
    db.commit()
    db.refresh(created)
    return question_admin(question_repository.get_by_id(db, created.id) or created)


@router.put("/{question_id}", response_model=QuestionAdminResponse)
def update_question(
    question_id: str, payload: QuestionAdminPayload, db: Session = Depends(get_db)
) -> QuestionAdminResponse:
    question = question_repository.get_by_id(db, question_id)
    if question is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy câu hỏi.")
    if payload.code and payload.code != question.code and question_repository.get_by_code(db, payload.code):
        raise HTTPException(status_code=400, detail="Mã câu hỏi đã tồn tại.")

    if payload.code:
        question.code = payload.code
    question.course_code = payload.courseCode
    question.section = payload.section
    question.text = payload.text
    question.order_index = payload.orderIndex
    question.illustration_key = payload.illustrationKey
    question.is_active = payload.isActive
    question_repository.replace_weights(db, question, _weights_by_key(db, payload))
    db.commit()
    return question_admin(question_repository.get_by_id(db, question_id) or question)


@router.delete("/{question_id}")
def delete_question(question_id: str, db: Session = Depends(get_db)) -> dict[str, bool]:
    question = question_repository.get_by_id(db, question_id)
    if question is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy câu hỏi.")
    question.is_active = False
    db.commit()
    return {"ok": True}
