from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.admin_schema import AdminLoginRequest, AdminTokenResponse
from app.services.admin_service import authenticate_admin

router = APIRouter(prefix="/admin/auth", tags=["admin-auth"])


@router.post("/login", response_model=AdminTokenResponse)
def login(payload: AdminLoginRequest, db: Session = Depends(get_db)) -> AdminTokenResponse:
    token = authenticate_admin(db, payload.email, payload.password)
    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email hoặc mật khẩu quản trị không đúng.",
        )
    return AdminTokenResponse(accessToken=token)
