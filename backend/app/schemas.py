from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, EmailStr

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    role: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Ticket Schemas
class TicketBase(BaseModel):
    client_name: str
    client_email: EmailStr
    client_phone: str
    event_summary: str
    urgency_level: str = "Low"

class TicketCreate(TicketBase):
    turnstile_token: str

class TicketResponse(TicketBase):
    id: int
    status: str
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

class TicketUpdate(BaseModel):
    status: Optional[str] = None
    urgency_level: Optional[str] = None

# Chat Schemas
class ChatMessageBase(BaseModel):
    message: str

class ChatMessageCreate(ChatMessageBase):
    pass

class ChatMessageResponse(ChatMessageBase):
    id: int
    user_id: Optional[int]
    is_from_admin: bool
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# Article Schemas
class ArticleBase(BaseModel):
    title: str
    content: str
    excerpt: Optional[str] = None
    language: str = "he"
    category: Optional[str] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class ArticleCreate(ArticleBase):
    slug: str
    is_published: bool = False

class ArticleUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    category: Optional[str] = None
    is_published: Optional[bool] = None
    meta_title: Optional[str] = None
    meta_description: Optional[str] = None

class ArticleResponse(ArticleBase):
    id: int
    slug: str
    is_published: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True