from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import DrinksIn, DrinksOut, DrinksList
from queries.drinks import DrinksRepo, DrinkNotFound, DrinkAlreadyExists


router = APIRouter()


@router.get("/api/drinks")
def get_drinks(repo: DrinksRepo = Depends()):
    return DrinksList(drinks=repo.get_all())


@router.get("/api/drinks/{drink_id}", response_model=DrinksList)
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

    return DrinksList(drinks=drinks)


@router.post("/api/drinks", response_model=DrinksOut)
def add_drink(
    info: DrinksIn,
    repo: DrinksRepo = Depends(),
):
    try:
        added_drink = repo.add_drink(info)
    except DrinkAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Drink already exists",
        )
    return added_drink


@router.put("/api/drinks/", response_model=DrinksOut)
def update_drink(
    info: DrinksIn,
    repo: DrinksRepo = Depends(),
):
    updated_drink = repo.update_drink(info)
    return updated_drink


@router.delete("/api/drinks/{drink_id}", response_model=DrinksList)
def delete_drink(
    drink_id,
    repo: DrinksRepo = Depends(),
):
    try:
        repo.delete_drink(drink_id)
    except DrinkNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Drink not found",
        )
    return DrinksList(drinks=repo.get_all())
