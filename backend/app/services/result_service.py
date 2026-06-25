from app.models.philosophy import Philosophy
from app.models.survey_result import SurveyResult
from app.models.survey_result_score import SurveyResultScore
from app.schemas.philosophy_schema import PhilosophyDetail
from app.schemas.result_schema import HistoryItem, PublicResultResponse, ScoreBreakdownItem
from app.schemas.survey_schema import TopThreeItem

DISCLAIMER = (
    "Kết quả này chỉ là gợi ý phản tư vui vẻ cho mục đích học tập, không phải chẩn đoán "
    "tâm lý, y khoa hay kết luận chuyên môn về con người bạn."
)


def philosophy_detail(philosophy: Philosophy) -> PhilosophyDetail:
    return PhilosophyDetail(
        id=philosophy.id,
        key=philosophy.key,
        nameVi=philosophy.name_vi,
        nameEn=philosophy.name_en,
        shortDescription=philosophy.short_description,
        longDescription=philosophy.long_description,
        strengths=philosophy.strengths,
        blindSpots=philosophy.blind_spots,
        workStyle=philosophy.work_style,
        learningStyle=philosophy.learning_style,
        conflictStyle=philosophy.conflict_style,
        lifeMeaningStyle=philosophy.life_meaning_style,
        growthSuggestions=philosophy.growth_suggestions,
        illustrationKey=philosophy.illustration_key,
    )


def top_three_items(scores: list[SurveyResultScore]) -> list[TopThreeItem]:
    return [
        TopThreeItem(
            rank=score.rank,
            key=score.philosophy.key,
            nameVi=score.philosophy.name_vi,
            percentage=round(score.percentage, 2),
        )
        for score in sorted(scores, key=lambda item: item.rank)[:3]
    ]


def score_breakdown_items(scores: list[SurveyResultScore]) -> list[ScoreBreakdownItem]:
    return [
        ScoreBreakdownItem(
            rank=score.rank,
            key=score.philosophy.key,
            nameVi=score.philosophy.name_vi,
            rawScore=round(score.raw_score, 2),
            percentage=round(score.percentage, 2),
        )
        for score in sorted(scores, key=lambda item: item.rank)
    ]


def public_result(result: SurveyResult) -> PublicResultResponse:
    return PublicResultResponse(
        resultId=result.id,
        shareSlug=result.session.share_slug,
        createdAt=result.created_at,
        topThree=top_three_items(result.scores),
        scoreBreakdown=score_breakdown_items(result.scores),
        dominant=philosophy_detail(result.dominant_philosophy),
        resultSummary=result.result_summary,
        explanation=result.explanation,
        disclaimer=DISCLAIMER,
    )


def history_item(result: SurveyResult) -> HistoryItem:
    return HistoryItem(
        resultId=result.id,
        shareSlug=result.session.share_slug,
        createdAt=result.created_at,
        courseCode=result.session.course_code,
        topThree=top_three_items(result.scores),
    )


def make_result_copy(dominant: Philosophy, top_keys: list[str]) -> tuple[str, str]:
    summary = (
        f"Bạn nghiêng về {dominant.name_vi} — phiên bản đời thường đang tự phản tư "
        "nhưng vẫn cần nộp bài đúng hạn."
    )
    explanation = (
        f"Câu trả lời của bạn gợi ý rằng các tình huống hằng ngày đang kéo bạn gần với "
        f"{dominant.name_vi}. Nhóm xu hướng nổi bật của bạn gồm {', '.join(top_keys)}. "
        "Đọc kết quả như một chiếc gương nhỏ để suy nghĩ thêm, không phải nhãn dán vĩnh viễn."
    )
    return summary, explanation
