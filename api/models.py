from pydantic import BaseModel
from jwtdown_fastapi.authentication import Token
from typing import List


class AccountIn(BaseModel):
    username: str
    password: str


class AccountOut(BaseModel):
    id: int
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
    id: int
    name: str


class IngredientsList(BaseModel):
    ingredients: List[IngredientsOut]


class DrinksIn(BaseModel):
    name: str
    image_url: str | None
    description: str | None
    instructions: str | None


class DrinksOut(BaseModel):
    id: int
    name: str
    image_url: str | None
    description: str | None
    instructions: str | None


class DrinksList(BaseModel):
    drinks: List[DrinksOut]


class RecipesIn(BaseModel):
    drink_id: int
    ingredient_id: int
    quantity: str


class RecipesOut(BaseModel):
    id: int
    drink_id: int
    ingredient_id: int
    quantity: str


class RecipesList(BaseModel):
    recipes: List[RecipesOut]


class InventoryIn(BaseModel):
    user_id: int
    ingredient_id: int
    quantity: str


class InventoryOut(BaseModel):
    id: int
    user_id: int
    ingredient_id: int
    quantity: str


class InventoryList(BaseModel):
    inventory: List[InventoryOut]


class TagsIn(BaseModel):
    tag_name: str


class TagsInWithID(BaseModel):
    id: int
    tag_name: str


class TagsOut(BaseModel):
    id: int
    tag_name: str


class TagsList(BaseModel):
    tags: List[TagsOut]


class DrinkTagsIn(BaseModel):
    user_id: int
    drink_id: int
    tag_id: int


class DrinkTagsOut(BaseModel):
    id: int
    user_id: int
    drink_id: int
    tag_id: int


class DrinkTagsList(BaseModel):
    drink_tags: List[DrinkTagsOut]
