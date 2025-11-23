import psycopg2
import sys

def conectar_banco():
    return psycopg2.connect(
        host="localhost", port="5433",
        database="test_meu_projeto_db", 
        user="admin", password="admin_password"
    )

def visualizar_diarios():
    conn = conectar_banco()
    cur = conn.cursor()
    
    print("📓 DIÁRIOS CADASTRADOS")
    print("=" * 80)
    
    cur.execute("""
        SELECT 
            d.Id_Diario,
            p.Nome as Paciente,
            t.Nome as Terapeuta,
            d.Titulo,
            LEFT(d.Conteudo, 50) as Conteudo_Resumido,
            d.DataRegistro
        FROM DiarioCompartilhado d
        JOIN Paciente p ON d.Id_Paciente = p.Id_Paciente
        JOIN Terapeuta t ON d.Id_Terapeuta = t.Id_Terapeuta
        ORDER BY d.DataRegistro DESC
    """)
    
    diarios = cur.fetchall()
    
    for diario in diarios:
        print(f"ID: {diario[0]} | Paciente: {diario[1]} | Terapeuta: {diario[2]}")
        print(f"Título: {diario[3]}")
        print(f"Conteúdo: {diario[4]}...")
        print(f"Data: {diario[5]}")
        print("-" * 80)
    
    print(f"📊 Total de diários: {len(diarios)}")
    conn.close()

def visualizar_midias():
    conn = conectar_banco()
    cur = conn.cursor()
    
    print("\n📁 MÍDIAS CADASTRADAS")
    print("=" * 80)
    
    cur.execute("""
        SELECT 
            m.Id_Midia,
            m.Tipo,
            m.NomeArquivo,
            m.MimeType,
            m.DataUpload,
            d.Titulo as Diario_Titulo,
            length(m.Arquivo) as Tamanho_Bytes,
            CASE 
                WHEN m.Id_Diario IS NOT NULL THEN 'Diário'
                WHEN m.Id_Observacao IS NOT NULL THEN 'Observação'
                WHEN m.Id_Mensagem IS NOT NULL THEN 'Mensagem'
                ELSE 'Sem vínculo'
            END as Tipo_Vinculo
        FROM Midia m
        LEFT JOIN DiarioCompartilhado d ON m.Id_Diario = d.Id_Diario
        ORDER BY m.DataUpload DESC
    """)
    
    midias = cur.fetchall()
    
    for midia in midias:
        tamanho_kb = midia[6] / 1024 if midia[6] else 0
        print(f"ID: {midia[0]} | Tipo: {midia[1]} | Vínculo: {midia[7]}")
        print(f"Arquivo: {midia[2]} ({midia[3]})")
        print(f"Tamanho: {tamanho_kb:.1f} KB | Data: {midia[4]}")
        if midia[5]:
            print(f"Diário: {midia[5]}")
        print("-" * 80)
    
    print(f"📊 Total de mídias: {len(midias)}")
    conn.close()

def visualizar_estatisticas():
    conn = conectar_banco()
    cur = conn.cursor()
    
    print("\n📈 ESTATÍSTICAS DO SISTEMA")
    print("=" * 40)
    
    # Contar diários
    cur.execute("SELECT COUNT(*) FROM DiarioCompartilhado")
    total_diarios = cur.fetchone()[0]
    print(f"📓 Diários: {total_diarios}")
    
    # Contar mídias
    cur.execute("SELECT COUNT(*) FROM Midia")
    total_midias = cur.fetchone()[0]
    print(f"📁 Mídias: {total_midias}")
    
    # Contar por tipo de mídia
    cur.execute("SELECT Tipo, COUNT(*) FROM Midia GROUP BY Tipo")
    tipos_midia = cur.fetchall()
    for tipo, count in tipos_midia:
        print(f"   └─ {tipo}: {count}")
    
    # Tamanho total das mídias
    cur.execute("SELECT SUM(length(Arquivo)) FROM Midia")
    total_bytes = cur.fetchone()[0] or 0
    total_mb = total_bytes / (1024 * 1024)
    print(f"💾 Espaço usado: {total_mb:.2f} MB")
    
    conn.close()

def menu_principal():
    while True:
        print("\n🔍 VISUALIZADOR DE DADOS - SISTEMA DIÁRIO")
        print("=" * 50)
        print("1. 📓 Visualizar Diários")
        print("2. 📁 Visualizar Mídias") 
        print("3. 📈 Ver Estatísticas")
        print("4. 🚪 Sair")
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == "1":
            visualizar_diarios()
        elif opcao == "2":
            visualizar_midias()
        elif opcao == "3":
            visualizar_estatisticas()
        elif opcao == "4":
            print("👋 Saindo...")
            break
        else:
            print("❌ Opção inválida!")

if __name__ == "__main__":
    menu_principal()