from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.routes.mappers import philosophy_admin
from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.philosophy import Philosophy
from app.repositories import philosophy_repository
from app.repositories.course_status_repository import MANAGED_COURSES
from app.schemas.philosophy_schema import (
    PhilosophyAdminCreate,
    PhilosophyAdminUpdate,
    PhilosophyDetail,
)

router = APIRouter(
    prefix="/admin/philosophies",
    tags=["admin-philosophies"],
    dependencies=[Depends(get_current_admin)],
)


@router.get("", response_model=list[PhilosophyDetail])
def list_philosophies(
    course_code: str = "MLN111", db: Session = Depends(get_db)
) -> list[PhilosophyDetail]:
    if course_code not in MANAGED_COURSES:
        raise HTTPException(status_code=400, detail="Mã môn học không hợp lệ.")
    return [
        philosophy_admin(item)
        for item in philosophy_repository.list_philosophies(db, course_code)
    ]


@router.post("", response_model=PhilosophyDetail)
def create_philosophy(
    payload: PhilosophyAdminCreate, db: Session = Depends(get_db)
) -> PhilosophyDetail:
    if philosophy_repository.get_by_key(db, payload.key):
        raise HTTPException(status_code=400, detail="Key triết học đã tồn tại.")
    philosophy = Philosophy(
        key=payload.key,
        name_vi=payload.nameVi,
        name_en=payload.nameEn,
        short_description=payload.shortDescription,
        long_description=payload.longDescription,
        strengths=payload.strengths,
        blind_spots=payload.blindSpots,
        work_style=payload.workStyle,
        learning_style=payload.learningStyle,
        conflict_style=payload.conflictStyle,
        life_meaning_style=payload.lifeMeaningStyle,
        growth_suggestions=payload.growthSuggestions,
        illustration_key=payload.illustrationKey,
    )
    db.add(philosophy)
    db.commit()
    db.refresh(philosophy)
    return philosophy_admin(philosophy)


@router.put("/{philosophy_id}", response_model=PhilosophyDetail)
def update_philosophy(
    philosophy_id: str, payload: PhilosophyAdminUpdate, db: Session = Depends(get_db)
) -> PhilosophyDetail:
    philosophy = philosophy_repository.get_by_id(db, philosophy_id)
    if philosophy is None:
        raise HTTPException(status_code=404, detail="Không tìm thấy hệ triết học.")

    field_map = {
        "nameVi": "name_vi",
        "nameEn": "name_en",
        "shortDescription": "short_description",
        "longDescription": "long_description",
        "strengths": "strengths",
        "blindSpots": "blind_spots",
        "workStyle": "work_style",
        "learningStyle": "learning_style",
        "conflictStyle": "conflict_style",
        "lifeMeaningStyle": "life_meaning_style",
        "growthSuggestions": "growth_suggestions",
        "illustrationKey": "illustration_key",
    }
    data = payload.model_dump(exclude_unset=True)
    for public_name, model_name in field_map.items():
        if public_name in data:
            setattr(philosophy, model_name, data[public_name])
    db.commit()
    db.refresh(philosophy)
    return philosophy_admin(philosophy)
