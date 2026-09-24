from sqlalchemy import select
from app.models.url import ShortUrl
from app.repositories.url_repository import URLRepository




def test_create_persists_short_url(db_session):
    repository = URLRepository(db_session)
    result = repository.create(original_url="https://example.com", short_code="Ab123Cd")
    
    assert result.id is not None
    assert result.original_url == "https://example.com"
    assert result.short_code == "Ab123Cd"
    
    statement = select(ShortUrl).where(ShortUrl.short_code == "Ab123Cd")
    persisted_url = db_session.scalar(statement)
    assert persisted_url is not None
    assert persisted_url.original_url == "https://example.com"
    
    

def test_get_by_short_code_returns_matching_url(db_session):
    repository = URLRepository(db_session)
    repository.create(original_url="https://github.com", short_code="Git123")
    
    result = repository.get_by_short_code("Git123")
    
    assert result is not None
    assert result.short_code == "Git123"