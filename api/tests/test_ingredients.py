from fastapi.testclient import TestClient
from main import app
from queries.ingredients import IngredientsRepo

client = TestClient(app)


class FakeIngredientsQueries:
    def get(self):
        return ({"id": 1, "name": "Light rum"},)


def test_get_ingredients():
    app.dependency_overrides[IngredientsRepo] = FakeIngredientsQueries
    response = client.get("/api/ingredients")
    data = response.json()

    assert response.status_code == 200
    assert data == {"ingredients": [{"id": 1, "name": "Light rum"}]}
