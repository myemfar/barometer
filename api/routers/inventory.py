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
from authenticator import authenticator

router = APIRouter()


@router.get("/api/inventory/{user_id}", response_model=InventoryList)
def get_user_inventory(
    user_id: str,
    repo: InventoryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data and int(user_id) == account_data["id"]:
            inventory = repo.get(user_id)
            return InventoryList(inventory=inventory)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You are not allowed to view that",
            )
    except InventoryNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inventory is empty",
        )


@router.post("/api/inventory", response_model=InventoryList)
def create_user_inventory(
    info: InventoryIn,
    repo: InventoryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data and info.user_id == account_data["id"]:
            repo.add_ingredient(info)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You are not allowed to view that",
            )
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
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    repo.delete_ingredient(info)
    try:
        if account_data and info.user_id == account_data["id"]:
            inventory = repo.get(info.user_id)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You are not allowed to view that",
            )
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
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        if account_data and info.user_id == account_data["id"]:
            repo.update_ingredient(info)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="You are not allowed to view that",
            )
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
