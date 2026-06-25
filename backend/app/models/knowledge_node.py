from sqlalchemy import String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import IdMixin, TimestampMixin


class KnowledgeNode(IdMixin, TimestampMixin, Base):
    __tablename__ = "knowledge_nodes"

    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    course_code: Mapped[str] = mapped_column(String(32), index=True, nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    node_type: Mapped[str] = mapped_column(String(50), nullable=False) # e.g., 'concept', 'law', 'theory'
    group: Mapped[int] = mapped_column(nullable=False, default=1) # For coloring nodes
    content: Mapped[str] = mapped_column(Text, nullable=False)

    # We will define relationships in KnowledgeEdge, but we can also add backrefs if needed.
