from datetime import datetime, timezone, timedelta
from types import SimpleNamespace
from unittest.mock import Mock, call
from app.services.url_service import URLService, URLExpiredError
import pytest




def test_create_short_url_generates_code_and_persists_url():
    repository = Mock()
    repository.get_by_short_code.return_value = None
    created_at = datetime.now(timezone.utc)
    
    repository.create.return_value = SimpleNamespace(
        original_url="https://example.com",
        short_code="Ab12CD",
        created_at=created_at,
        expires_at=None
    )
    code_generator = Mock(return_value="Ab12CD")
    
    service = URLService(
        repository=repository,
        code_generator=code_generator,
        base_url="http://localhost:8000"
    )
    result = service.create_short_url(
        original_url="https://example.com"
    )
    
    code_generator.assert_called_once_with()
    repository.get_by_short_code.assert_called_once_with("Ab12CD")
    repository.create.assert_called_once_with(
        original_url="https://example.com",
        short_code="Ab12CD",
        expires_at=None
    )
    
    assert result["original_url"] == "https://example.com"
    assert result["short_code"] == "Ab12CD"
    assert result["short_url"] == "http://localhost:8000/Ab12CD"
    assert result["created_at"] == created_at
    
    
    
    
def test_create_short_url_regenerates_code_when_collision_occurs():
    repository = Mock()
    repository.get_by_short_code.side_effect = [
        object(),
        None,
    ]
    created_at =datetime.now(timezone.utc)
    
    repository.create.return_value = SimpleNamespace(
        original_url="https://example.com",
        short_code="Free201",
        created_at=created_at,
        expires_at=None
    )
    code_generator = Mock(
        side_effect=["Taken1", "Free201"]
    )
    
    service = URLService(
        repository=repository,
        code_generator=code_generator,
        base_url="http://localhost:8000",
    )
    result = service.create_short_url(
        original_url="https://example.com"
    )
    assert code_generator.call_count == 2
    
    assert repository.get_by_short_code.call_args_list == [
        call("Taken1"),
        call("Free201"),
    ]
    repository.create.assert_called_once_with(
        original_url="https://example.com",
        short_code="Free201",
        expires_at=None
    )
    
    assert result["short_code"] == "Free201"
    assert(
        result["short_url"] == "http://localhost:8000/Free201"
    )
    
    
    
    
def test_resolve_short_url_returns_original_url_and_increments_clicks():
    repository = Mock()
    stored_url = SimpleNamespace(
        original_url="https://example.com",
        short_code="Ab12CD",
        click_count=4,
        expires_at=None
    )
    repository.get_by_short_code.return_value = stored_url
    
    service = URLService(
        repository=repository, 
        code_generator=Mock(),
        base_url="http://localhost:8000",
    )
    result = service.resolve_short_url("Ab12CD")
    
    repository.get_by_short_code.assert_called_once_with("Ab12CD")
    repository.increment_click_count.assert_called_once_with(stored_url)
    
    assert result == "https://example.com"
    
    


def test_resolve_short_url_returns_None_when_code_does_not_exists():
    repository = Mock()
    repository.get_by_short_code.return_value = None
    
    service = URLService(
        repository=repository,
        code_generator=Mock(),
        base_url="http://localhost:8000",
    )
    result = service.resolve_short_url("Missing")
    
    repository.get_by_short_code.assert_called_once_with("Missing")
    repository.increment_click_count.assert_not_called()
    
    assert result is None
    
    
    
    
    
    
def test_resolve_short_url_raises_error_when_url_is_expired():
    repository = Mock()
    expired_url = SimpleNamespace(
        original_url="https://example.com",
        short_code="Old12345",
        click_count=0,
        expires_at=datetime.now(timezone.utc) - timedelta(days=1)
    )
    repository.get_by_short_code.return_value =expired_url
    
    
    service = URLService(repository=repository, base_url="http:localhost:8000")
    with pytest.raises(URLExpiredError):
        service.resolve_short_url("Old12345")
        
    repository.increment_click_count.assert_not_called()
    
    
    
    
    

def test_resolve_url_redirects_when_expiry_is_in_future():
    repository = Mock()
    stored_url = SimpleNamespace(
        original_url="https://example.com",
        short_code="Future",
        click_count=0,
        expires_at=datetime.now(timezone.utc) + timedelta(days=1),
    )
    repository.get_by_short_code.return_value = stored_url
    
    service= URLService(repository=repository, base_url="http://localhost:8000")
    result = service.resolve_short_url("Future")
    
    
    
    
    

def test_create_short_url_persists_custom_expiry():
    repository= Mock()
    repository.get_by_short_code.return_value = None
    
    expires_at = datetime.now(timezone.utc) + timedelta(days=2)
    created_at = datetime.now(timezone.utc)
    repository.create.return_value = SimpleNamespace(
        original_url="https://example.com",
        short_code="Expire123",
        created_at=created_at,
        expires_at=expires_at,
    )
    code_generator = Mock(return_value="Expire123")
    
    service = URLService(
        repository=repository,
        code_generator=code_generator,
        base_url="http://localhost:8000"
    )
    result = service.create_short_url(
        original_url="https://example.com",
        expires_at=expires_at
    )
    repository.create.assert_called_once_with(
        original_url="https://example.com",
        short_code="Expire123",
        expires_at=expires_at
    )
    
    assert result["expires_at"] == expires_at
    
    
    