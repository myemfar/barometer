from fastapi import (
    APIRouter,
    Depends,
)
from models import IngredientsList
from queries.ingredients import IngredientsRepo


router = APIRouter()


@router.get("/api/ingredients", response_model=IngredientsList)
def get_ingredients(repo: IngredientsRepo = Depends()):
    return IngredientsList(ingredients=repo.get())
