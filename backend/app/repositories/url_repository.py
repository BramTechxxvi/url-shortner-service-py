from sqlalchemy import select
from sqlalchemy.orm import Session
from models.url import ShortUrl



class URLRepository:
    def __init__(self, db: Session):
        self.db = db
        
        
        
    def get_by_short_code(self, short_code: str,) -> ShortUrl | None:
        statement = select(ShortUrl).where(
            ShortUrl.short_code == short_code
            )
        return self.db.scalar(statement)
    
    
    