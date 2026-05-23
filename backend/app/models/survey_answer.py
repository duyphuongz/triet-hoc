from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import IdMixin
from app.models.mixins import utc_now


class SurveyAnswer(IdMixin, Base):
    __tablename__ = "survey_answers"
    __table_args__ = (UniqueConstraint("session_id", "question_id", name="uq_session_question"),)

    session_id: Mapped[str] = mapped_column(
        ForeignKey("survey_sessions.id", ondelete="CASCADE"), nullable=False
    )
    question_id: Mapped[str] = mapped_column(ForeignKey("questions.id"), nullable=False)
    answer_value: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now, nullable=False)

    session = relationship("SurveySession", back_populates="answers")
    question = relationship("Question")
