"""Create Category table

Revision ID: 03babce81946
Revises: b730eea64981
Create Date: 2025-03-23 23:22:48.561949

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '03babce81946'
down_revision: Union[str, None] = 'b730eea64981'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "categories",
        sa.Column("category_id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("category_name", sa.String(), nullable=False),
        sa.Column("category_type", sa.String(20), nullable=False),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("categories")
