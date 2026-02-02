import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
from jinja2 import Template
from app.core.config import settings

async def send_email(
    to_email: str,
    subject: str,
    html_body: str,
    text_body: Optional[str] = None
) -> bool:
    """Send email via Gmail SMTP"""
    try:
        # Create message
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = settings.SMTP_FROM_EMAIL
        msg['To'] = to_email
        
        # Add text part
        if text_body:
            text_part = MIMEText(text_body, 'plain', 'utf-8')
            msg.attach(text_part)
        
        # Add HTML part
        html_part = MIMEText(html_body, 'html', 'utf-8')
        msg.attach(html_part)
        
        # Send email
        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USERNAME, settings.SMTP_PASSWORD)
            server.send_message(msg)
        
        return True
    except Exception as e:
        print(f"Email sending failed: {e}")
        return False

async def send_ticket_confirmation(ticket_data: dict) -> bool:
    """Send confirmation to client after ticket submission"""
    subject = f"Ticket Confirmation - {ticket_data['client_name']}"
    
    html_template = Template("""
    <html>
    <body dir="rtl" style="font-family: Arial, sans-serif;">
        <h2>תודה על פנייתך</h2>
        <p>שלום {{ client_name }},</p>
        <p>קיבלנו את פנייתך ונחזור אליך בהקדם.</p>
        
        <h3>פרטי הפנייה:</h3>
        <ul>
            <li><strong>שם:</strong> {{ client_name }}</li>
            <li><strong>אימייל:</strong> {{ client_email }}</li>
            <li><strong>טלפון:</strong> {{ client_phone }}</li>
            <li><strong>רמת דחיפות:</strong> {{ urgency_level }}</li>
        </ul>
        
        <h3>תיאור האירוע:</h3>
        <p>{{ event_summary }}</p>
        
        <p>בברכה,<br>המשרד לעניינים משפטיים</p>
    </body>
    </html>
    """)
    
    html_body = html_template.render(**ticket_data)
    
    return await send_email(
        to_email=ticket_data['client_email'],
        subject=subject,
        html_body=html_body
    )

async def send_ticket_notification_to_lawyer(ticket_data: dict) -> bool:
    """Notify lawyer of new ticket"""
    subject = f"New Ticket Submitted - {ticket_data['client_name']}"
    
    html_template = Template("""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <h2>New Ticket Submitted</h2>
        
        <h3>Client Information:</h3>
        <ul>
            <li><strong>Name:</strong> {{ client_name }}</li>
            <li><strong>Email:</strong> {{ client_email }}</li>
            <li><strong>Phone:</strong> {{ client_phone }}</li>
            <li><strong>Urgency:</strong> {{ urgency_level }}</li>
        </ul>
        
        <h3>Event Summary:</h3>
        <p>{{ event_summary }}</p>
        
        <p><a href="http://localhost:5173/admin/tickets">View in Admin Dashboard</a></p>
    </body>
    </html>
    """)
    
    html_body = html_template.render(**ticket_data)
    
    return await send_email(
        to_email=settings.LAWYER_EMAIL,
        subject=subject,
        html_body=html_body
    )

async def send_invitation_email(client_email: str, invitation_link: str) -> bool:
    """Send registration invitation"""
    subject = "Invitation to Legal Office Client Portal"
    
    html_body = f"""
    <html>
    <body style="font-family: Arial, sans-serif;">
        <h2>You're Invited to Our Client Portal</h2>
        <p>Hello,</p>
        <p>You've been invited to register for our client portal where you can:</p>
        <ul>
            <li>Chat directly with your lawyer</li>
            <li>Track your case status</li>
            <li>Access important documents</li>
        </ul>
        
        <p><a href="{invitation_link}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Register Now</a></p>
        
        <p>Best regards,<br>Legal Office Team</p>
    </body>
    </html>
    """
    
    return await send_email(
        to_email=client_email,
        subject=subject,
        html_body=html_body
    )