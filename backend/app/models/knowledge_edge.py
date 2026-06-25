from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.models.mixins import IdMixin, TimestampMixin
from app.models.knowledge_node import KnowledgeNode


class KnowledgeEdge(IdMixin, TimestampMixin, Base):
    __tablename__ = "knowledge_edges"

    source_id: Mapped[int] = mapped_column(ForeignKey("knowledge_nodes.id", ondelete="CASCADE"), index=True, nullable=False)
    target_id: Mapped[int] = mapped_column(ForeignKey("knowledge_nodes.id", ondelete="CASCADE"), index=True, nullable=False)
    label: Mapped[str] = mapped_column(String(255), nullable=True) # e.g., 'bao gồm', 'quyết định'

    source: Mapped["KnowledgeNode"] = relationship("KnowledgeNode", foreign_keys=[source_id])
    target: Mapped["KnowledgeNode"] = relationship("KnowledgeNode", foreign_keys=[target_id])
