from fastapi import FastAPI




app = FastAPI(
    title="URL Shorttener API",
    version="0.1.0"
)

app.include_router()