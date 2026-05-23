from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.routes.mappers import admin_result_item
from app.core.database import get_db
from app.core.security import get_current_admin
from app.repositories.result_repository import list_results
from app.schemas.admin_schema import AdminResultListItem, AdminStatsResponse
from app.services.admin_service import get_stats

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(get_current_admin)],
)


@router.get("/results", response_model=list[AdminResultListItem])
def get_results(db: Session = Depends(get_db)) -> list[AdminResultListItem]:
    return [admin_result_item(result) for result in list_results(db)]


@router.get("/stats", response_model=AdminStatsResponse)
def stats(db: Session = Depends(get_db)) -> AdminStatsResponse:
    return get_stats(db)
