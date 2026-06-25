from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime

from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.user import User

router = APIRouter(
    prefix="/admin/users",
    tags=["admin-users"],
    dependencies=[Depends(get_current_admin)],
)

class AdminUserItem(BaseModel):
    id: str
    email: str
    name: str | None
    createdAt: datetime

@router.get("", response_model=list[AdminUserItem])
def list_users(db: Session = Depends(get_db)) -> list[AdminUserItem]:
    from sqlalchemy import select, desc
    users = db.scalars(select(User).order_by(desc(User.created_at))).all()
    return [
        AdminUserItem(
            id=u.id,
            email=u.email,
            name=u.name,
            createdAt=u.created_at
        )
        for u in users
    ]
