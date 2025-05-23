import logging
import os
from typing import List, Optional
import requests
from fastapi import FastAPI, Request, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from sqlalchemy import create_engine, MetaData, Table, select, insert, update, values
from sqlalchemy.exc import SQLAlchemyError
import re

from urllib.parse import unquote
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parents[1] / '.env'
load_dotenv(dotenv_path=env_path)

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("uvicorn")

postgres_url = os.getenv("POSTGRES_URL")
engine = create_engine(postgres_url)
metadata = MetaData()
users_table = Table("users", metadata, autoload_with=engine)
categories_table = Table("categories", metadata, autoload_with=engine)
moves_table = Table("moves", metadata, autoload_with=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ALLOWED", "").split(","),
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
        logger.error(f"Database error while checking user: {e}")
        raise HTTPException(status_code=500, detail="Database error") 


class CreateUserRequest(BaseModel):
    name: str

class CreateUserResponse(BaseModel):
    success: bool
    id: Optional[int]

@app.post("/create-user", response_model=CreateUserResponse)
async def create_user(user: CreateUserRequest):

    name = user.name

    # Calling the user_exists function directly here:
    user_check = await user_exists(user_name=name)
    if user_check["exists"]:
        raise HTTPException(status_code=400, detail="Username already exists")

    with engine.connect() as conn:
        try:
            stmt = insert(users_table).values(user_name=name)
            result = conn.execute(stmt)
            conn.commit()

            inserted_id = result.inserted_primary_key[0] if result.inserted_primary_key else None

            return {"success": True, "id": inserted_id}
        
        except SQLAlchemyError as e:
            logger.error(f"Database error while creating user: {e}")
            raise HTTPException(status_code=500, detail="Database error")


class CategoryExistsResponse(BaseModel):
    exists: bool 

@app.get("/category-exists", response_model=CategoryExistsResponse)
async def category_exists(category_name: str):
    try:
        with engine.connect() as conn:
            stmt = select(categories_table).where(categories_table.c.category_name == category_name)
            result = conn.execute(stmt).first()
            exists = result is not None
            
            return {"exists": exists}

    except SQLAlchemyError as e:
        logger.error(f"Database error while checking user: {e}")
        raise HTTPException(status_code=500, detail="Database error") 

class CreateCategoryRequest(BaseModel):
    category_type: str
    category_name: str

class CreateCategoryResponse(BaseModel):
    success: bool
    id: Optional[int]

@app.post("/create-category", response_model=CreateCategoryResponse)
async def create_category(category: CreateCategoryRequest):
    # Decode any URL-encoded characters
    category_type = unquote(category.category_type)
    category_name = unquote(category.category_name)

    # category_type must be "hands" or "positions"
    if category_type not in ["hands", "positions"]:
        raise HTTPException(status_code=400, detail="category_type must be one of `hands` or `positions`")

    # Prevent script injection by allowing only safe characters
    if not re.match(r"^[a-zA-Z0-9\s\-\<\>\&\'\(\)]+$", category_name):
        raise HTTPException(status_code=400, detail="Invalid characters in category_name")

    # Calling the category_exists function directly here:
    category_check = await category_exists(category_name=category_name)
    if category_check["exists"]:
        raise HTTPException(status_code=400, detail="Category already exists")

    with engine.connect() as conn:
        try:
            stmt = insert(categories_table).values(category_type=category_type, category_name=category_name)
            result = conn.execute(stmt)
            conn.commit()

            inserted_id = result.inserted_primary_key[0] if result.inserted_primary_key else None

            return {"success": True, "id": inserted_id}
        
        except SQLAlchemyError as e:
            logger.error(f"Database error while creating user: {e}")
            raise HTTPException(status_code=500, detail="Database error")

@app.get("/categories")
async def get_categories(category_type: Optional[str] = None):
    try:
        with engine.connect() as conn:
            if category_type:
                stmt = select(categories_table).where(categories_table.c.category_type == category_type)
            else:
                stmt = select(categories_table)
            
            
            result = conn.execute(stmt)
            rows = result.fetchall()

            column_names = categories_table.columns.keys()
            categories = [dict(zip(column_names, row)) for row in rows]

            return categories

    except SQLAlchemyError as e:
        logger.error(f"Database error while checking user: {e}")
        raise HTTPException(status_code=500, detail="Database error") 

@app.get("/category-by-id")
async def get_category_by_id(category_id: int):
    try:
        with engine.connect() as conn:
            stmt = select(categories_table.c.category_name).where(categories_table.c.category_id == category_id)
            
            result = conn.execute(stmt).fetchone()

            if result:
                return {"category_name": result[0]}
            else:
                raise HTTPException(status_code=404, detail="Category not found")

    except SQLAlchemyError as e:
        logger.error(f"Database error while checking user: {e}")
        raise HTTPException(status_code=500, detail="Database error") 

class CreateMoveRequest(BaseModel):
    move_name: str
    move_video: str
    move_description: str
    move_categories: List[int]
    move_rating: str

class CreateMoveResponse(BaseModel):
    success: bool
    id: Optional[int]

@app.post("/create-move", response_model=CreateMoveResponse)
async def create_move(move: CreateMoveRequest):
    # Decode any URL-encoded characters
    move_name = unquote(move.move_name)
    move_video = unquote(move.move_video)
    move_description = unquote(move.move_description)
    move_categories = move.move_categories
    move_rating = unquote(move.move_rating)

    with engine.connect() as conn:
        try:
            stmt = insert(moves_table).values(move_name=move_name, move_video=move_video, move_description=move_description, move_category=move_categories, move_rating=move_rating)
            result = conn.execute(stmt)
            conn.commit()

            inserted_id = result.inserted_primary_key[0] if result.inserted_primary_key else None

            return {"success": True, "id": inserted_id}
        
        except SQLAlchemyError as e:
            logger.error(f"Database error while creating move: {e}")
            raise HTTPException(status_code=500, detail="Database error")

@app.put("/edit-move", response_model=CreateMoveResponse)
async def edit_move(id: int, move: CreateMoveRequest):
    # Decode any URL-encoded characters
    move_name = unquote(move.move_name)
    move_video = unquote(move.move_video)
    move_description = unquote(move.move_description)
    move_categories = move.move_categories
    move_rating = unquote(move.move_rating)

    stmt = (
        update(moves_table)
        .where(moves_table.c.move_id == id)
        .values(move_id=id, move_name=move_name, move_video=move_video, move_description=move_description, move_category=move_categories, move_rating=move_rating)
    )

    try:
        with engine.begin() as conn:
            result = conn.execute(stmt)

            if result.rowcount == 0:
                raise HTTPException(status_code=404, detail="Move not found")

        return {"success": True, "id": id}

    except SQLAlchemyError as e:
        logger.error(f"Database error while updating move: {e}")
        raise HTTPException(status_code=500, detail="Database error")

@app.get("/moves-by-category")
async def get_moves_by_category(category: int):
    try:
        with engine.connect() as conn:
            stmt = select(moves_table).where(moves_table.c.move_category.contains([category]))
            
            result = conn.execute(stmt)
            rows = result.fetchall()

            column_names = moves_table.columns.keys()
            moves = [dict(zip(column_names, row)) for row in rows]

            return moves

    except SQLAlchemyError as e:
            logger.error(f"Database error while creating move: {e}")
            raise HTTPException(status_code=500, detail="Database error")

@app.get("/all-moves-id-name")
async def get_all_moves_id_name():
    try:
        with engine.connect() as conn:
            stmt = select(moves_table)
            
            result = conn.execute(stmt)
            rows = result.fetchall()

            column_names = ["move_id", "move_name"]
            moves = [dict(zip(column_names, row)) for row in rows]

            return moves

    except SQLAlchemyError as e:
            logger.error(f"Database error while creating move: {e}")
            raise HTTPException(status_code=500, detail="Database error")

# Then make an endpoint that takes an id, and return all information
@app.get("/move-by-id")
async def get_move_by_id(id: int):
    try:
        with engine.connect() as conn:
            stmt = select(moves_table).where(moves_table.c.move_id == id)
            
            result = conn.execute(stmt)
            row = result.fetchone()  # Use fetchone instead of fetchall

            if row is None:
                return None  # or raise an exception if that's preferred

            column_names = moves_table.columns.keys()
            move = dict(zip(column_names, row))

            return move

    except SQLAlchemyError as e:
            logger.error(f"Database error while creating move: {e}")
            raise HTTPException(status_code=500, detail="Database error")

# IMMICH ENDPOINTS

IMMICH_API_KEY = os.getenv("IMMICH_API_KEY")
IMMICH_URL = "https://media.jiwan.homes/api"
IMMICH_MEDIA_DIR = "/tmp/videos"

os.makedirs(IMMICH_MEDIA_DIR, exist_ok=True)

@app.get("/media")
def get_immich_asset(asset_id: str):

    # If exists already, return it
    file_path = os.path.join(IMMICH_MEDIA_DIR, f"{asset_id}.mp4")
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="video/mp4")

    # If not, fetch it
    url = f"{IMMICH_URL}/assets/{asset_id}/original"
    headers = {
        "x-api-key": IMMICH_API_KEY,
        "Accept": "video/mp4"
    }

    try:
        response = requests.get(url, headers=headers, stream=True)
        response.raise_for_status()  # Raise if not 200

        # Save to file
        with open(file_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)

        return FileResponse(file_path, media_type="video/mp4")

    except requests.RequestException as e:
        raise HTTPException(status_code=502, detail=f"Failed to fetch asset from Immich: {e}")
