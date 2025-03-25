"""Add moves table

Revision ID: fd14ecbe3838
Revises: 03babce81946
Create Date: 2025-03-25 00:50:59.966425

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'fd14ecbe3838'
down_revision: Union[str, None] = '03babce81946'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "moves",
        sa.Column("move_id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("move_name", sa.String(), nullable=False),
        sa.Column("move_category", postgresql.ARRAY(sa.Integer), nullable=False),
        sa.Column("move_rating", sa.String(), nullable=False)
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("moves")
