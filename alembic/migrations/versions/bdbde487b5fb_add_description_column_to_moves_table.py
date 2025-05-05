"""add description column to moves table

Revision ID: bdbde487b5fb
Revises: e60a4b69ced4
Create Date: 2025-03-27 02:44:21.857674

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'bdbde487b5fb'
down_revision: Union[str, None] = 'e60a4b69ced4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('moves', sa.Column('move_description', sa.String(), nullable=True))  # Allow nulls for existing rows



def downgrade() -> None:
    """Downgrade schema."""
    op.drop_column('moves', 'move_description')

