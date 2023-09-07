from fastapi.testclient import TestClient
from main import app
from queries.tags import TagsRepo

client = TestClient(app)


class FakeTagQueries:
    def get_tags(self):
        return ({"id": 1, "tag_name": "Favorite"},)


def test_get_tags():
    app.dependency_overrides[TagsRepo] = FakeTagQueries
    response = client.get("/api/tags")
    data = response.json()

    assert response.status_code == 200
    assert data == {"tags": [{"id": 1, "tag_name": "Favorite"}]}
