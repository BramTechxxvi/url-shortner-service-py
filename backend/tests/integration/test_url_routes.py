from sqlalchemy import select
from app.models.url import ShortUrl
from datetime import datetime, timedelta, timezone




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
    
    
    
    
def test_short_url_redirects_to_original_url(client, db_session):
    short_url = ShortUrl(original_url="https://example.com", short_code="GO12345")
    db_session.add(short_url)
    db_session.commit()
    
    response = client.get("/GO12345", follow_redirects=False)
    assert response.status_code == 302
    assert response.headers["location"] == "https://example.com"
    
    


def test_short_url_redirects_increments_click_count(client, db_session):
    short_url = ShortUrl(original_url="https://example.com", short_code="Count1")
    db_session.add(short_url)
    db_session.commit()
    db_session.refresh(short_url)
    
    
    assert short_url.click_count == 0
    response = client.get("/Count1", follow_redirects=False)
    assert response.status_code == 302
    
    db_session.refresh(short_url)
    assert short_url.click_count == 1
    
    
    
    
    
def test_missing_short_code_returns_404(client):
    response = client.get("/DoesNotExist", follow_redirects=False)
    assert response.status_code == 404
    
    
    
    

def test_expired_short_url_returns_410(client, db_session):
    short_url = ShortUrl(
        original_url="https://example.com",
        short_code="Expired",
        expires_at=(datetime.now(timezone.utc) - timedelta(days=1))
    )
    db_session.add(short_url)
    db_session.commit()
    
    response = client.get("/Expired", follow_redirects=False)
    assert response.status_code ==410
    
    
    
    
    
def test_create_short_url_accepts_future_expiry(client):
    response = client.post(
        "/api/v1/urls",
        json= { "url": "https://example.com", "expires_at": "2099-01-01T00:00:00Z"},
    )
    assert response.status_code == 201
    data = response.json()
    
    assert data["expires_at"] is not None
    
    
    
    

def test_creat_short_url_rejects_expiry_time_in_the_past(client):
    response = client.post(
        "/api/v1/urls",
        json= { "url": "https://example.com", "expires_at": "2008-01-01T00:00:00Z"}
    )
    assert response.status_code == 422
    
    
    

def test_create_short_url_allows_no_expiry(client):
    response = client.post(
        "/api/v1/urls",
        json= { "url": "https://example.com"}
    )
    assert response.status_code == 201
    assert response.json()["expires_at"] is None