from fastapi.testclient import TestClient
from main import app
from queries.drinks import DrinksRepo

client = TestClient(app)


class FakeDrinkQueries:
    def get_all(self):
        return (
            {
                "id": 1,
                "user_id": 1,
                "name": "vodka",
                "image_url": "gsgsdg",
                "description": "string",
                "instructions": "sdgsg",
            },
        )


def test_get_drinks():
    app.dependency_overrides[DrinksRepo] = FakeDrinkQueries
    response = client.get("/api/drinks")
    data = response.json()

    assert response.status_code == 200
    assert data == {
        "drinks": [
            {
                "id": 1,
                "user_id": 1,
                "name": "vodka",
                "image_url": "gsgsdg",
                "description": "string",
                "instructions": "sdgsg",
            },
        ]
    }
