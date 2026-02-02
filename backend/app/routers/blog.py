from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.core.database import get_db
from app.core.dependencies import get_admin_user
from app.models import Article, User
from app.schemas import ArticleCreate, ArticleResponse, ArticleUpdate

router = APIRouter(prefix="/blog", tags=["Blog"])

@router.get("/articles", response_model=List[ArticleResponse])
async def get_published_articles(
    language: str = "he",
    category: Optional[str] = None,
    limit: int = 10,
    offset: int = 0,
    db: AsyncSession = Depends(get_db)
):
    """Public endpoint - get published articles"""
    query = select(Article).where(
        Article.is_published == True,
        Article.language == language
    )
    
    if category:
        query = query.where(Article.category == category)
    
    query = query.offset(offset).limit(limit).order_by(Article.created_at.desc())
    
    result = await db.execute(query)
    articles = result.scalars().all()
    
    return articles

@router.get("/articles/{slug}", response_model=ArticleResponse)
async def get_article_by_slug(
    slug: str,
    db: AsyncSession = Depends(get_db)
):
    """Public endpoint - get single article by slug"""
    result = await db.execute(
        select(Article).where(
            Article.slug == slug,
            Article.is_published == True
        )
    )
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    return article

@router.get("/categories")
async def get_categories(
    language: str = "he",
    db: AsyncSession = Depends(get_db)
):
    """Public endpoint - get available categories"""
    result = await db.execute(
        select(Article.category)
        .where(
            Article.is_published == True,
            Article.language == language,
            Article.category.isnot(None)
        )
        .distinct()
    )
    categories = [row[0] for row in result.fetchall()]
    
    return {"categories": categories}

# Admin endpoints
@router.get("/admin/articles", response_model=List[ArticleResponse])
async def get_all_articles_admin(
    language: Optional[str] = None,
    is_published: Optional[bool] = None,
    limit: int = 50,
    offset: int = 0,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - get all articles (including unpublished)"""
    query = select(Article)
    
    if language:
        query = query.where(Article.language == language)
    
    if is_published is not None:
        query = query.where(Article.is_published == is_published)
    
    query = query.offset(offset).limit(limit).order_by(Article.created_at.desc())
    
    result = await db.execute(query)
    articles = result.scalars().all()
    
    return articles

@router.post("/admin/articles", response_model=ArticleResponse)
async def create_article(
    article_data: ArticleCreate,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - create article"""
    # Check if slug already exists
    result = await db.execute(select(Article).where(Article.slug == article_data.slug))
    existing_article = result.scalar_one_or_none()
    
    if existing_article:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Article with this slug already exists"
        )
    
    article = Article(**article_data.model_dump())
    
    db.add(article)
    await db.commit()
    await db.refresh(article)
    
    return article

@router.get("/admin/articles/{article_id}", response_model=ArticleResponse)
async def get_article_admin(
    article_id: int,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - get specific article"""
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    return article

@router.put("/admin/articles/{article_id}", response_model=ArticleResponse)
async def update_article(
    article_id: int,
    article_data: ArticleUpdate,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - update article"""
    # Check if article exists
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    # Update article
    update_data = article_data.model_dump(exclude_unset=True)
    if update_data:
        await db.execute(
            update(Article)
            .where(Article.id == article_id)
            .values(**update_data)
        )
        await db.commit()
        await db.refresh(article)
    
    return article

@router.delete("/admin/articles/{article_id}")
async def delete_article(
    article_id: int,
    current_user: User = Depends(get_admin_user),
    db: AsyncSession = Depends(get_db)
):
    """Admin only - delete article"""
    result = await db.execute(select(Article).where(Article.id == article_id))
    article = result.scalar_one_or_none()
    
    if not article:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Article not found"
        )
    
    await db.delete(article)
    await db.commit()
    
    return {"message": "Article deleted successfully"}