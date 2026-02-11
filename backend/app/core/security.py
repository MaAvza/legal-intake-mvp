# backend/app/core/security.py
from datetime import datetime, timedelta, timezone
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, status
from app.core.config import settings
import re

# Password hashing - Fixed for Python 3.13 + bcrypt compatibility
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    # Truncate to 72 bytes to match bcrypt's limit
    password_bytes = plain_password.encode('utf-8')[:72]
    return pwd_context.verify(password_bytes, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password - truncates to 72 bytes for bcrypt compatibility"""
    # Truncate to 72 bytes to match bcrypt's limit
    password_bytes = password.encode('utf-8')[:72]
    return pwd_context.hash(password_bytes)

def validate_password_strength(password: str) -> tuple[bool, str]:
    """
    Validate password meets security requirements:
    - At least 8 characters
    - At least one uppercase letter
    - At least one lowercase letter
    - At least one number
    - At least one special character
    
    Returns: (is_valid, error_message)
    """
    if len(password) < 8:
        return False, "סיסמא חייבת להכיל לפחות 8 תווים"
    
    if not re.search(r'[A-Z]', password):
        return False, "סיסמא חייבת להכיל לפחות אות אחת גדולה באנגלית"
    
    if not re.search(r'[a-z]', password):
        return False, "סיסמא חייבת להכיל לפחות אות אחת קטנה באנגלית"
    
    if not re.search(r'\d', password):
        return False, "סיסמא חייבת להכיל לפחות ספרה אחת"
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/]', password):
        return False, "(!@#$%^&*(),.?\":{}|<>_-+=[]\\/ etc.) :סיסמא חייבת להכיל לפחות תו מיוחד אחד "
    
    if len(password) > 72:
        return False, "סיסמא לא תהיה ארוכה מ72 תווים"
    
    return True, ""

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return encoded_jwt

def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )