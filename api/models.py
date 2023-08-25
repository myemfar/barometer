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
    image_url: str | None
    description: str | None
    instructions: str | None


class DrinksOut(BaseModel):
    id: str
    name: str
    image_url: str | None
    description: str | None
    instructions: str | None


class DrinksList(BaseModel):
    drinks: List[DrinksOut]


class RecipesIn(BaseModel):
    drink_id: str
    ingredient_id: str
    quantity: str


class RecipesOut(BaseModel):
    id: str
    drink_id: str
    ingredient_id: str
    quantity: str


class RecipesList(BaseModel):
    recipes: List[RecipesOut]


class InventoryIn(BaseModel):
    user_id: str
    ingredient_id: str
    quantity: str


class InventoryOut(BaseModel):
    id: str
    user_id: str
    ingredient_id: str
    quantity: str


class InventoryList(BaseModel):
    inventory: List[InventoryOut]


class TagsIn(BaseModel):
    tag_name: str


class TagsInWithID(BaseModel):
    id: int
    tag_name: str


class TagsOut(BaseModel):
    id: str
    tag_name: str


class TagsList(BaseModel):
    tags: List[TagsOut]


class DrinkTagsIn(BaseModel):
    user_id: str
    drink_id: str
    tag_id: str


class DrinkTagsOut(BaseModel):
    id: str
    user_id: str
    drink_id: str
    tag_id: str


class DrinkTagsList(BaseModel):
    drink_tags: List[DrinkTagsOut]
