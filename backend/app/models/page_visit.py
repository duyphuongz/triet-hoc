from sqlalchemy import String, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.mixins import IdMixin, TimestampMixin


class PageVisit(IdMixin, TimestampMixin, Base):
    __tablename__ = "page_visits"

    anonymous_client_id: Mapped[str] = mapped_column(String(255), index=True, nullable=False)

    # Request metadata
    ip_address: Mapped[str | None] = mapped_column(String(45), nullable=True)  # IPv6 max
    user_agent: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Parsed from User-Agent
    browser: Mapped[str | None] = mapped_column(String(100), nullable=True)
    browser_version: Mapped[str | None] = mapped_column(String(50), nullable=True)
    os: Mapped[str | None] = mapped_column(String(100), nullable=True)
    os_version: Mapped[str | None] = mapped_column(String(50), nullable=True)
    device_type: Mapped[str | None] = mapped_column(String(50), nullable=True)  # desktop/mobile/tablet

    # From request headers
    accept_language: Mapped[str | None] = mapped_column(String(255), nullable=True)
    referer: Mapped[str | None] = mapped_column(Text, nullable=True)

    # From frontend payload
    screen_width: Mapped[int | None] = mapped_column(Integer, nullable=True)
    screen_height: Mapped[int | None] = mapped_column(Integer, nullable=True)
    timezone: Mapped[str | None] = mapped_column(String(100), nullable=True)
    language: Mapped[str | None] = mapped_column(String(20), nullable=True)
    platform: Mapped[str | None] = mapped_column(String(100), nullable=True)
    page_url: Mapped[str | None] = mapped_column(Text, nullable=True)
