from datetime import UTC, datetime

from fastapi import APIRouter, Depends, Query
from pydantic import BaseModel
from sqlalchemy import desc, func, select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import get_current_admin
from app.models.page_visit import PageVisit

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    dependencies=[Depends(get_current_admin)],
)


class VisitorItem(BaseModel):
    id: str
    anonymousClientId: str
    ipAddress: str | None = None
    userAgent: str | None = None
    browser: str | None = None
    browserVersion: str | None = None
    os: str | None = None
    osVersion: str | None = None
    deviceType: str | None = None
    acceptLanguage: str | None = None
    referer: str | None = None
    screenWidth: int | None = None
    screenHeight: int | None = None
    timezone: str | None = None
    language: str | None = None
    platform: str | None = None
    pageUrl: str | None = None
    createdAt: str


class VisitorStats(BaseModel):
    totalVisits: int
    uniqueVisitors: int
    todayVisits: int
    todayUnique: int
    topBrowsers: list[dict]
    topOS: list[dict]
    topDeviceTypes: list[dict]
    topCountries: list[dict]  # based on timezone


class VisitorListResponse(BaseModel):
    visitors: list[VisitorItem]
    total: int
    page: int
    pageSize: int
    stats: VisitorStats


@router.get("/visitors", response_model=VisitorListResponse)
def get_visitors(
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
    device_type: str | None = None,
    browser: str | None = None,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    # Base query
    query = select(PageVisit).order_by(desc(PageVisit.created_at))
    count_query = select(func.count(PageVisit.id))

    # Filters
    if device_type:
        query = query.where(PageVisit.device_type == device_type)
        count_query = count_query.where(PageVisit.device_type == device_type)
    if browser:
        query = query.where(PageVisit.browser == browser)
        count_query = count_query.where(PageVisit.browser == browser)
    if search:
        search_filter = PageVisit.ip_address.ilike(f"%{search}%") | PageVisit.anonymous_client_id.ilike(f"%{search}%")
        query = query.where(search_filter)
        count_query = count_query.where(search_filter)

    total = db.scalar(count_query) or 0

    # Paginate
    offset = (page - 1) * page_size
    visits = db.scalars(query.offset(offset).limit(page_size)).all()

    # Stats
    now = datetime.now(UTC).replace(tzinfo=None)
    today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)

    total_all = db.scalar(select(func.count(PageVisit.id))) or 0
    unique_all = db.scalar(select(func.count(func.distinct(PageVisit.anonymous_client_id)))) or 0
    today_all = db.scalar(
        select(func.count(PageVisit.id)).where(PageVisit.created_at >= today_start)
    ) or 0
    today_unique = db.scalar(
        select(func.count(func.distinct(PageVisit.anonymous_client_id))).where(
            PageVisit.created_at >= today_start
        )
    ) or 0

    # Top browsers
    top_browsers = db.execute(
        select(PageVisit.browser, func.count(PageVisit.id).label("count"))
        .where(PageVisit.browser.isnot(None))
        .group_by(PageVisit.browser)
        .order_by(desc("count"))
        .limit(10)
    ).all()

    # Top OS
    top_os = db.execute(
        select(PageVisit.os, func.count(PageVisit.id).label("count"))
        .where(PageVisit.os.isnot(None))
        .group_by(PageVisit.os)
        .order_by(desc("count"))
        .limit(10)
    ).all()

    # Top device types
    top_devices = db.execute(
        select(PageVisit.device_type, func.count(PageVisit.id).label("count"))
        .where(PageVisit.device_type.isnot(None))
        .group_by(PageVisit.device_type)
        .order_by(desc("count"))
        .limit(10)
    ).all()

    # Top timezones (as proxy for country)
    top_tz = db.execute(
        select(PageVisit.timezone, func.count(PageVisit.id).label("count"))
        .where(PageVisit.timezone.isnot(None))
        .group_by(PageVisit.timezone)
        .order_by(desc("count"))
        .limit(10)
    ).all()

    stats = VisitorStats(
        totalVisits=total_all,
        uniqueVisitors=unique_all,
        todayVisits=today_all,
        todayUnique=today_unique,
        topBrowsers=[{"name": b, "count": c} for b, c in top_browsers],
        topOS=[{"name": o, "count": c} for o, c in top_os],
        topDeviceTypes=[{"name": d, "count": c} for d, c in top_devices],
        topCountries=[{"name": t, "count": c} for t, c in top_tz],
    )

    visitor_items = [
        VisitorItem(
            id=v.id,
            anonymousClientId=v.anonymous_client_id,
            ipAddress=v.ip_address,
            userAgent=v.user_agent,
            browser=v.browser,
            browserVersion=v.browser_version,
            os=v.os,
            osVersion=v.os_version,
            deviceType=v.device_type,
            acceptLanguage=v.accept_language,
            referer=v.referer,
            screenWidth=v.screen_width,
            screenHeight=v.screen_height,
            timezone=v.timezone,
            language=v.language,
            platform=v.platform,
            pageUrl=v.page_url,
            createdAt=v.created_at.isoformat(),
        )
        for v in visits
    ]

    return VisitorListResponse(
        visitors=visitor_items,
        total=total,
        page=page,
        pageSize=page_size,
        stats=stats,
    )
