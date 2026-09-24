import pytest
from sqlalchemy import create_engine, delete
from sqlalchemy.orm import sessionmaker
from app.config import get_settings
from app.database import Base
from app.models.url import ShortUrl
import app.models



settings = get_settings()


@pytest.fixture(scope="session")
def test_engine():
    engine = create_engine(settings.test_database_url, pool_pre_ping=True)
    Base.metadata.create_all(bind=engine)
    yield engine
    
    Base.metadata.drop_all(bind=engine)
    engine.dispose()
    
    
    
@pytest.fixture()
def db_session(test_engine):
    TestingSessionLocal = sessionmaker(
        bind=test_engine,
        autoflush=False,
        autocommit=False,
    )
    session = TestingSessionLocal()
    yield session
    
    session.rollback()
    session.close()
    
    with test_engine.begin() as connection:
        connection.execute(delete(ShortUrl))