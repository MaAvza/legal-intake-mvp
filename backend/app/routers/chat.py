from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.core.database import get_db
from app.core.dependencies import get_current_user, get_admin_user
from app.models import ChatMessage, User
from app.schemas import ChatMessageCreate, ChatMessageResponse

router = APIRouter(prefix="/chat", tags=["Chat"])

@router.post("/messages", response_model=ChatMessageResponse)
async def send_message(
    message_data: ChatMessageCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Send a chat message (registered users only)"""
    message = ChatMessage(
        message=message_data.message,
        user_id=current_user.id,
        is_from_admin=(current_user.role == "admin")
    )
    
    db.add(message)
    await db.commit()
    await db.refresh(message)
    
    return message

@router.get("/messages", response_model=List[ChatMessageResponse])
async def get_messages(
    user_id: int = None,
    limit: int = 50,
    offset: int = 0,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Get chat messages"""
    query = select(ChatMessage)
    
    # If regular user, only show their messages
    if current_user.role == "client":
        query = query.where(
            (ChatMessage.user_id == current_user.id) | 
            (ChatMessage.is_from_admin == True)
        )
    # If admin and user_id specified, show messages for that user
    elif current_user.role == "admin" and user_id:
        query = query.where(
            (ChatMessage.user_id == user_id) | 
            (ChatMessage.is_from_admin == True)
        )
    
    query = query.offset(offset).limit(limit).order_by(ChatMessage.created_at.asc())
    
    result = await db.execute(query)
    messages = result.scalars().all()
    
    return messages

@router.put("/messages/{message_id}/read")
async def mark_message_as_read(
    message_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """Mark message as read"""
    # Check if message exists and user has permission
    result = await db.execute(select(ChatMessage).where(ChatMessage.id == message_id))
    message = result.scalar_one_or_none()
    
    if not message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )
    
    # Only allow marking own messages or admin can mark any
    if current_user.role != "admin" and message.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permission denied"
        )
    
    # Update message status
    await db.execute(
        update(ChatMessage)
        .where(ChatMessage.id == message_id)
        .values(status="read")
    )
    await db.commit()
    
    return {"message": "Message marked as read"}

@router.get("/users", response_model=List[dict])
async def get_chat_users(
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - Get list of users who have sent messages"""
    query = """
    SELECT DISTINCT u.id, u.full_name, u.email, 
           COUNT(cm.id) as message_count,
           MAX(cm.created_at) as last_message_at
    FROM users u
    JOIN chat_messages cm ON u.id = cm.user_id
    WHERE u.role = 'client'
    GROUP BY u.id, u.full_name, u.email
    ORDER BY last_message_at DESC
    """
    
    result = await db.execute(query)
    users = [
        {
            "id": row[0],
            "full_name": row[1],
            "email": row[2],
            "message_count": row[3],
            "last_message_at": row[4]
        }
        for row in result.fetchall()
    ]
    
    return users