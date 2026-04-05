"""Shared FastAPI dependencies."""

from __future__ import annotations

from collections.abc import Callable, Awaitable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .core.security import decode_token
from .database import get_db
from .models.user import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login", auto_error=False)


async def get_current_user(
    token: str | None = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    credentials_exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token:
        raise credentials_exc
    payload = decode_token(token)
    if not payload:
        raise credentials_exc
    sub = payload.get("sub")
    if sub is None:
        raise credentials_exc
    try:
        user_id = int(sub)
    except (TypeError, ValueError):
        raise credentials_exc
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exc
    return user


def require_role(role: str) -> Callable[[User], Awaitable[User]]:
    """Dependency factory: ensure the current user has the given role."""

    async def _checker(current: User = Depends(get_current_user)) -> User:
        if str(current.role) != role and getattr(current.role, "value", None) != role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Role '{role}' required",
            )
        return current

    return _checker
