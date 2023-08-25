from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status,
)
from models import TagsIn, TagsOut, TagsList
from queries.tags import TagsRepo, TagNotFound


router = APIRouter()


@router.get("/api/tags", response_model=TagsList)
def get_tags(repo: TagsRepo = Depends()):
    return TagsList(tags=repo.get_tags())


@router.post("/api/tags", response_model=TagsList)
def create_user_Tags(
    tag_name: str,
    repo: TagsRepo = Depends(),
):
    repo.add_tag(tag_name)
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
    tag_id: str,
    tag_name: str,
    repo: TagsRepo = Depends(),
):
    repo.update_tags(tag_id, tag_name)
    tags = repo.get_tags()
    return TagsList(tags=tags)
