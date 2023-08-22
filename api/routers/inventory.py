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
