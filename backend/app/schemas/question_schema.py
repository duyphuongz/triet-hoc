from typing import Literal

from pydantic import BaseModel, Field


CourseCode = Literal["MLN111", "MLN122"]


SCALE_LABELS = {
    1: "Rất không đồng ý",
    2: "Không đồng ý",
    3: "Bình thường / chưa chắc",
    4: "Đồng ý",
    5: "Rất đồng ý",
}


class QuestionPublic(BaseModel):
    code: str
    section: str
    text: str
    orderIndex: int
    illustrationKey: str


class QuestionsResponse(BaseModel):
    questions: list[QuestionPublic]
    scale: dict[int, str]


class QuestionWeightPayload(BaseModel):
    philosophyKey: str
    weight: int = Field(ge=0, le=5)


class QuestionAdminPayload(BaseModel):
    courseCode: CourseCode
    code: str | None = None
    section: str
    text: str
    orderIndex: int
    illustrationKey: str
    isActive: bool = True
    weights: list[QuestionWeightPayload] = Field(default_factory=list)


class QuestionAdminResponse(QuestionPublic):
    id: str
    courseCode: CourseCode
    isActive: bool
    weights: list[QuestionWeightPayload]
