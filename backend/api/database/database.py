import os
import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm


DATABASE_URL = os.getenv('DATABASE_URL')
engine = _sql.create_engine(DATABASE_URL)
SessionLocal = _orm.sessionmaker(
    autocommit=False, autoflush=False, bind=engine)
Base = _declarative.declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
