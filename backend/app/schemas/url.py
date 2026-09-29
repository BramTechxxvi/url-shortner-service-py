from datetime import datetime, timezone
from pydantic import BaseModel, HttpUrl, field_validator



class URLCreate(BaseModel):
    url: HttpUrl
    expires_at: datetime |None=None
    
    @field_validator("expires_at")
    @classmethod
    def validate_expiry(cls, value: datetime |None):
        if value is None:
            return value
        
        if value.tzinfo is None or value.utcoffset() is None:
            raise ValueError("expires_at must include timezone information")
        
        if value <= datetime.now(timezone.utc):
            raise ValueError("expires_at must be in the future")
        
        return value
    
    
    
    
class URLResponse(BaseModel):
    original_url: str
    short_code: str
    short_url: str
    created_at: datetime