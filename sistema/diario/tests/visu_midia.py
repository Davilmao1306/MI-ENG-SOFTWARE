import psycopg2
import base64
from PIL import Image
import io
import os

def conectar_banco():
    return psycopg2.connect(
        host="localhost", port="5433",
        database="test_meu_projeto_db", 
        user="admin", password="admin_password"
    )

def listar_midias():
    """Lista todas as mídias do banco"""
    conn = conectar_banco()
    cur = conn.cursor()
    
    cur.execute("""
        SELECT id_midia, tipo, nomearquivo, mimetype, dataupload, LENGTH(arquivo) as tamanho
        FROM midia 
        ORDER BY id_midia DESC
    """)
    
    midias = cur.fetchall()
    print("📁 MÍDIAS NO BANCO:")
    print("=" * 80)
    
    for midia in midias:
        print(f"ID: {midia[0]} | Tipo: {midia[1]} | Arquivo: {midia[2]}")
        print(f"    Mime: {midia[3]} | Tamanho: {midia[5]} bytes | Data: {midia[4]}")
        print("-" * 80)
    
    conn.close()
    return midias

def extrair_midia(id_midia, pasta_saida="midias_extraidas"):
    """Extrai uma mídia específica do banco"""
    if not os.path.exists(pasta_saida):
        os.makedirs(pasta_saida)
    
    conn = conectar_banco()
    cur = conn.cursor()
    
    cur.execute("""
        SELECT nomearquivo, mimetype, arquivo 
        FROM midia 
        WHERE id_midia = %s
    """, (id_midia,))
    
    resultado = cur.fetchone()
    
    if not resultado:
        print(f"❌ Mídia ID {id_midia} não encontrada")
        return
    
    nome_arquivo, mime_type, dados_binarios = resultado
    
    # Determinar extensão
    if not '.' in nome_arquivo:
        if 'image/jpeg' in mime_type:
            nome_arquivo += '.jpg'
        elif 'image/png' in mime_type:
            nome_arquivo += '.png'
        elif 'image/gif' in mime_type:
            nome_arquivo += '.gif'
        elif 'application/pdf' in mime_type:
            nome_arquivo += '.pdf'
    
    caminho_completo = os.path.join(pasta_saida, nome_arquivo)
    
    # Salvar arquivo
    with open(caminho_completo, 'wb') as f:
        f.write(dados_binarios)
    
    print(f"✅ Arquivo salvo: {caminho_completo}")
    print(f"   Tipo: {mime_type}")
    print(f"   Tamanho: {len(dados_binarios)} bytes")
    
    # Se for imagem, tentar abrir
    if mime_type.startswith('image/'):
        try:
            imagem = Image.open(caminho_completo)
            print(f"   Dimensões: {imagem.size}")
            imagem.show()  # Abre a imagem
        except Exception as e:
            print(f"   ⚠️  Não foi possível abrir a imagem: {e}")
    
    conn.close()
    return caminho_completo

def menu_visualizacao():
    """Menu interativo para visualizar mídias"""
    while True:
        print("\n🎨 VISUALIZADOR DE MÍDIAS")
        print("=" * 50)
        print("1. 📋 Listar todas as mídias")
        print("2. 🖼️  Extrair e visualizar uma mídia")
        print("3. 📂 Abrir pasta de mídias extraídas")
        print("4. 🚪 Sair")
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == "1":
            listar_midias()
            
        elif opcao == "2":
            try:
                id_midia = int(input("ID da mídia para extrair: "))
                extrair_midia(id_midia)
            except ValueError:
                print("❌ ID deve ser um número")
                
        elif opcao == "3":
            pasta = "midias_extraidas"
            if os.path.exists(pasta):
                os.system(f'explorer "{pasta}"')  # Windows
                # Para Linux: os.system(f'nautilus "{pasta}"')
                # Para Mac: os.system(f'open "{pasta}"')
            else:
                print("ℹ️  Ainda não há mídias extraídas")
                
        elif opcao == "4":
            print("👋 Saindo...")
            break
        else:
            print("❌ Opção inválida!")

if __name__ == "__main__":
    menu_visualizacao()