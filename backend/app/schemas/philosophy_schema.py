from pydantic import BaseModel


class PhilosophyPublic(BaseModel):
    key: str
    nameVi: str
    nameEn: str
    shortDescription: str
    illustrationKey: str


class PhilosophyDetail(PhilosophyPublic):
    id: str | None = None
    longDescription: str
    strengths: list[str]
    blindSpots: list[str]
    workStyle: str
    learningStyle: str
    conflictStyle: str
    lifeMeaningStyle: str
    growthSuggestions: list[str]


class PhilosophyAdminCreate(BaseModel):
    key: str
    nameVi: str
    nameEn: str
    shortDescription: str
    longDescription: str
    strengths: list[str]
    blindSpots: list[str]
    workStyle: str
    learningStyle: str
    conflictStyle: str
    lifeMeaningStyle: str
    growthSuggestions: list[str]
    illustrationKey: str


class PhilosophyAdminUpdate(BaseModel):
    nameVi: str | None = None
    nameEn: str | None = None
    shortDescription: str | None = None
    longDescription: str | None = None
    strengths: list[str] | None = None
    blindSpots: list[str] | None = None
    workStyle: str | None = None
    learningStyle: str | None = None
    conflictStyle: str | None = None
    lifeMeaningStyle: str | None = None
    growthSuggestions: list[str] | None = None
    illustrationKey: str | None = None
