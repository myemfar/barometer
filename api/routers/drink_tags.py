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


router = APIRouter()


@router.get("/api/drink_tags/{user_id}", response_model=DrinkTagsList)
def get_drink_tag(
    user_id,
    repo: DrinkTagsRepo = Depends(),
):
    try:
        drink_tags = repo.get(user_id)

    except DrinkTagNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No Drink tags found",
        )

    return DrinkTagsList(drink_tags=drink_tags)


@router.post("/api/drink_tags", response_model=DrinkTagsList)
def create_drink_tag(
    info: DrinkTagsIn,
    repo: DrinkTagsRepo = Depends(),
):
    try:
        repo.add_drink_tag(info)
        drink_tags = repo.get(info.user_id)
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


@router.delete("/api/drink_tags/{user_id}", response_model=bool)
def delete_drink_tag(
    info: DrinkTagsIn,
    repo: DrinkTagsRepo = Depends(),
):
    try:
        repo.delete_drink_tag(info)
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
