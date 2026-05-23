from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.repositories.result_repository import get_by_share_slug
from app.schemas.result_schema import PublicResultResponse
from app.services.result_service import public_result

router = APIRouter(prefix="/results", tags=["results"])


@router.get("/{share_slug}", response_model=PublicResultResponse)
def get_result(share_slug: str, db: Session = Depends(get_db)) -> PublicResultResponse:
    result = get_by_share_slug(db, share_slug)
    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Không tìm thấy kết quả.")
    return public_result(result)
