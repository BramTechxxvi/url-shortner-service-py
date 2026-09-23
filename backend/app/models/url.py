from datetime import datetime
from sqlalchemy import Boolean, DateTime, Integer, String, Text, func, text
from sqlalchemy.orm import Mapped, mapped_column
from app.database import Base


class ShortUrl(Base):
    __tablename__ = "urls"
    
    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )
    short_code: Mapped[str] = mapped_column(
        String(10),
        unique=True,
        index=True,
        nullable=False,
    )