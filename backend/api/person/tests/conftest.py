import json
import pytest

from sqlalchemy_utils.functions import database_exists, create_database
from api.database import get_db
from starlette.testclient import TestClient
from sqlalchemy.orm import Session
from api.main import app
from api.person.tests.database_test import engine, Base
from api.person.services.services_person import create_person
from api.person.schemas.schemas_person import PersonRequest



@pytest.fixture(scope="session")
def db_engine():
    if not database_exists:
        create_database(engine.url)

    Base.metadata.create_all(bind=engine)
    yield engine


@pytest.fixture(scope="function")
def db(db_engine):
    connection = db_engine.connect()
    connection.begin()
    db = Session(bind=connection)

    yield db

    db.rollback()
    connection.close()


@pytest.fixture(scope="function")
def client(db):
    app.dependency_overrides[get_db] = lambda: db

    with TestClient(app) as c:
        yield c


@pytest.fixture
def instance_person_1():
    return {
            'nome': 'João Antônio',
            'rg': '82.777.453-7',
            'cpf': '123.456.789-04',
            'data_nascimento': '1998-05-15',
            'data_admissao': '2023-10-02',
            'funcao': 'Gerente',
        }


@pytest.fixture
def instance_person_2():
    return { 
            'nome': 'Pedro Henrique',
            'rg': '32.556.451-4',
            'cpf': '321.765.267-03',
            'data_nascimento': '2000-03-18',
            'data_admissao': '2023-10-02',
            'funcao': None
        }


@pytest.fixture
def object_created(client):
    response = client.post(
        '/api/pessoas',
        json={
            "nome":"Leo Bernardes",
            "rg":"22.516.431-9",
            "cpf":"320.765.207-43",
            "data_nascimento":"2001-09-08",
            "data_admissao":"2023-10-02",
            "funcao":"RH"
        }
    )

    return json.loads(response.content.decode('utf-8'))