from fastapi import APIRouter, Depends, Request, Response
from models import AccountToken, AccountIn, AccountForm
from queries.accounts import AccountRepo
from authenticator import authenticator

router = APIRouter()


@router.post("/api/accounts", response_model=AccountToken)
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    repo: AccountRepo = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    account = repo.create(info, hashed_password)
    form = AccountForm(username=info.username, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


# @router.delete("/api/accounts/{account_id}", response_model=bool)
# def delete_account(
#     account_id: str
#     repo: AccountRepo

# )
