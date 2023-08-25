from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import TagsIn, TagsOut, TagsList, TagsInWithID
from queries.tags import TagsRepo, TagNotFound
from psycopg.errors import UniqueViolation

router = APIRouter()


@router.get("/api/tags", response_model=TagsList)
def get_tags(repo: TagsRepo = Depends()):
    return TagsList(tags=repo.get_tags())


@router.post("/api/tags", response_model=TagsList)
def create_user_Tags(
    info: TagsIn,
    repo: TagsRepo = Depends(),
):
    try:
        repo.add_tag(info)
    except UniqueViolation:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="tag already exists, please delete or update instead",
        )
    tags = repo.get_tags()
    return TagsList(tags=tags)


@router.delete("/api/tags", response_model=TagsList)
def delete_tag(
    tag_id: str,
    repo: TagsRepo = Depends(),
):
    repo.delete_tag(tag_id)
    tags = repo.get_tags()
    return TagsList(tags=tags)


@router.put("/api/tags", response_model=TagsList)
def update_tag(
    info: TagsInWithID,
    repo: TagsRepo = Depends(),
):
    repo.update_tags(info)
    tags = repo.get_tags()
    return TagsList(tags=tags)
