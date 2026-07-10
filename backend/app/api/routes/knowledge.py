from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.knowledge_node import KnowledgeNode
from app.models.knowledge_edge import KnowledgeEdge

router = APIRouter(prefix="/knowledge", tags=["knowledge"])

SNIPPET_CONTEXT_CHARS = 60


def _make_snippet(content: str, query: str) -> str:
    lower_content = content.lower()
    idx = lower_content.find(query.lower())
    if idx == -1:
        return content[: SNIPPET_CONTEXT_CHARS * 2].strip()

    start = max(0, idx - SNIPPET_CONTEXT_CHARS)
    end = min(len(content), idx + len(query) + SNIPPET_CONTEXT_CHARS)
    snippet = content[start:end].replace("\n", " ").strip()
    if start > 0:
        snippet = "…" + snippet
    if end < len(content):
        snippet = snippet + "…"
    return snippet


@router.get("/search")
def search_knowledge_nodes(q: str, course_code: str = "MLN122", limit: int = 30, db: Session = Depends(get_db)):
    query = q.strip()
    if len(query) < 2:
        return {"results": []}

    pattern = f"%{query}%"
    nodes = (
        db.query(KnowledgeNode)
        .filter(
            KnowledgeNode.course_code == course_code,
            or_(KnowledgeNode.title.ilike(pattern), KnowledgeNode.content.ilike(pattern)),
        )
        .limit(limit)
        .all()
    )

    results = []
    for node in nodes:
        title_match = query.lower() in node.title.lower()
        content_match = query.lower() in node.content.lower()
        results.append(
            {
                "slug": node.slug,
                "title": node.title,
                "type": node.node_type,
                "matched_in": "title" if title_match and not content_match else ("content" if content_match and not title_match else "both"),
                "snippet": _make_snippet(node.content, query),
            }
        )

    # Title matches first, then content-only matches
    results.sort(key=lambda r: 0 if r["matched_in"] in ("title", "both") else 1)
    return {"results": results}


@router.get("/graph")
def get_knowledge_graph(course_code: str = "MLN122", db: Session = Depends(get_db)):
    nodes = db.query(KnowledgeNode).filter(KnowledgeNode.course_code == course_code).all()
    edges = db.query(KnowledgeEdge).all()

    # Filter edges to only include those between nodes in this course
    node_ids = {node.id for node in nodes}
    course_edges = [edge for edge in edges if edge.source_id in node_ids and edge.target_id in node_ids]

    return {
        "nodes": [
            {
                "id": node.slug,
                "title": node.title,
                "group": node.group,
                "type": node.node_type
            } for node in nodes
        ],
        "links": [
            {
                "source": edge.source.slug,
                "target": edge.target.slug,
                "label": edge.label
            } for edge in course_edges
        ]
    }

@router.get("/nodes/{slug}")
def get_knowledge_node(slug: str, db: Session = Depends(get_db)):
    node = db.query(KnowledgeNode).filter(KnowledgeNode.slug == slug).first()
    if not node:
        raise HTTPException(status_code=404, detail="Node not found")

    # Get linked from and linked to
    linked_to = db.query(KnowledgeEdge).filter(KnowledgeEdge.source_id == node.id).all()
    linked_from = db.query(KnowledgeEdge).filter(KnowledgeEdge.target_id == node.id).all()

    return {
        "id": node.slug,
        "title": node.title,
        "content": node.content,
        "type": node.node_type,
        "linked_to": [{"slug": edge.target.slug, "title": edge.target.title, "label": edge.label} for edge in linked_to],
        "linked_from": [{"slug": edge.source.slug, "title": edge.source.title, "label": edge.label} for edge in linked_from]
    }
