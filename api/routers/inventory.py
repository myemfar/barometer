from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from models import InventoryIn, InventoryList
from queries.inventory import (
    InventoryRepo,
    InventoryNotFound,
    InventoryIngredientAlreadyExists,
    InventoryIngredientNotFound,
)
from psycopg.errors import ForeignKeyViolation

router = APIRouter()


@router.get("/api/inventory/{user_id}", response_model=InventoryList)
def get_user_inventory(
    user_id: str,
    repo: InventoryRepo = Depends(),
):
    try:
        inventory = repo.get(user_id)

    except InventoryNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inventory is empty",
        )

    return InventoryList(inventory=inventory)


@router.post("/api/inventory", response_model=InventoryList)
def create_user_inventory(
    info: InventoryIn,
    repo: InventoryRepo = Depends(),
):
    try:
        repo.add_ingredient(info)
    except ForeignKeyViolation as error:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ingredient does not exist, error code details: {error}",
        )
    except InventoryIngredientAlreadyExists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already has this ingredient, please update instead",
        )
    inventory = repo.get(info.user_id)
    return InventoryList(inventory=inventory)


@router.delete("/api/inventory", response_model=InventoryList)
def delete_user_ingredient(
    info: InventoryIn,
    repo: InventoryRepo = Depends(),
):
    repo.delete_ingredient(info)
    try:
        inventory = repo.get(info.user_id)
    except InventoryNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inventory is empty",
        )
    return InventoryList(inventory=inventory)


@router.put("/api/inventory", response_model=InventoryList)
def update_user_ingredient(
    info: InventoryIn,
    repo: InventoryRepo = Depends(),
):
    try:
        repo.update_ingredient(info)
    except InventoryIngredientNotFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Ingredient does not exist",
        )
    try:
        inventory = repo.get(info.user_id)
    except InventoryNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inventory is empty",
        )
    return InventoryList(inventory=inventory)
