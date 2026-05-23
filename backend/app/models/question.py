from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import IdMixin, TimestampMixin


class Question(IdMixin, TimestampMixin, Base):
    __tablename__ = "questions"

    code: Mapped[str] = mapped_column(String(32), unique=True, index=True, nullable=False)
    section: Mapped[str] = mapped_column(String(80), index=True, nullable=False)
    text: Mapped[str] = mapped_column(Text, nullable=False)
    order_index: Mapped[int] = mapped_column(Integer, index=True, nullable=False)
    illustration_key: Mapped[str] = mapped_column(String(80), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    weights = relationship(
        "QuestionWeight", back_populates="question", cascade="all, delete-orphan"
    )
