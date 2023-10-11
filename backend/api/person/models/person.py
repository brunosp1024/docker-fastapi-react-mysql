# import uuid
import sqlalchemy as _sql

from api.database import database as _database


class Pessoa(_database.Base):
    __tablename__ = "pessoas"

    id_pessoa = _sql.Column(_sql.Integer, primary_key=True, index=True, autoincrement=True)
    nome = _sql.Column(_sql.String(100), unique=True, index=True)
    rg = _sql.Column(_sql.String(100), unique=True, index=True)
    cpf = _sql.Column(_sql.String(100), unique=True, index=True)
    data_nascimento = _sql.Column(_sql.Date)
    data_admissao = _sql.Column(_sql.Date)
    funcao = _sql.Column(_sql.String(100), nullable=True, default='---')


