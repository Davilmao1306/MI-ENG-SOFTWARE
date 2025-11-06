import os
import psycopg
from contextlib import contextmanager

@contextmanager 

def get_conn():
    """
    Conexão simples (uma por requisição).
    Se quiser performance maior, depois troque para psycopg_pool.
    """
    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", "5432")
    db   = os.getenv("POSTGRES_DB",   "meu_projeto_db")
    user = os.getenv("POSTGRES_USER", "admin")
    pwd  = os.getenv("POSTGRES_PASSWORD", "admin_password")

    dsn = f"host={host} port={port} dbname={db} user={user} password={pwd}"
    conexao=psycopg.connect(dsn, autocommit=True)
    yield conexao 
    conexao.close()

    


