from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import InventoryIn, InventoryOut, InventoryList
from queries.inventory import InventoryRepo, InventoryNotFound


router = APIRouter()


@router.get("/api/inventory/{user_id}")
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


@router.post("/api/inventory")
def create_user_inventory(
    user_id: str,
    ingredient_id: str,
    quantity: str,
    repo: InventoryRepo = Depends(),
):
    repo.add_ingredient(user_id, ingredient_id, quantity)
    inventory = repo.get(user_id)
    return InventoryList(inventory=inventory)


@router.delete("/api/inventory")
def delete_user_ingredient(
    user_id: str,
    ingredient_id: str,
    repo: InventoryRepo = Depends(),
):
    repo.delete_ingredient(user_id, ingredient_id)
    inventory = repo.get(user_id)
    return InventoryList(inventory=inventory)


@router.put("/api/inventory")
def update_user_ingredient(
    user_id: str,
    ingredient_id: str,
    quantity: str,
    repo: InventoryRepo = Depends(),
):
    repo.update_ingredient(user_id, ingredient_id, quantity)
    inventory = repo.get(user_id)
    return InventoryList(inventory=inventory)
