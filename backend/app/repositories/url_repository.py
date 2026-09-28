from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.url import ShortUrl



class URLRepository:
    def __init__(self, db: Session):
        self.db = db
        
        
        
    def get_by_short_code(self, short_code: str,) -> ShortUrl | None:
        statement = select(ShortUrl).where(
            ShortUrl.short_code == short_code
            )
        return self.db.scalar(statement)
    
    
    
    def create(self, original_url: str, short_code: str, expires_at=None) -> ShortUrl:
        short_url = ShortUrl(original_url=original_url, short_code=short_code, expires_at=expires_at)
        self.db.add(short_url)
        self.db.commit()
        self.db.refresh(short_url)
        
        return short_url
    
    
    
    def increment_click_count(self, short_url: ShortUrl) -> ShortUrl: 
        short_url.click_count +=1
        self.db.commit()
        self.db.refresh(short_url)
        
        return short_url