from fastapi import FastAPI

from fastapi_pagination import add_pagination
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from api.person.routers.routers_person import api as api_person


app = FastAPI(docs_url="/api/docs")
add_pagination(app)

app.include_router(api_person)

origins = [
    "localhost:3000",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.get("/")
async def main():
    return RedirectResponse(url="/api",)

@app.get("/api", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to api."}
