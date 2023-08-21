from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import RecipesIn, RecipesOut, RecipesList
from queries.recipes import RecipesRepo, RecipeNotFound


router = APIRouter()


@router.get("/api/recipes")
def get_recipes(repo: RecipesRepo = Depends()):
    return RecipesList(recipes=repo.get_all())


@router.get("/api/recipes/{recipe_id}")
def get_recipe(
    recipe_id: str,
    repo: RecipesRepo = Depends(),
):
    try:
        recipes = repo.get(recipe_id)

    except RecipeNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot find a Recipe with that ID",
        )

    return RecipesList(recipes=recipes)
