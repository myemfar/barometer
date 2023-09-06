from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from models import (
    RecipesIn,
    RecipesOut,
    RecipesList,
    RecipeDetailsList,
    RecipesInWithoutQuantity,
)
from queries.recipes import RecipesRepo, RecipeNotFound, RecipeAlreadyExists
from psycopg.errors import ForeignKeyViolation
from authenticator import authenticator

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


@router.get("/api/recipes/{drink_id}/steps", response_model=RecipeDetailsList)
def get_recipe_by_drink(
    drink_id: int,
    repo: RecipesRepo = Depends(),
):
    try:
        recipes = repo.get_by_drink(drink_id)

    except RecipeNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot find a Recipe with that ID",
        )

    return RecipeDetailsList(steps=recipes)


@router.post("/api/recipes", response_model=RecipesOut)
def add_recipe(
    info: RecipesIn,
    repo: RecipesRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        user = repo._get_user_id_from_drink(info.drink_id)
        if account_data and user == account_data["id"]:
            added_recipe = repo.add_recipe(info)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You are not allowed to view that",
            )
    except RecipeAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Recipe already exists",
        )
    except ForeignKeyViolation as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"ingredient or drink do not exist, full error is: ${e}",
        )
    except RecipeNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ingredient or drink do not exist",
        )
    return added_recipe


@router.put("/api/recipes/", response_model=RecipesOut)
def update_recipe(
    info: RecipesIn,
    repo: RecipesRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        user = repo._get_user_id_from_drink(info.drink_id)
        if account_data and user == account_data["id"]:
            updated_recipe = repo.update_recipe(info)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You are not allowed to view that",
            )
    except RecipeNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ingredient or drink do not exist",
        )
    return updated_recipe


@router.delete("/api/recipes/{drink_id}/{recipe_id}", response_model=bool)
def delete_recipe(
    drink_id: int,
    recipe_id: int,
    repo: RecipesRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        user = repo._get_user_id_from_drink(drink_id)
        if account_data and user == account_data["id"]:
            repo.delete_recipe(recipe_id)
            return True
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You are not allowed to view that",
            )
    except RecipeNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Recipe not found",
        )
