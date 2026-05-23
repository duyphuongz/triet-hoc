from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.models.admin_user import AdminUser
from app.repositories import result_repository
from app.schemas.admin_schema import AdminStatsResponse, AverageScoreItem, CompletionByDayItem


def authenticate_admin(db: Session, email: str, password: str) -> str | None:
    from sqlalchemy import select

    admin = db.scalar(select(AdminUser).where(AdminUser.email == email))
    if admin is None or not verify_password(password, admin.password_hash):
        return None
    return create_access_token(admin.email)


def get_stats(db: Session) -> AdminStatsResponse:
    dominant = result_repository.dominant_counts(db)
    return AdminStatsResponse(
        totalSurveyCount=result_repository.total_result_count(db),
        mostCommonDominantPhilosophy=dominant[0][1] if dominant else None,
        averageScoresByPhilosophy=[
            AverageScoreItem(key=key, nameVi=name_vi, averagePercentage=round(value, 2))
            for key, name_vi, value in result_repository.average_scores(db)
        ],
        completionCountByDay=[
            CompletionByDayItem(date=date_value, count=count)
            for date_value, count in result_repository.completion_count_by_day(db)
        ],
    )
