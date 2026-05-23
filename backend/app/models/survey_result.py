from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import IdMixin
from app.models.mixins import utc_now


class SurveyResult(IdMixin, Base):
    __tablename__ = "survey_results"

    session_id: Mapped[str] = mapped_column(
        ForeignKey("survey_sessions.id", ondelete="CASCADE"), unique=True, nullable=False
    )
    dominant_philosophy_id: Mapped[str] = mapped_column(ForeignKey("philosophies.id"), nullable=False)
    secondary_philosophy_id: Mapped[str | None] = mapped_column(ForeignKey("philosophies.id"), nullable=True)
    result_summary: Mapped[str] = mapped_column(Text, nullable=False)
    explanation: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now, nullable=False)

    session = relationship("SurveySession", back_populates="result")
    dominant_philosophy = relationship("Philosophy", foreign_keys=[dominant_philosophy_id])
    secondary_philosophy = relationship("Philosophy", foreign_keys=[secondary_philosophy_id])
    scores = relationship(
        "SurveyResultScore", back_populates="result", cascade="all, delete-orphan"
    )
