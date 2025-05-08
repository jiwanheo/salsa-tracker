import os
from sqlalchemy import create_engine, MetaData, Table, select, insert, func

postgres_url = os.getenv("ALEMBIC_DATABASE_URL")

engine = create_engine(postgres_url)
metadata = MetaData()
users_table = Table("users", metadata, autoload_with=engine)

with engine.connect() as conn:
    try:
        # Seed "users" table
        user_stmt = select(func.count()).select_from(users_table)
        user_count = conn.execute(user_stmt).scalar_one()
        
        if user_count == 0:
            print("Seeding users table")
            user_insert_stmt = insert(users_table).values(user_name="jiwan")
            conn.execute(user_insert_stmt)
            conn.commit()
            print("User 'jiwan' seeded.")
        


    except SQLAlchemyError as e:
        logger.error(f"Database error while seeding: {e}")
        raise HTTPException(status_code=500, detail="Database error")