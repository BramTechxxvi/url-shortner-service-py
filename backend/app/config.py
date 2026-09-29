from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict




class Settings(BaseSettings):
    app_name: str = "URL Shortener API"
    app_env: str= "development"
    database_url: str
    base_url: str= "http://localhost:8000"
    test_database_url: str
    frontend_url: str="http://localhost:5173"
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )
    
    @property
    def allowed_origins(self)-> list[str]:
        return list(
            dict.fromkeys(
                [
                    self.frontend_url,
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                ]
            )
        )
    
    
@lru_cache
def get_settings()-> Settings:
    return Settings()



FRONTEND_URL = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173",
)

ALLOWED_ORIGINS = [
    FRONTEND_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]