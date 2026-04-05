"""Seed demo users idempotently.

Usage (from another entrypoint):
    from app.initial_data import create_demo_users
    await create_demo_users()
"""

from __future__ import annotations

from sqlalchemy import select

from .core.security import hash_password
from .database import AsyncSessionLocal
from .models.user import User, UserRole

DEMO_USERS: list[dict[str, str | UserRole]] = [
    {
        "email": "student@demo.re",
        "password": "student1234",
        "full_name": "Demo Student",
        "role": UserRole.STUDENT,
    },
    {
        "email": "instructor@demo.re",
        "password": "instructor1234",
        "full_name": "Demo Instructor",
        "role": UserRole.INSTRUCTOR,
    },
    {
        "email": "manager@demo.re",
        "password": "manager1234",
        "full_name": "Demo Manager",
        "role": UserRole.MANAGER,
    },
]


async def create_demo_users() -> None:
    async with AsyncSessionLocal() as db:
        for spec in DEMO_USERS:
            email = str(spec["email"])
            existing = await db.execute(select(User).where(User.email == email))
            if existing.scalar_one_or_none() is not None:
                continue
            db.add(
                User(
                    email=email,
                    password_hash=hash_password(str(spec["password"])),
                    full_name=str(spec["full_name"]),
                    role=spec["role"],  # type: ignore[arg-type]
                )
            )
        await db.commit()
