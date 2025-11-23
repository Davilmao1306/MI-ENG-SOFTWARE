import requests
import os
import mimetypes

BASE_URL = "http://localhost:8000/api"

def detectar_tipo_arquivo(caminho_arquivo):
    """Detecta o tipo de arquivo baseado na extensão e mime type"""
    nome_arquivo = os.path.basename(caminho_arquivo)
    extensao = os.path.splitext(nome_arquivo)[1].lower()
    
    # Mapeamento de extensões para tipos do sistema
    extensoes_imagem = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
    extensoes_video = ['.mp4', '.avi', '.mov', '.mkv', '.webm']
    extensoes_documento = ['.pdf', '.doc', '.docx', '.txt', '.rtf']
    
    if extensao in extensoes_imagem:
        return 'foto'
    elif extensao in extensoes_video:
        return 'video'
    elif extensao in extensoes_documento:
        return 'documento'
    else:
        return 'documento'  # padrão para outros tipos

def fazer_upload(caminho_arquivo, id_diario=12):
    """Faz upload de um arquivo real para o banco"""
    
    if not os.path.exists(caminho_arquivo):
        print(f"❌ Arquivo não encontrado: {caminho_arquivo}")
        return False
    
    # Detectar tipo automaticamente
    tipo = detectar_tipo_arquivo(caminho_arquivo)
    nome_arquivo = os.path.basename(caminho_arquivo)
    tamanho = os.path.getsize(caminho_arquivo)
    
    print(f"📤 Preparando upload:")
    print(f"   Arquivo: {caminho_arquivo}")
    print(f"   Nome: {nome_arquivo}")
    print(f"   Tipo detectado: {tipo}")
    print(f"   Tamanho: {tamanho} bytes ({tamanho/1024:.1f} KB)")
    print(f"   Diário ID: {id_diario}")
    
    try:
        with open(caminho_arquivo, 'rb') as arquivo:
            # Detectar mime type real
            mime_type, _ = mimetypes.guess_type(caminho_arquivo)
            
            files = {'arquivo': (nome_arquivo, arquivo, mime_type or 'application/octet-stream')}
            data = {
                'tipo': tipo,
                'id_diario': id_diario,
                'nomearquivo': nome_arquivo,
                'mimetype': mime_type or 'application/octet-stream'
            }
            
            print(f"🔼 Enviando para o servidor...")
            response = requests.post(f"{BASE_URL}/midia/adicionar", files=files, data=data)
            
            print(f"📊 Status: {response.status_code}")
            
            if response.status_code == 201:
                resultado = response.json()
                print(f"✅ UPLOAD BEM-SUCEDIDO!")
                print(f"   ID da mídia: {resultado.get('id_midia')}")
                print(f"   Tipo: {resultado.get('tipo')}")
                print(f"   Nome: {resultado.get('nomearquivo')}")
                print(f"   MimeType: {resultado.get('mimetype')}")
                print(f"   Data: {resultado.get('dataupload')}")
                return True
            else:
                print(f"❌ ERRO NO UPLOAD: {response.text}")
                return False
                
    except Exception as e:
        print(f"💥 ERRO: {e}")
        return False

def menu_upload():
    """Menu interativo para upload de arquivos"""
    while True:
        print("\n🚀 UPLOAD DE ARQUIVOS REAIS")
        print("=" * 50)
        print("1. 📤 Fazer upload de um arquivo")
        print("2. 📁 Ver mídias no banco")
        print("3. 🚪 Sair")
        
        opcao = input("\nEscolha uma opção: ").strip()
        
        if opcao == "1":
            caminho = input("Digite o caminho completo do arquivo: ").strip()
            
            # Expandir ~ para home directory se usado
            if caminho.startswith('~'):
                caminho = os.path.expanduser(caminho)
            
            id_diario = input("ID do diário (padrão 12): ").strip()
            id_diario = int(id_diario) if id_diario else 12
            
            fazer_upload(caminho, id_diario)
            
        elif opcao == "2":
            verificar_midias()
            
        elif opcao == "3":
            print("👋 Saindo...")
            break
        else:
            print("❌ Opção inválida!")

def verificar_midias():
    """Verifica as mídias no banco"""
    try:
        print(f"\n🔍 Verificando mídias no banco...")
        response = requests.get(f"{BASE_URL}/diario/12/midias")
        
        if response.status_code == 200:
            midias = response.json()
            print(f"📁 Total de mídias: {len(midias)}")
            
            for midia in midias:
                tamanho_base64 = len(midia.get('arquivo_base64', ''))
                tamanho_aproximado = (tamanho_base64 * 3) / 4  # Aproximação do tamanho real
                print(f"   ├─ ID: {midia.get('id_midia')}")
                print(f"   ├─ Tipo: {midia.get('tipo')}")
                print(f"   ├─ Arquivo: {midia.get('nomearquivo')}")
                print(f"   ├─ MimeType: {midia.get('mimetype')}")
                print(f"   └─ Tamanho: ~{tamanho_aproximado:.0f} bytes")
                print(f"   └─ Data: {midia.get('dataupload')}")
                print("   " + "-" * 40)
                
        else:
            print(f"❌ Erro ao buscar mídias: {response.text}")
            
    except Exception as e:
        print(f"💥 Erro na verificação: {e}")

def upload_multiplos_arquivos():
    """Faz upload de múltiplos arquivos de uma vez"""
    print("\n📦 UPLOAD EM LOTE")
    print("=" * 40)
    
    arquivos = input("Digite os caminhos dos arquivos (separados por vírgula): ").strip()
    lista_arquivos = [arq.strip() for arq in arquivos.split(',')]
    id_diario = input("ID do diário (padrão 12): ").strip()
    id_diario = int(id_diario) if id_diario else 12
    
    sucessos = 0
    for caminho in lista_arquivos:
        if caminho.startswith('~'):
            caminho = os.path.expanduser(caminho)
        
        if fazer_upload(caminho, id_diario):
            sucessos += 1
        print("\n" + "=" * 50)
    
    print(f"🎯 Resultado: {sucessos}/{len(lista_arquivos)} uploads bem-sucedidos")

if __name__ == "__main__":
    print("🎬 SISTEMA DE UPLOAD DE ARQUIVOS REAIS")
    print("=" * 50)
    
    # Verificar se servidor está rodando
    try:
        response = requests.get(f"{BASE_URL}/diario/listar", timeout=5)
        if response.status_code == 200:
            print("✅ Servidor Django está rodando!")
        else:
            print("⚠️  Servidor pode não estar respondendo corretamente")
    except:
        print("❌ Servidor Django não está acessível!")
        print("💡 Execute: python manage.py runserver")
        exit(1)
    
    while True:
        print("\n🔧 MODOS DE UPLOAD:")
        print("1. 🖼️  Upload interativo (menu)")
        print("2. 📦 Upload em lote (vários arquivos)")
        print("3. 🚪 Sair")
        
        modo = input("\nEscolha o modo: ").strip()
        
        if modo == "1":
            menu_upload()
        elif modo == "2":
            upload_multiplos_arquivos()
        elif modo == "3":
            print("👋 Até mais!")
            break
        else:
            print("❌ Opção inválida!")