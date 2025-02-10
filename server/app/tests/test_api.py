import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture(scope="module")
def test_client():
    # Use test client with temporary trie instance
    with TestClient(app) as client:
        yield client


def test_valid_t9_search(test_client):
    response = test_client.get("/words?digits=4663")
    assert response.status_code == 200
    assert all(word in response.json()
               for word in ["gone", "hoof", "inoffensive"])


def test_strict_matching_api(test_client):
    response = test_client.get("/words?digits=46630")
    assert response.status_code == 200
    assert response.json() == [
        "gond",
        "gone",
        "good",
        "home",
        "hood",
        "hoof"
    ]
    assert "inoffensive" not in response.json()


def test_invalid_digits(test_client):
    # Test non-numeric input
    response = test_client.get("/words?digits=4a66")
    assert response.status_code == 400
    assert "numeric characters" in response.json()["detail"]


def test_empty_digits(test_client):
    response = test_client.get("/words?digits=")
    assert response.status_code == 422


def test_sorting_order_api(test_client):
    response = test_client.get("/words?digits=4663")
    results = response.json()
    # Verify case-insensitive sorting
    assert results == sorted(results, key=lambda x: x.lower())
