import datetime as _dt

import pydantic as _pydantic


class PersonRequest(_pydantic.BaseModel):
    nome: str
    rg: str
    cpf: str
    data_nascimento: _dt.date
    data_admissao: _dt.date
    funcao: str | None


class PersonResponse(_pydantic.BaseModel):
    id_pessoa: int
    nome: str
    rg: str
    cpf: str
    data_nascimento: _dt.date
    data_admissao: _dt.date
    funcao: str | None
