from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from models import (
    InventoryIn,
    InventoryList,
    UserInventoryIn,
    UserInventoryList,
)
from queries.inventory import (
    InventoryRepo,
    InventoryNotFound,
    InventoryIngredientAlreadyExists,
    InventoryIngredientNotFound,
)
from psycopg.errors import ForeignKeyViolation
from authenticator import authenticator

router = APIRouter()


@router.get("/api/inventory/mine", response_model=UserInventoryList)
def get_user_inventory(
    repo: InventoryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        inventory = repo.get(account_data["id"])
        return UserInventoryList(inventory=inventory)
    except InventoryNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inventory is empty",
        )


@router.post("/api/inventory", response_model=UserInventoryList)
def create_user_inventory(
    info: InventoryIn,
    repo: InventoryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        repo.add_ingredient(info, account_data["id"])
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
    inventory = repo.get(account_data["id"])
    return UserInventoryList(inventory=inventory)


@router.delete("/api/inventory/mine", response_model=bool)
def delete_user_ingredient(
    info: UserInventoryIn,
    repo: InventoryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    repo.delete_ingredient(info, account_data["id"])
    return True


@router.put("/api/inventory", response_model=InventoryList)
def update_user_ingredient(
    info: InventoryIn,
    repo: InventoryRepo = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    try:
        fooFighters = repo._get_specific(
            account_data["id"], info.ingredient_id
        )
        if account_data and fooFighters[0]["user_id"] == account_data["id"]:
            inventory = repo.update_ingredient(info, account_data["id"])
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
        inventory = repo.get(account_data["id"])
    except InventoryNotFound:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inventory is empty",
        )
    return InventoryList(inventory=inventory)
