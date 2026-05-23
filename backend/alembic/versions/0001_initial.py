"""initial schema

Revision ID: 0001_initial
Revises:
Create Date: 2026-05-23
"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision: str = "0001_initial"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    jsonb_type = sa.JSON().with_variant(postgresql.JSONB(), "postgresql")
    op.create_table(
        "philosophies",
        sa.Column("key", sa.String(length=80), nullable=False),
        sa.Column("name_vi", sa.String(length=160), nullable=False),
        sa.Column("name_en", sa.String(length=160), nullable=False),
        sa.Column("short_description", sa.Text(), nullable=False),
        sa.Column("long_description", sa.Text(), nullable=False),
        sa.Column("strengths", jsonb_type, nullable=False),
        sa.Column("blind_spots", jsonb_type, nullable=False),
        sa.Column("work_style", sa.Text(), nullable=False),
        sa.Column("learning_style", sa.Text(), nullable=False),
        sa.Column("conflict_style", sa.Text(), nullable=False),
        sa.Column("life_meaning_style", sa.Text(), nullable=False),
        sa.Column("growth_suggestions", jsonb_type, nullable=False),
        sa.Column("illustration_key", sa.String(length=80), nullable=False),
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_philosophies_key"), "philosophies", ["key"], unique=True)

    op.create_table(
        "questions",
        sa.Column("code", sa.String(length=32), nullable=False),
        sa.Column("section", sa.String(length=80), nullable=False),
        sa.Column("text", sa.Text(), nullable=False),
        sa.Column("order_index", sa.Integer(), nullable=False),
        sa.Column("illustration_key", sa.String(length=80), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_questions_code"), "questions", ["code"], unique=True)
    op.create_index(op.f("ix_questions_order_index"), "questions", ["order_index"], unique=False)
    op.create_index(op.f("ix_questions_section"), "questions", ["section"], unique=False)

    op.create_table(
        "admin_users",
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_admin_users_email"), "admin_users", ["email"], unique=True)

    op.create_table(
        "question_weights",
        sa.Column("question_id", sa.String(length=36), nullable=False),
        sa.Column("philosophy_id", sa.String(length=36), nullable=False),
        sa.Column("weight", sa.Integer(), nullable=False),
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["philosophy_id"], ["philosophies.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["question_id"], ["questions.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("question_id", "philosophy_id", name="uq_question_philosophy"),
    )

    op.create_table(
        "survey_sessions",
        sa.Column("anonymous_client_id", sa.String(length=120), nullable=True),
        sa.Column("share_slug", sa.String(length=32), nullable=False),
        sa.Column("user_agent", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("completed_at", sa.DateTime(), nullable=True),
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_survey_sessions_anonymous_client_id"),
        "survey_sessions",
        ["anonymous_client_id"],
        unique=False,
    )
    op.create_index(op.f("ix_survey_sessions_share_slug"), "survey_sessions", ["share_slug"], unique=True)

    op.create_table(
        "survey_answers",
        sa.Column("session_id", sa.String(length=36), nullable=False),
        sa.Column("question_id", sa.String(length=36), nullable=False),
        sa.Column("answer_value", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.ForeignKeyConstraint(["question_id"], ["questions.id"]),
        sa.ForeignKeyConstraint(["session_id"], ["survey_sessions.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("session_id", "question_id", name="uq_session_question"),
    )

    op.create_table(
        "survey_results",
        sa.Column("session_id", sa.String(length=36), nullable=False),
        sa.Column("dominant_philosophy_id", sa.String(length=36), nullable=False),
        sa.Column("secondary_philosophy_id", sa.String(length=36), nullable=True),
        sa.Column("result_summary", sa.Text(), nullable=False),
        sa.Column("explanation", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.ForeignKeyConstraint(["dominant_philosophy_id"], ["philosophies.id"]),
        sa.ForeignKeyConstraint(["secondary_philosophy_id"], ["philosophies.id"]),
        sa.ForeignKeyConstraint(["session_id"], ["survey_sessions.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("session_id"),
    )

    op.create_table(
        "survey_result_scores",
        sa.Column("result_id", sa.String(length=36), nullable=False),
        sa.Column("philosophy_id", sa.String(length=36), nullable=False),
        sa.Column("raw_score", sa.Float(), nullable=False),
        sa.Column("percentage", sa.Float(), nullable=False),
        sa.Column("rank", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("id", sa.String(length=36), nullable=False),
        sa.ForeignKeyConstraint(["philosophy_id"], ["philosophies.id"]),
        sa.ForeignKeyConstraint(["result_id"], ["survey_results.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("result_id", "philosophy_id", name="uq_result_philosophy"),
    )


def downgrade() -> None:
    op.drop_table("survey_result_scores")
    op.drop_table("survey_results")
    op.drop_table("survey_answers")
    op.drop_index(op.f("ix_survey_sessions_share_slug"), table_name="survey_sessions")
    op.drop_index(op.f("ix_survey_sessions_anonymous_client_id"), table_name="survey_sessions")
    op.drop_table("survey_sessions")
    op.drop_table("question_weights")
    op.drop_index(op.f("ix_admin_users_email"), table_name="admin_users")
    op.drop_table("admin_users")
    op.drop_index(op.f("ix_questions_section"), table_name="questions")
    op.drop_index(op.f("ix_questions_order_index"), table_name="questions")
    op.drop_index(op.f("ix_questions_code"), table_name="questions")
    op.drop_table("questions")
    op.drop_index(op.f("ix_philosophies_key"), table_name="philosophies")
    op.drop_table("philosophies")
