from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from models import DrinkTagsIn, DrinkTagsList
from queries.drink_tags import (
    DrinkTagsRepo,
    DrinkTagNotFound,
    DrinkTagAlreadyExists,
)
from psycopg.errors import ForeignKeyViolation
from authenticator import authenticator


router = APIRouter()


@router.get("/api/drink_tags/mine", response_model=DrinkTagsList)
def get_drink_tag(
    repo: DrinkTagsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        drink_tags = repo.get(account_data["id"])

    except DrinkTagNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Drink tags found",
        )

    return DrinkTagsList(drink_tags=drink_tags)


@router.post("/api/drink_tags", response_model=DrinkTagsList)
async def create_drink_tag(
    info: DrinkTagsIn,
    repo: DrinkTagsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        repo.add_drink_tag(info, account_data["id"])
        drink_tags = repo.get(account_data["id"])
    except DrinkTagAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Drink Tag already exists",
        )
    except ForeignKeyViolation:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User, Drink, or Tag do not exist",
        )
    return DrinkTagsList(drink_tags=drink_tags)


@router.delete("/api/drink_tags/mine", response_model=bool)
def delete_drink_tag(
    info: DrinkTagsIn,
    repo: DrinkTagsRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        repo.delete_drink_tag(info, account_data["id"])
        return True
    except DrinkTagNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Drink Tag not found",
        )
    except ForeignKeyViolation as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User, tag, or drink not found, error{e}",
        )
