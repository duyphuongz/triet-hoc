from datetime import datetime

from pydantic import BaseModel

from app.schemas.result_schema import ScoreBreakdownItem
from app.schemas.survey_schema import TopThreeItem


class AdminLoginRequest(BaseModel):
    email: str
    password: str


class AdminTokenResponse(BaseModel):
    accessToken: str
    tokenType: str = "bearer"


class AdminResultListItem(BaseModel):
    resultId: str
    shareSlug: str
    createdAt: datetime
    topPhilosophy: str
    topThree: list[TopThreeItem]


class AverageScoreItem(BaseModel):
    key: str
    nameVi: str
    averagePercentage: float


class CompletionByDayItem(BaseModel):
    date: str
    count: int


class AdminStatsResponse(BaseModel):
    totalSurveyCount: int
    mostCommonDominantPhilosophy: str | None
    averageScoresByPhilosophy: list[AverageScoreItem]
    completionCountByDay: list[CompletionByDayItem]
