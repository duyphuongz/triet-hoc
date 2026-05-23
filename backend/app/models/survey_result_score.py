from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import IdMixin
from app.models.mixins import utc_now


class SurveyResultScore(IdMixin, Base):
    __tablename__ = "survey_result_scores"
    __table_args__ = (UniqueConstraint("result_id", "philosophy_id", name="uq_result_philosophy"),)

    result_id: Mapped[str] = mapped_column(
        ForeignKey("survey_results.id", ondelete="CASCADE"), nullable=False
    )
    philosophy_id: Mapped[str] = mapped_column(ForeignKey("philosophies.id"), nullable=False)
    raw_score: Mapped[float] = mapped_column(Float, nullable=False)
    percentage: Mapped[float] = mapped_column(Float, nullable=False)
    rank: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=utc_now, nullable=False)

    result = relationship("SurveyResult", back_populates="scores")
    philosophy = relationship("Philosophy")
