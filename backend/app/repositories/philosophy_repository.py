from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.philosophy import Philosophy


def list_philosophies(db: Session, course_code: str = "MLN111") -> list[Philosophy]:
    return list(db.scalars(select(Philosophy).where(Philosophy.course_code == course_code).order_by(Philosophy.name_vi)).all())


def get_by_key(db: Session, key: str) -> Philosophy | None:
    return db.scalar(select(Philosophy).where(Philosophy.key == key))


def get_by_id(db: Session, philosophy_id: str) -> Philosophy | None:
    return db.get(Philosophy, philosophy_id)


def key_map(db: Session, course_code: str = "MLN111") -> dict[str, Philosophy]:
    return {philosophy.key: philosophy for philosophy in list_philosophies(db, course_code)}
