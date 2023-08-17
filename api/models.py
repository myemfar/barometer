from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from typing import List


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: str
    username: str


class AccountOutWithHashedPassword(AccountOut):
    hashed_password: str


class AccountToken(Token):
    account: AccountOut


class AccountForm(BaseModel):
    username: str
    password: str


class IngredientsIn(BaseModel):
    name: str
    image_url: str


class IngredientsOut(BaseModel):
    id: str
    name: str


class IngredientsList(BaseModel):
    ingredients: List[IngredientsOut]
