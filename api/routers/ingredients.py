from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import IngredientsIn, IngredientsOut, IngredientsList
from queries.ingredients import IngredientsRepo


router = APIRouter()


@router.get("/api/ingredients")
def get_ingredients(repo: IngredientsRepo = Depends()):
    return IngredientsList(ingredients=repo.get())
