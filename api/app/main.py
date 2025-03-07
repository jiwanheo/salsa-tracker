import logging
import os
from typing import List, Optional
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, MetaData, Table, select, insert
from sqlalchemy.exc import SQLAlchemyError

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("uvicorn")

postgres_url = os.getenv("POSTGRES_URL")
engine = create_engine(postgres_url)
metadata = MetaData()
users_table = Table("users", metadata, autoload_with=engine)

app = FastAPI()

origins = [
    # "http://localhost:5173",
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware to log all incoming requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.debug(f"⬅️ Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    logger.debug(f"➡️ Response status: {response.status_code}")
    return response

@app.get("/")
async def root():
    return {"message": "API is running!"}

class GetUsersResponse(BaseModel):
    users: List[str] 

@app.get("/users", response_model=GetUsersResponse)
async def read_users():
    try:
        with engine.connect() as conn:
            stmt = select(users_table)
            result = conn.execute(stmt)
            users = [dict_row["name"] for dict_row in result.mappings()]

        return {"users": users}

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database error")

class UserExistsResponse(BaseModel):
    exists: bool 

@app.get("/user-exists", response_model=UserExistsResponse)
async def user_exists(user_name: str):
    try:
        with engine.connect() as conn:
            stmt = select(users_table).where(users_table.c.user_name == user_name)
            result = conn.execute(stmt).first()
            exists = result is not None
            
            return {"exists": exists}

    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database error") 

class CreateUserResponse(BaseModel):
    success: bool
    id: Optional[int]

@app.post("/create-user", response_model=CreateUserResponse)
async def create_user(name: str):
    
    with engine.connect() as conn:
        try:
            stmt = insert(users_table).values(name=name)
            result = conn.execute(stmt)
            conn.commit()

            inserted_id = result.inserted_primary_key[0] if result.inserted_primary_key else None

            return {"success": True, "id": inserted_id}
        
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail="Database error")
