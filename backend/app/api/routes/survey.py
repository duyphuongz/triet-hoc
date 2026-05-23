from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.survey_schema import SurveySubmitRequest, SurveySubmitResponse
from app.services.survey_service import SurveyValidationError, submit_survey

router = APIRouter(prefix="/survey", tags=["survey"])


@router.post("/submit", response_model=SurveySubmitResponse)
def submit(
    payload: SurveySubmitRequest,
    db: Session = Depends(get_db),
) -> SurveySubmitResponse:
    try:
        return submit_survey(db, payload, user_agent=None).response
    except SurveyValidationError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
