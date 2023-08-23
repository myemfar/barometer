from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import DrinksIn, DrinksOut, DrinksList
from queries.drinks import DrinksRepo, DrinkNotFound


router = APIRouter()


@router.get("/api/drinks")
def get_drinks(repo: DrinksRepo = Depends()):
    return DrinksList(drinks=repo.get_all())


@router.get("/api/drinks/{drink_id}")
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
    added_drink = repo.add_drink(info)
    return added_drink
