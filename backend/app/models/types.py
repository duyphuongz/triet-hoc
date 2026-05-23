from sqlalchemy import JSON
from sqlalchemy.dialects.postgresql import JSONB

JSONB_TYPE = JSON().with_variant(JSONB(), "postgresql")
