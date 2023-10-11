import api.person.models as _models
import sqlalchemy.orm as _orm

from fastapi import HTTPException

from api.person.models import Pessoa
from api.person.schemas.schemas_person import PersonRequest


async def get_persons(search, sort, db: _orm.Session):
    if search:
        persons = db.query(Pessoa).filter(
            Pessoa.nome.contains(search) | Pessoa.cpf.contains(search)
        ).order_by(sort)
    else:
        persons = db.query(Pessoa).order_by(sort)

    return [person for person in persons]


async def get_person_by_name(nome: str, db: _orm.Session):
    return db.query(Pessoa).filter(Pessoa.nome == nome).first()


async def create_person(person: PersonRequest, db: _orm.Session):
    person_obj = Pessoa(
        nome=person.nome,
        rg=person.rg,
        cpf=person.cpf,
        data_nascimento=person.data_nascimento,
        data_admissao=person.data_admissao,
        funcao=person.funcao
    )
    db.add(person_obj)
    db.commit()
    db.refresh(person_obj)
    return person_obj


async def _person_selector(person_id: int, db: _orm.Session):
    person = (
        db.query(_models.Pessoa).filter(_models.Pessoa.id_pessoa == person_id).first()
    )

    if person is None:
        raise HTTPException(status_code=404, detail="Person does not exist")

    return person


async def get_person(person_id: str, db: _orm.Session):
    person = await _person_selector(person_id=person_id, db=db)
    return person


async def update_person(person_id: str, person: PersonRequest, db: _orm.Session):
    person_db = await _person_selector(person_id, db)

    try:
        person_db.nome = person.nome
        person_db.rg = person.rg
        person_db.cpf = person.cpf
        person_db.data_nascimento = person.data_nascimento
        person_db.data_admissao = person.data_admissao
        person_db.funcao = person.funcao

        db.commit()
        db.refresh(person_db)

        return person_db
    except Exception as ex:
        raise HTTPException(status_code=400, detail="Unable to update this item.")


async def delete_person(person_id: str, db: _orm.Session):
    person = await _person_selector(person_id, db)

    db.delete(person)
    db.commit()
