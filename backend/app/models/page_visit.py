from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.mixins import IdMixin, TimestampMixin


class PageVisit(IdMixin, TimestampMixin, Base):
    __tablename__ = "page_visits"

    anonymous_client_id: Mapped[str] = mapped_column(String(255), index=True, nullable=False)
