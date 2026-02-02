from datetime import datetime
from typing import List, Optional
from sqlalchemy import Integer, String, DateTime, Boolean, Text, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    
    # New fields for MVP
    full_name: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    role: Mapped[str] = mapped_column(String, default="client", nullable=False)  # "client" or "admin"
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    messages: Mapped[List["ChatMessage"]] = relationship("ChatMessage", back_populates="user")

class Ticket(Base):
    __tablename__ = "tickets"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    
    # Client info
    client_name: Mapped[str] = mapped_column(String, nullable=False)
    client_email: Mapped[str] = mapped_column(String, nullable=False)
    client_phone: Mapped[str] = mapped_column(String, nullable=False)
    
    # Ticket content
    event_summary: Mapped[str] = mapped_column(Text, nullable=False)
    urgency_level: Mapped[str] = mapped_column(String, default="Low")
    status: Mapped[str] = mapped_column(String, default="New")  # New, Reviewed, Closed
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    
    # Message content
    message: Mapped[str] = mapped_column(Text, nullable=False)
    
    # Sender identification
    user_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)
    is_from_admin: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    
    # Status
    status: Mapped[str] = mapped_column(String, default="sent", nullable=False)  # sent, read
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user: Mapped[Optional["User"]] = relationship("User", back_populates="messages")

class Article(Base):
    __tablename__ = "articles"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    slug: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    content: Mapped[str] = mapped_column(Text, nullable=False)
    excerpt: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    
    # Metadata
    language: Mapped[str] = mapped_column(String, default="he", nullable=False)  # he, ru, en
    category: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    
    # SEO
    meta_title: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    meta_description: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())