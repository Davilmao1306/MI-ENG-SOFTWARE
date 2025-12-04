import os
import psycopg
from dotenv import load_dotenv
from contextlib import contextmanager # Importante!

load_dotenv()

@contextmanager
def get_conn():
    # Pega a URL do .env
    dsn = os.getenv('DATABASE_URL')
    
    if not dsn:
        raise ValueError("DATABASE_URL não definida no .env")

    conexao = None
    try:
        # Conecta ao banco
        conexao = psycopg.connect(dsn, autocommit=True)
        
        # O 'yield' entrega a conexão para o 'with' lá na view
        yield conexao 
        
    except psycopg.Error as e:
        print(f"Erro no banco de dados: {e}")
        raise e
    finally:
        # Garante que a conexão feche ao sair do 'with', mesmo se der erro
        if conexao:
            conexao.close()