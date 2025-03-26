"""add move_video column to moves table

Revision ID: e60a4b69ced4
Revises: fd14ecbe3838
Create Date: 2025-03-26 03:11:36.504121

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e60a4b69ced4'
down_revision: Union[str, None] = 'fd14ecbe3838'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('moves', sa.Column('move_video', sa.String(), nullable=True))  # Allow nulls for existing rows


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('moves', 'move_video')
