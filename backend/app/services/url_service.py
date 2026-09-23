from collections.abc import Callable



class URLService:
    def __init__(
        self,
        repository,
        code_generator: Callable[[], str],
        base_url: str,
    ):
        self.repository = repository
        self.code_generator = code_generator
        self.base_url = base_url.rstrip("/")
        
        
    
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