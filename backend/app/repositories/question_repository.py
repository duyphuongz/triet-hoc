from sqlalchemy import delete, select
from sqlalchemy.orm import Session, joinedload

from app.models.philosophy import Philosophy
from app.models.question import Question
from app.models.question_weight import QuestionWeight


def list_active_questions(db: Session) -> list[Question]:
    stmt = (
        select(Question)
        .where(Question.is_active.is_(True))
        .options(joinedload(Question.weights).joinedload(QuestionWeight.philosophy))
        .order_by(Question.order_index)
    )
    return list(db.scalars(stmt).unique().all())


def list_admin_questions(db: Session) -> list[Question]:
    stmt = (
        select(Question)
        .options(joinedload(Question.weights).joinedload(QuestionWeight.philosophy))
        .order_by(Question.order_index)
    )
    return list(db.scalars(stmt).unique().all())


def get_by_id(db: Session, question_id: str) -> Question | None:
    stmt = (
        select(Question)
        .where(Question.id == question_id)
        .options(joinedload(Question.weights).joinedload(QuestionWeight.philosophy))
    )
    return db.scalars(stmt).unique().one_or_none()


def get_by_code(db: Session, code: str) -> Question | None:
    stmt = (
        select(Question)
        .where(Question.code == code)
        .options(joinedload(Question.weights).joinedload(QuestionWeight.philosophy))
    )
    return db.scalars(stmt).unique().one_or_none()


def create_question(db: Session, question: Question, weights: dict[str, tuple[Philosophy, int]]) -> Question:
    db.add(question)
    db.flush()
    replace_weights(db, question, weights)
    db.flush()
    return question


def replace_weights(db: Session, question: Question, weights: dict[str, tuple[Philosophy, int]]) -> None:
    db.execute(delete(QuestionWeight).where(QuestionWeight.question_id == question.id))
    for philosophy, weight_value in weights.values():
        if weight_value > 0:
            db.add(
                QuestionWeight(
                    question_id=question.id,
                    philosophy_id=philosophy.id,
                    weight=weight_value,
                )
            )
