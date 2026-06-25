from datetime import datetime

from pydantic import BaseModel

from app.schemas.philosophy_schema import PhilosophyDetail
from app.schemas.survey_schema import TopThreeItem


class ScoreBreakdownItem(BaseModel):
    rank: int
    key: str
    nameVi: str
    rawScore: float
    percentage: float


class PublicResultResponse(BaseModel):
    resultId: str
    shareSlug: str
    createdAt: datetime
    topThree: list[TopThreeItem]
    scoreBreakdown: list[ScoreBreakdownItem]
    dominant: PhilosophyDetail
    resultSummary: str
    explanation: str
    disclaimer: str


class HistoryItem(BaseModel):
    resultId: str
    shareSlug: str
    createdAt: datetime
    courseCode: str
    topThree: list[TopThreeItem]


class HistoryResponse(BaseModel):
    anonymousClientId: str
    results: list[HistoryItem]
