from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from models import DrinksIn, DrinksOut, DrinksList, DrinksById
from queries.drinks import DrinksRepo, DrinkNotFound
from psycopg.errors import UniqueViolation
from authenticator import authenticator

router = APIRouter()


@router.get("/api/drinks")
def get_drinks(repo: DrinksRepo = Depends()):
    return DrinksList(drinks=repo.get_all())


@router.get("/api/drinks/{drink_id}", response_model=DrinksOut)
def get_drink(
    drink_id: str,
    repo: DrinksRepo = Depends(),
):
    try:
        drinks = repo.get(drink_id)

    except DrinkNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot find a drink with that ID",
        )

    return drinks


@router.post("/api/drinks", response_model=DrinksOut)
def add_drink(
    info: DrinksIn,
    repo: DrinksRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        added_drink = repo.add_drink(info, account_data["id"])
    except UniqueViolation:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Drink already exists",
        )
    return added_drink


@router.put("/api/drinks/", response_model=DrinksOut)
def update_drink(
    info: DrinksIn,
    repo: DrinksRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        fooFighters = repo.get_by_name(info.name)
        if account_data and fooFighters["user_id"] == account_data["id"]:
            updated_drink = repo.update_drink(info)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You are not allowed to view that",
            )
    except DrinkNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Drink not found",
        )
    return updated_drink


@router.delete("/api/drinks/{drink_id}", response_model=bool)
def delete_drink(
    info: DrinksById,
    repo: DrinksRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data and info.user_id == account_data["id"]:
            repo.delete_drink(info.id)
            return True
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You are not allowed to view that",
            )
    except DrinkNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Drink not found",
        )
