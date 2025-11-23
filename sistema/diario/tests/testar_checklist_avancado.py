import psycopg2

def testar_checklist_avancado():
    try:
        conn = psycopg2.connect(
            host="localhost", port="5433",
            database="meu_projeto_db", 
            user="admin", password="admin_password"
        )
        cur = conn.cursor()
        
        print("🧪 TESTES AVANÇADOS DE CHECKLIST")
        print("=" * 60)
        
        # Teste 1: Múltiplas observações
        print("\n1. 📋 TESTE: MÚLTIPLAS OBSERVAÇÕES")
        cur.execute("""
            INSERT INTO Checklist (DataCriacao, Id_Terapeuta, Id_Diario) 
            VALUES (CURRENT_DATE, 1, 2)
            RETURNING Id_Checklist
        """)
        checklist_id = cur.fetchone()[0]
        
        # Adicionar 3 observações
        observacoes = [
            "Observação sobre comportamento do paciente",
            "Observação sobre rotina diária", 
            "Observação sobre interação social"
        ]
        
        for i, descricao in enumerate(observacoes, 1):
            cur.execute("""
                INSERT INTO Observacao (Descricao_Observacao, Data_Envio, Id_Checklist, Id_Familiar) 
                VALUES (%s, CURRENT_DATE, %s, %s)
                RETURNING Id_Observacao
            """, (descricao, checklist_id, 1 if i % 2 == 1 else 2))
            obs_id = cur.fetchone()[0]
            print(f"   ✅ Observação {i} criada: ID {obs_id}")
        
        # Teste 2: Mídias nas observações
        print("\n2. 📁 TESTE: MÍDIAS NAS OBSERVAÇÕES")
        cur.execute("SELECT Id_Observacao FROM Observacao WHERE Id_Checklist = %s", (checklist_id,))
        observacao_ids = [row[0] for row in cur.fetchall()]
        
        for i, obs_id in enumerate(observacao_ids, 1):
            cur.execute("""
                SELECT adicionar_midia(
                    %s, %s, %s, %s, NULL, %s, NULL
                )
            """, (
                'foto' if i % 2 == 1 else 'documento',
                f'\\x6d696469615f7465737465{i}'.encode(),
                f'arquivo_{i}.{"jpg" if i % 2 == 1 else "pdf"}',
                'image/jpeg' if i % 2 == 1 else 'application/pdf',
                obs_id
            ))
            midia_id = cur.fetchone()[0][0]
            print(f"   ✅ Mídia {i} criada na observação {obs_id}: ID {midia_id}")
        
        # Teste 3: Consultas complexas
        print("\n3. 📊 TESTE: CONSULTAS COMPLEXAS")
        
        # Checklist com estatísticas
        cur.execute("""
            SELECT 
                c.Id_Checklist,
                c.DataCriacao,
                t.Nome as Terapeuta,
                d.Titulo as Diario,
                COUNT(DISTINCT o.Id_Observacao) as Observacoes,
                COUNT(DISTINCT m.Id_Midia) as Midias,
                COUNT(DISTINCT f.Id_Familiar) as Familiares_Envolvidos
            FROM Checklist c
            JOIN Terapeuta t ON c.Id_Terapeuta = t.Id_Terapeuta
            JOIN DiarioCompartilhado d ON c.Id_Diario = d.Id_Diario
            LEFT JOIN Observacao o ON c.Id_Checklist = o.Id_Checklist
            LEFT JOIN Midia m ON o.Id_Observacao = m.Id_Observacao
            LEFT JOIN Familiar f ON o.Id_Familiar = f.Id_Familiar
            WHERE c.Id_Checklist = %s
            GROUP BY c.Id_Checklist, t.Nome, d.Titulo
        """, (checklist_id,))
        
        resultado = cur.fetchone()
        print(f"   📈 Checklist {resultado[0]}:")
        print(f"      📅 Data: {resultado[1]}")
        print(f"      👨‍⚕️ Terapeuta: {resultado[2]}")
        print(f"      📓 Diário: {resultado[3]}")
        print(f"      📋 Observações: {resultado[4]}")
        print(f"      📁 Mídias: {resultado[5]}")
        print(f"      👥 Familiares: {resultado[6]}")
        
        conn.commit()
        conn.close()
        
        print("\n🎯 TESTES AVANÇADOS CONCLUÍDOS!")
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        import traceback
        print(f"📜 Detalhes: {traceback.format_exc()}")

if __name__ == "__main__":
    testar_checklist_avancado()