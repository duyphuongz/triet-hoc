from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.page_visit import PageVisit

router = APIRouter(prefix="/tracking", tags=["tracking"])


class VisitRequest(BaseModel):
    anonymousClientId: str


@router.post("/visit")
def record_visit(request: VisitRequest, db: Session = Depends(get_db)):
    # Record a visit for this client ID
    visit = PageVisit(anonymous_client_id=request.anonymousClientId)
    db.add(visit)
    db.commit()
    return {"status": "ok"}
