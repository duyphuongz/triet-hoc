from pydantic import BaseModel, Field


class SurveyAnswerPayload(BaseModel):
    questionCode: str
    answerValue: int = Field(ge=1, le=5)


class SurveySubmitRequest(BaseModel):
    courseCode: str = "MLN111"
    anonymousClientId: str | None = None
    answers: list[SurveyAnswerPayload]


class TopThreeItem(BaseModel):
    rank: int
    key: str
    nameVi: str
    percentage: float


class SurveySubmitResponse(BaseModel):
    resultId: str
    shareSlug: str
    topThree: list[TopThreeItem]
    shareUrl: str
