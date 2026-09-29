from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.database import get_db
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.routes.url import router as url_router
from app.routes.redirect import router as redirect_router
from app.config import get_settings





settings = get_settings()

app = FastAPI(
    title="URL Shortener API",
    description="A URL Shortener service built with FastAPI.",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods= ["GET", "POST"],
    allow_headers=["Content-Type"]
)




@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "url-shortener"
    }
    


@app.get("/health/db")
def database_health_check(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {
        "status": "ok",
        "database": "connected successfully"
    }    
    
    
app.include_router(url_router)
app.include_router(redirect_router)