# Jiwan's awesome salsa tracker

## DB Schema

| Table Name        | Partition Key (PK)       | Sort Key (SK)           | Purpose |
|-------------------|-------------------------|-------------------------|---------|
| **Categories**    | `PK = category#<id>`    | `SK = category#<id>`    | Stores static dance move categories (e.g., "Left Hand-Right Hand"). |
| **Moves**        | `PK = category#<id>`    | `SK = move#<move_id>`   | Stores dance moves within a category, including video URLs. |
| **UsersProgress** | `PK = user#<user_id>`   | `SK = category#<id>`    | Tracks which moves a user knows and their ratings within a category. |
