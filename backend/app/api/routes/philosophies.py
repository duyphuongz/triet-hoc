from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.routes.mappers import philosophy_public
from app.core.database import get_db
from app.repositories.philosophy_repository import list_philosophies
from app.schemas.philosophy_schema import PhilosophyPublic

router = APIRouter(prefix="/philosophies", tags=["philosophies"])


@router.get("", response_model=list[PhilosophyPublic])
def get_philosophies(db: Session = Depends(get_db)) -> list[PhilosophyPublic]:
    return [philosophy_public(philosophy) for philosophy in list_philosophies(db)]
