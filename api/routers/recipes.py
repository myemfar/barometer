from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import RecipesIn, RecipesOut, RecipesList
from queries.recipes import RecipesRepo, RecipeNotFound, RecipeAlreadyExists
from psycopg.errors import ForeignKeyViolation

router = APIRouter()


@router.get("/api/recipes", response_model=RecipesList)
def get_recipes(repo: RecipesRepo = Depends()):
    return RecipesList(recipes=repo.get_all())


@router.get("/api/recipes/{recipe_id}", response_model=RecipesOut)
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

    return recipes


@router.post("/api/recipes", response_model=RecipesOut)
def add_recipe(
    info: RecipesIn,
    repo: RecipesRepo = Depends(),
):
    try:
        added_recipe = repo.add_recipe(info)
    except RecipeAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Recipe already exists",
        )
    except ForeignKeyViolation as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ingredient or drink do not exist, full error message is: ${e}",
        )
    return added_recipe


@router.put("/api/recipes/", response_model=RecipesOut)
def update_recipe(
    info: RecipesIn,
    repo: RecipesRepo = Depends(),
):
    try:
        updated_recipe = repo.update_recipe(info)
    except RecipeNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ingredient or drink do not exist",
        )
    return updated_recipe


@router.delete("/api/recipes/{recipe_id}", response_model=bool)
def delete_recipe(
    recipe_id,
    repo: RecipesRepo = Depends(),
):
    try:
        repo.delete_recipe(recipe_id)
        return True
    except RecipeNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Recipe not found",
        )
