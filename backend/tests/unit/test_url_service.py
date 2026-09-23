from datetime import datetime, timezone
from types import SimpleNamespace
from unittest.mock import Mock
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
        original_url="htpps://example.com"
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
    
    