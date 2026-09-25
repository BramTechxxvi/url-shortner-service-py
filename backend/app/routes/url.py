from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.config import get_settings
from app.database import get_db
from app.repositories.url_repository import URLRepository