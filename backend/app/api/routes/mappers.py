from app.models.philosophy import Philosophy
from app.models.question import Question
from app.models.survey_result import SurveyResult
from app.schemas.admin_schema import AdminResultListItem
from app.schemas.philosophy_schema import PhilosophyDetail, PhilosophyPublic
from app.schemas.question_schema import QuestionAdminResponse, QuestionPublic, QuestionWeightPayload
from app.services.result_service import philosophy_detail, top_three_items


def question_public(question: Question) -> QuestionPublic:
    return QuestionPublic(
        code=question.code,
        section=question.section,
        text=question.text,
        orderIndex=question.order_index,
        illustrationKey=question.illustration_key,
    )


def question_admin(question: Question) -> QuestionAdminResponse:
    return QuestionAdminResponse(
        id=question.id,
        courseCode=question.course_code,
        code=question.code,
        section=question.section,
        text=question.text,
        orderIndex=question.order_index,
        illustrationKey=question.illustration_key,
        isActive=question.is_active,
        weights=[
            QuestionWeightPayload(philosophyKey=weight.philosophy.key, weight=weight.weight)
            for weight in sorted(question.weights, key=lambda item: item.philosophy.key)
        ],
    )


def philosophy_public(philosophy: Philosophy) -> PhilosophyPublic:
    return PhilosophyPublic(
        key=philosophy.key,
        nameVi=philosophy.name_vi,
        nameEn=philosophy.name_en,
        shortDescription=philosophy.short_description,
        illustrationKey=philosophy.illustration_key,
    )


def philosophy_admin(philosophy: Philosophy) -> PhilosophyDetail:
    return philosophy_detail(philosophy)


def admin_result_item(result: SurveyResult) -> AdminResultListItem:
    return AdminResultListItem(
        resultId=result.id,
        shareSlug=result.session.share_slug,
        createdAt=result.created_at,
        topPhilosophy=result.dominant_philosophy.name_vi,
        topThree=top_three_items(result.scores),
    )
