from sqlalchemy import select
from app.models.url import ShortUrl




def test_create_short_url_returns_201_and_persists_url(client, db_session,):
    response = client.post(
        "api/v1/urls", 
        json= {
            "url": "https://example.com/articles/42"
        },
    )
    assert response.status_code == 201
    data = response.json()
    
    assert data["original_url"] == "https://example.com/articles/42"
    assert len(data["short_code"]) == 6
    assert data["short_url"] == f"http://localhost:8000/{data["short_code"]}"
    assert "created_at" in data
    
    statement = select(ShortUrl).where(ShortUrl.short_code == data["short_code"])
    saved_url = db_session.scalar(statement)
    
    assert saved_url is not None
    assert saved_url.original_url == "https://example.com/articles/42"
    
    
    
    
    
def test_create_short_url_rejects_invalid_url(client):
    response = client.post(
        "/api/v1/urls", 
        json={
            "url": "this-is-a-fake-url"
        },
    )
    assert response.status_code == 422