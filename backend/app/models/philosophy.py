from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import IdMixin, TimestampMixin
from app.models.types import JSONB_TYPE


class Philosophy(IdMixin, TimestampMixin, Base):
    __tablename__ = "philosophies"

    key: Mapped[str] = mapped_column(String(80), unique=True, index=True, nullable=False)
    name_vi: Mapped[str] = mapped_column(String(160), nullable=False)
    name_en: Mapped[str] = mapped_column(String(160), nullable=False)
    short_description: Mapped[str] = mapped_column(Text, nullable=False)
    long_description: Mapped[str] = mapped_column(Text, nullable=False)
    strengths: Mapped[list[str]] = mapped_column(JSONB_TYPE, default=list, nullable=False)
    blind_spots: Mapped[list[str]] = mapped_column(JSONB_TYPE, default=list, nullable=False)
    work_style: Mapped[str] = mapped_column(Text, nullable=False)
    learning_style: Mapped[str] = mapped_column(Text, nullable=False)
    conflict_style: Mapped[str] = mapped_column(Text, nullable=False)
    life_meaning_style: Mapped[str] = mapped_column(Text, nullable=False)
    growth_suggestions: Mapped[list[str]] = mapped_column(JSONB_TYPE, default=list, nullable=False)
    illustration_key: Mapped[str] = mapped_column(String(80), nullable=False)

    weights = relationship("QuestionWeight", back_populates="philosophy")
