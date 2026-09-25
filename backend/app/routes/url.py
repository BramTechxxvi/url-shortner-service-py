from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.config import get_settings
from app.database import get_db
from app.repositories.url_repository import URLRepository
from app.schemas.url import URLCreate, URLResponse
from app.services.url_service import URLService
from app.utils.short_code import generate_short_code




router = APIRouter(
    prefix="api/v1/urls",
    tags=["URLS"],
)

settings = get_settings()

@router.post(
    "",
    response_model=URLResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_short_url():
    pass