from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.config import get_settings
from app.database import get_db
from app.repositories.url_repository import URLRepository
from app.services.url_service import URLService
from app.utils.short_code import generate_short_code




router = APIRouter()
settigs = get_settings()



@router.get("/{short_code}")
def redirect_short_url(short_code: str, db: Session=Depends(get_db)):
    repository = URLRepository(get_db)
