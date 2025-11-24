import psycopg2
import os

def testar_conexao_banco():
    """Testa se consegue conectar ao banco"""
    try:
        conn = psycopg2.connect(
            host="localhost",
            port="5433",
            database="meu_projeto_db",
            user="admin",
            password="admin_password"
        )
        print("✅ Conexão com banco: OK")
        return conn
    except Exception as e:
        print(f"❌ Erro conexão: {e}")
        return None

def testar_funcoes(conn):
    """Testa as funções principais"""
    try:
        cur = conn.cursor()
        
        # Testar função criar_diario
        cur.execute("SELECT criar_diario_compartilhado(1, 1, 'Teste', 'Conteúdo')")
        result = cur.fetchone()
        print(f"✅ Função criar_diario: OK (ID: {result[0]})")
        
        # Testar função listar_diarios
        cur.execute("SELECT listar_diarios_compartilhados()")
        results = cur.fetchall()
        print(f"✅ Função listar_diarios: OK ({len(results)} registros)")
        
        conn.commit()
        return True
        
    except Exception as e:
        print(f"❌ Erro nas funções: {e}")
        conn.rollback()
        return False

def verificar_tabelas(conn):
    """Verifica se todas as tabelas existem"""
    tabelas_necessarias = [
        'diariocompartilhado', 'midia', 'checklist', 
        'observacao', 'mensagem', 'paciente', 'terapeuta'
    ]
    
    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        """)
        tabelas_existentes = [row[0].lower() for row in cur.fetchall()]
        
        for tabela in tabelas_necessarias:
            if tabela in tabelas_existentes:
                print(f"✅ Tabela {tabela}: EXISTE")
            else:
                print(f"❌ Tabela {tabela}: FALTANDO")
                
    except Exception as e:
        print(f"❌ Erro verificação tabelas: {e}")

if __name__ == "__main__":
    print("🧪 INICIANDO TESTES DE PRODUÇÃO")
    
    conn = testar_conexao_banco()
    if conn:
        verificar_tabelas(conn)
        testar_funcoes(conn)
        conn.close()

