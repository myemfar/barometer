from fastapi import FastAPI, APIRouter
from authenticator import authenticator
from routers import accounts, ingredients
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authenticator.router)
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(ingredients.router, tags=["Ingredients"])
