import os
import psycopg
from contextlib import contextmanager

@contextmanager 

def get_conn():
    """
    Conexão simples (uma por requisição).
    """
    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", "5433")
    db   = os.getenv("POSTGRES_DB",   "app")
    user = os.getenv("POSTGRES_USER", "postgres")
    pwd  = os.getenv("POSTGRES_PASSWORD", "postgres")

    dsn = f"host={host} port={port} dbname={db} user={user} password={pwd}"
    conexao=psycopg.connect(dsn, autocommit=True)
    yield conexao 
    conexao.close()