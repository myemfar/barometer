from fastapi import FastAPI
from authenticator import authenticator
from routers import (
    accounts,
    ingredients,
    drinks,
    recipes,
    inventory,
    tags,
    drink_tags,
)
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authenticator.router, tags=["Tokens"])
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(ingredients.router, tags=["Ingredients"])
app.include_router(drinks.router, tags=["Drinks"])
app.include_router(recipes.router, tags=["Recipes"])
app.include_router(inventory.router, tags=["Inventory"])
app.include_router(tags.router, tags=["Tags"])
app.include_router(drink_tags.router, tags=["Drink Tags"])
