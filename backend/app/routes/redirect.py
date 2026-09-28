from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from app.config import get_settings
from app.database import get_db
from app.repositories.url_repository import URLRepository
from app.services.url_service import URLService, URLExpiredError
from app.utils.short_code import generate_short_code




router = APIRouter()
settings = get_settings()



@router.get("/{short_code}")
def redirect_short_url(short_code: str, db: Session=Depends(get_db)):
    repository = URLRepository(db)
    service = URLService(
        repository=repository,
        code_generator=generate_short_code,
        base_url=settings.base_url,
    )
    try:
        original_url = service.resolve_short_url(short_code)
    except URLExpiredError:
        raise HTTPException(status_code=status.HTTP_410_GONE, detail="Short url has expired")
    
    if original_url is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Short URL not found.")
    
    return RedirectResponse(url=original_url, status_code=status.HTTP_302_FOUND)
