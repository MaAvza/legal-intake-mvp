# backend/app/routers/auth.py
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import (
    verify_password, 
    get_password_hash, 
    create_access_token,
    validate_password_strength
)
from app.core.dependencies import get_current_user
from app.core.config import settings
from app.models import User
from app.schemas import UserCreate, UserResponse, UserLogin, Token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user"""
    # Validate password strength
    is_valid, error_msg = validate_password_strength(user_data.password)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_msg
        )
    
    # Check if user already exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    existing_user = result.scalar_one_or_none()
    
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    user = User(
        email=user_data.email,
        hashed_password=hashed_password,
        full_name=user_data.full_name,
        role="client"  # Default role
    )
    
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    # Send welcome email (non-blocking, don't fail if email fails)
    try:
        from app.core.email import send_welcome_email
        await send_welcome_email({
            "email": user.email,
            "full_name": user.full_name or "Client"
        })
    except Exception as e:
        print(f"Welcome email failed: {e}")  # Log but don't block registration
    
    return user

@router.post("/login", response_model=Token)
async def login(
    user_credentials: UserLogin,
    db: AsyncSession = Depends(get_db)
):
    """Login user and return access token"""
    # Find user
    result = await db.execute(select(User).where(User.email == user_credentials.email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(
    current_user: User = Depends(get_current_user)
):
    """Get current user information"""
    return current_user

@router.post("/create-admin")
async def create_admin_user(
    admin_data: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create admin user - for initial setup only"""
    # Validate password strength
    is_valid, error_msg = validate_password_strength(admin_data.password)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=error_msg
        )
    
    # Check if any admin exists
    result = await db.execute(select(User).where(User.role == "admin"))
    existing_admin = result.scalar_one_or_none()
    
    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Admin user already exists"
        )
    
    # Create admin user
    hashed_password = get_password_hash(admin_data.password)
    admin_user = User(
        email=admin_data.email,
        hashed_password=hashed_password,
        full_name=admin_data.full_name,
        role="admin"
    )
    
    db.add(admin_user)
    await db.commit()
    await db.refresh(admin_user)
    
    return {"message": "Admin user created successfully", "email": admin_user.email}