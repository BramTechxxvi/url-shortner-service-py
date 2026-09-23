from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import Mock, call
from app.services.url_service import URLService




def test_create_short_url_generates_code_and_persists_url():
    repository = Mock()
    repository.get_by_short_code.return_value = None
    created_at = datetime.now(timezone.utc)
    
    repository.create.return_value = SimpleNamespace(
        original_url="https://example.com",
        short_code="Ab12CD",
        created_at=created_at
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
    )
    
    assert result["short_code"] == "Free201"
    assert(
        result["short_url"] == "http://localhost:8000/Free201"
    )