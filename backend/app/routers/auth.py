from fastapi import APIRouter, HTTPException
from app.schemas.user import LoginRequest
from app.db.database import users_collection
from app.core.security import verify_password

router = APIRouter()

@router.post("/login")
async def login(request: LoginRequest):
    user = users_collection.find_one({"email": request.email})
    if user and verify_password(request.password, user["password"]):
        return {"message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid email or password")