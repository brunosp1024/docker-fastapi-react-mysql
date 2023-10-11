from api.person.services import services_person as _services
from api.database import database as _database
from fastapi import APIRouter, Query, status, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from api.person.schemas.schemas_person import PersonResponse, PersonRequest
from fastapi_pagination import Page, paginate


Page = Page.with_custom_options(
    size=Query(5, ge=1, le=100),
)

api = APIRouter()

@api.get("/api/pessoas", response_model=Page[PersonResponse])
async def get_persons(request: Request, db: Session = Depends(_database.get_db)):
    search = request.query_params.get('search')
    persons = await _services.get_persons(search, db=db)
    return paginate(persons)


@api.post("/api/pessoas", response_model=PersonResponse,  status_code=status.HTTP_201_CREATED)
async def create_person(person: PersonRequest, db: Session = Depends(_database.get_db)):
    db_person = await _services.get_person_by_name(person.nome, db)
    if db_person:
        raise HTTPException(
            status_code=400, detail="Name already in use")

    return await _services.create_person(person, db)


@api.get("/api/pessoas/{person_id}", status_code=200)
async def get_person(person_id: str, db: Session = Depends(_database.get_db)):
    return await _services.get_person(person_id, db)


@api.put("/api/pessoas/{person_id}", status_code=200)
async def update_person(
    person_id: str,
    person: PersonRequest,
    db: Session = Depends(_database.get_db),
):
    person_updated = await _services.update_person(person_id, person, db)
    return {"message": "Successfully Updated", "data": person_updated}


@api.delete("/api/pessoas/{person_id}", status_code=204)
async def delete_person(
    person_id: str,
    db: Session = Depends(_database.get_db),
):
    await _services.delete_person(person_id, db)
    return {"message": "Successfully Deleted"}
