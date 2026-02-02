from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.depends import RateLimiter
import redis.asyncio as redis
from contextlib import asynccontextmanager

from app.core.config import settings
from app.routers import tickets, auth, chat, blog

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    try:
        # Initialize Redis for rate limiting
        redis_client = redis.from_url("redis://localhost:6379", encoding="utf-8", decode_responses=True)
        await FastAPILimiter.init(redis_client)
    except Exception as e:
        print(f"Redis connection failed: {e}")
        print("Rate limiting disabled")
    
    yield
    
    # Shutdown
    await FastAPILimiter.close()

app = FastAPI(
    title=settings.APP_NAME,
    description="Legal Office System MVP - Ticket submission, chat, and blog management",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tickets.router)
app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(blog.router)

@app.get("/")
async def root():
    return {
        "message": "Legal Office System API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Rate limited endpoint example
@app.get("/api/limited")
async def limited_endpoint(ratelimit: dict = RateLimiter(times=10, seconds=60)):
    return {"message": "This endpoint is rate limited"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG
    )