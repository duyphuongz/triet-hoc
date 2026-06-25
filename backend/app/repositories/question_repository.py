from sqlalchemy import delete, select
from sqlalchemy.orm import Session, joinedload

from app.models.philosophy import Philosophy
from app.models.question import Question
from app.models.question_weight import QuestionWeight


from sqlalchemy.orm import selectinload
from sqlalchemy.sql.expression import func

def list_active_questions(
    db: Session, course_code: str = "MLN111", limit: int | None = None, randomize: bool = False
) -> list[Question]:
    stmt = (
        select(Question)
        .where(Question.is_active.is_(True), Question.course_code == course_code)
        .options(selectinload(Question.weights).joinedload(QuestionWeight.philosophy))
    )
    if randomize:
        stmt = stmt.order_by(func.random())
    else:
        stmt = stmt.order_by(Question.order_index)
        
    if limit is not None:
        stmt = stmt.limit(limit)
        
    return list(db.scalars(stmt).all())


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
        .options(selectinload(Question.weights).joinedload(QuestionWeight.philosophy))
    )
    return db.scalars(stmt).unique().one_or_none()

def list_by_codes(db: Session, codes: list[str]) -> list[Question]:
    if not codes: return []
    stmt = (
        select(Question)
        .where(Question.code.in_(codes))
        .options(selectinload(Question.weights).joinedload(QuestionWeight.philosophy))
    )
    return list(db.scalars(stmt).all())


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
