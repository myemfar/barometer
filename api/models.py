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


class DrinksIn(BaseModel):
    name: str
    image_url: str


class DrinksOut(BaseModel):
    id: str
    name: str
    image_url: str | None
    description: str | None
    instructions: str | None


class DrinksList(BaseModel):
    drinks: List[DrinksOut]


class RecipesIn(BaseModel):
    id: str
    quantity: str


class RecipesOut(BaseModel):
    id: str
    drink_id: str
    ingredient_id: str
    quantity: str


class RecipesList(BaseModel):
    recipes: List[RecipesOut]