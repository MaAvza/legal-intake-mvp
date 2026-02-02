from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.core.database import get_db
from app.core.dependencies import get_admin_user
from app.core.email import send_ticket_confirmation, send_ticket_notification_to_lawyer
from app.models import Ticket, User
from app.schemas import TicketCreate, TicketResponse, TicketUpdate
import httpx
from app.core.config import settings

router = APIRouter(prefix="/tickets", tags=["Tickets"])

async def verify_turnstile_token(token: str) -> bool:
    """Verify Cloudflare Turnstile token"""
    if not settings.TURNSTILE_SECRET_KEY:
        return True  # Skip verification if no secret key configured
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                data={
                    "secret": settings.TURNSTILE_SECRET_KEY,
                    "response": token
                }
            )
            result = response.json()
            return result.get("success", False)
    except Exception:
        return False

@router.post("/", response_model=TicketResponse)
async def create_ticket(
    ticket_data: TicketCreate,
    db: AsyncSession = Depends(get_db)
):
    """Public endpoint - Submit a new ticket"""
    
    # Verify Turnstile token
    if not await verify_turnstile_token(ticket_data.turnstile_token):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Captcha verification failed"
        )
    
    # Create ticket
    ticket = Ticket(
        client_name=ticket_data.client_name,
        client_email=ticket_data.client_email,
        client_phone=ticket_data.client_phone,
        event_summary=ticket_data.event_summary,
        urgency_level=ticket_data.urgency_level
    )
    
    db.add(ticket)
    await db.commit()
    await db.refresh(ticket)
    
    # Send emails
    ticket_dict = {
        "client_name": ticket.client_name,
        "client_email": ticket.client_email,
        "client_phone": ticket.client_phone,
        "event_summary": ticket.event_summary,
        "urgency_level": ticket.urgency_level
    }
    
    # Send confirmation to client
    await send_ticket_confirmation(ticket_dict)
    
    # Send notification to lawyer
    await send_ticket_notification_to_lawyer(ticket_dict)
    
    return ticket

@router.get("/admin", response_model=List[TicketResponse])
async def get_all_tickets(
    status: str = None,
    limit: int = 50,
    offset: int = 0,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - Get all tickets"""
    query = select(Ticket)
    
    if status:
        query = query.where(Ticket.status == status)
    
    query = query.offset(offset).limit(limit).order_by(Ticket.created_at.desc())
    
    result = await db.execute(query)
    tickets = result.scalars().all()
    
    return tickets

@router.get("/admin/{ticket_id}", response_model=TicketResponse)
async def get_ticket(
    ticket_id: int,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - Get specific ticket"""
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    return ticket

@router.put("/admin/{ticket_id}", response_model=TicketResponse)
async def update_ticket(
    ticket_id: int,
    ticket_update: TicketUpdate,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - Update ticket"""
    # Check if ticket exists
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    # Update ticket
    update_data = ticket_update.model_dump(exclude_unset=True)
    if update_data:
        await db.execute(
            update(Ticket)
            .where(Ticket.id == ticket_id)
            .values(**update_data)
        )
        await db.commit()
        await db.refresh(ticket)
    
    return ticket

@router.delete("/admin/{ticket_id}")
async def delete_ticket(
    ticket_id: int,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - Delete ticket"""
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()
    
    if not ticket:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ticket not found"
        )
    
    await db.delete(ticket)
    await db.commit()
    
    return {"message": "Ticket deleted successfully"}