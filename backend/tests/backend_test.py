"""Backend API tests for Harshit MadeIt Portfolio."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://harshit-design-2.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ============ Root endpoint ============
class TestRoot:
    def test_root_returns_message(self, session):
        r = session.get(f"{API}/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Harshit" in data["message"] or "Motion" in data["message"]


# ============ Contact POST ============
class TestContactCreate:
    def test_create_contact_minimum_fields(self, session):
        payload = {
            "name": "TEST_Jane Cooper",
            "email": "test_jane@example.com",
            "message": "Hi, interested in motion design.",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, f"Got {r.status_code}: {r.text}"
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data
        assert data.get("company") is None
        assert data.get("project_type") is None
        assert data.get("budget") is None

    def test_create_contact_all_fields(self, session):
        payload = {
            "name": "TEST_John Doe",
            "email": "test_john@example.com",
            "company": "Acme SaaS",
            "project_type": "saas-ad",
            "budget": "10-25k",
            "message": "Need a 30s explainer.",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 201, f"Got {r.status_code}: {r.text}"
        data = r.json()
        assert data["company"] == "Acme SaaS"
        assert data["project_type"] == "saas-ad"
        assert data["budget"] == "10-25k"
        # Verify persistence via GET
        list_r = session.get(f"{API}/contact")
        assert list_r.status_code == 200
        ids = [c["id"] for c in list_r.json()]
        assert data["id"] in ids

    def test_create_contact_invalid_email_returns_422(self, session):
        payload = {
            "name": "TEST_Bad Email",
            "email": "not-an-email",
            "message": "Hello",
        }
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422, f"Expected 422 for invalid email, got {r.status_code}: {r.text}"

    def test_create_contact_missing_name_returns_422(self, session):
        payload = {"email": "test_missing@example.com", "message": "Hello"}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_email_returns_422(self, session):
        payload = {"name": "TEST_NoEmail", "message": "Hello"}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_message_returns_422(self, session):
        payload = {"name": "TEST_NoMsg", "email": "test_nomsg@example.com"}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_empty_name_returns_422(self, session):
        payload = {"name": "", "email": "test_e@example.com", "message": "Hi"}
        r = session.post(f"{API}/contact", json=payload)
        assert r.status_code == 422


# ============ Contact GET ============
class TestContactList:
    def test_list_contacts_returns_list(self, session):
        r = session.get(f"{API}/contact")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)

    def test_list_contacts_sorted_desc(self, session):
        # Create two contacts sequentially
        p1 = {"name": "TEST_Order1", "email": "test_order1@example.com", "message": "first"}
        p2 = {"name": "TEST_Order2", "email": "test_order2@example.com", "message": "second"}
        r1 = session.post(f"{API}/contact", json=p1)
        r2 = session.post(f"{API}/contact", json=p2)
        assert r1.status_code == 201 and r2.status_code == 201
        id1, id2 = r1.json()["id"], r2.json()["id"]

        list_r = session.get(f"{API}/contact")
        assert list_r.status_code == 200
        contacts = list_r.json()
        # Find positions
        ids = [c["id"] for c in contacts]
        assert id1 in ids and id2 in ids
        pos1 = ids.index(id1)
        pos2 = ids.index(id2)
        # id2 (newer) should appear before id1 (older) → smaller index
        assert pos2 < pos1, f"Expected newest first; pos2={pos2}, pos1={pos1}"

    def test_list_contacts_no_objectid_leak(self, session):
        r = session.get(f"{API}/contact")
        assert r.status_code == 200
        for c in r.json():
            assert "_id" not in c
