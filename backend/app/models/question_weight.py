from sqlalchemy import ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import IdMixin, TimestampMixin


class QuestionWeight(IdMixin, TimestampMixin, Base):
    __tablename__ = "question_weights"
    __table_args__ = (UniqueConstraint("question_id", "philosophy_id", name="uq_question_philosophy"),)

    question_id: Mapped[str] = mapped_column(
        ForeignKey("questions.id", ondelete="CASCADE"), nullable=False
    )
    philosophy_id: Mapped[str] = mapped_column(
        ForeignKey("philosophies.id", ondelete="CASCADE"), nullable=False
    )
    weight: Mapped[int] = mapped_column(Integer, nullable=False)

    question = relationship("Question", back_populates="weights")
    philosophy = relationship("Philosophy", back_populates="weights")
