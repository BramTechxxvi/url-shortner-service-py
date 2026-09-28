from collections.abc import Callable
from app.utils.short_code import generate_short_code





class URLExpiredError(Exception):
    pass


class URLService:
    def __init__(
        self,
        repository,
        base_url: str,
        code_generator: Callable[[], str] = generate_short_code,
    ):
        self.repository = repository
        self.base_url = base_url.rstrip("/")
        self.code_generator = code_generator

        
        
    
    def create_short_url(self, original_url: str) -> dict:
        while True:
            short_code = self.code_generator()
            existing_url = self.repository.get_by_short_code(short_code)
            
            if existing_url is None:
                break
            
        saved_url = self.repository.create(
            original_url=original_url,
            short_code=short_code,
        )
        
        return {
            "original_url": saved_url.original_url,
            "short_code": saved_url.short_code,
            "short_url": f"{self.base_url}/{saved_url.short_code}",
            "created_at": saved_url.created_at,
        }
        
        
        
        
    def resolve_short_url(self, short_code: str,) -> str | None:
        existing_url = self.repository.get_by_short_code(short_code)
        if existing_url is None:
            return None
        
        self.repository.increment_click_count(existing_url)
        return existing_url.original_url