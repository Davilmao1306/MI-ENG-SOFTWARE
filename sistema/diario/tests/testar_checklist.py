import psycopg2

def testar_checklist():
    try:
        conn = psycopg2.connect(
            host="localhost", port="5433",
            database="meu_projeto_db", 
            user="admin", password="admin_password"
        )
        cur = conn.cursor()
        
        print("🧪 TESTANDO SISTEMA DE CHECKLIST")
        print("=" * 50)
        
        # 1. Verificar dados existentes
        print("\n1. 📊 DADOS EXISTENTES:")
        cur.execute("""
            SELECT COUNT(*) as total, 'Diários' as tipo FROM DiarioCompartilhado 
            UNION ALL SELECT COUNT(*), 'Checklists' FROM Checklist 
            UNION ALL SELECT COUNT(*), 'Observações' FROM Observacao
            UNION ALL SELECT COUNT(*), 'Familiares' FROM Familiar
        """)
        for total, tipo in cur.fetchall():
            print(f"   📋 {tipo}: {total}")
        
        # 2. Buscar IDs que realmente existem
        print("\n2. 🔍 BUSCANDO IDs EXISTENTES...")
        
        # Buscar diários existentes
        cur.execute("SELECT Id_Diario, Titulo FROM DiarioCompartilhado ORDER BY Id_Diario LIMIT 1")
        diario = cur.fetchone()
        if not diario:
            print("   ❌ Nenhum diário encontrado. Criando um...")
            cur.execute("""
                INSERT INTO DiarioCompartilhado (Id_Paciente, Id_Terapeuta, Titulo, Conteudo) 
                VALUES (1, 1, 'Diário para Teste', 'Conteúdo de teste')
                RETURNING Id_Diario
            """)
            diario_id = cur.fetchone()[0]
            print(f"   ✅ Diário criado: ID {diario_id}")
        else:
            diario_id = diario[0]
            print(f"   ✅ Diário encontrado: ID {diario_id} - '{diario[1]}'")
        
        # Buscar terapeuta existente
        cur.execute("SELECT Id_Terapeuta, Nome FROM Terapeuta ORDER BY Id_Terapeuta LIMIT 1")
        terapeuta = cur.fetchone()
        if terapeuta:
            terapeuta_id = terapeuta[0]
            print(f"   ✅ Terapeuta encontrado: ID {terapeuta_id} - '{terapeuta[1]}'")
        else:
            print("   ❌ Nenhum terapeuta encontrado")
            return
        
        # Buscar familiar existente
        cur.execute("SELECT Id_Familiar, Nome FROM Familiar ORDER BY Id_Familiar LIMIT 1")
        familiar = cur.fetchone()
        if familiar:
            familiar_id = familiar[0]
            print(f"   ✅ Familiar encontrado: ID {familiar_id} - '{familiar[1]}'")
        else:
            print("   ❌ Nenhum familiar encontrado")
            return
        
        # 3. Criar checklist
        print("\n3. 📝 CRIANDO CHECKLIST...")
        cur.execute("""
            INSERT INTO Checklist (DataCriacao, Id_Terapeuta, Id_Diario) 
            VALUES (CURRENT_DATE, %s, %s)
            RETURNING Id_Checklist
        """, (terapeuta_id, diario_id))
        
        checklist = cur.fetchone()
        checklist_id = checklist[0] if checklist else None
        
        if checklist_id:
            print(f"   ✅ Checklist criado: ID {checklist_id}")
        else:
            print("   ❌ Falha ao criar checklist")
            return
        
        # 4. Criar observação
        print("\n4. 📋 CRIANDO OBSERVAÇÃO...")
        cur.execute("""
            INSERT INTO Observacao (Descricao_Observacao, Data_Envio, Id_Checklist, Id_Familiar) 
            VALUES ('Observação teste para saber se está funcionando', CURRENT_DATE, %s, %s)
            RETURNING Id_Observacao, Descricao_Observacao
        """, (checklist_id, familiar_id))
        
        observacao = cur.fetchone()
        if observacao:
            print(f"   ✅ Observação criada: ID {observacao[0]}")
            print(f"   📝 Descrição: '{observacao[1]}'")
        
        # 5. Verificar resultado final
        print("\n5. 📈 RESUMO FINAL:")
        cur.execute("""
            SELECT 
                c.Id_Checklist,
                c.DataCriacao,
                t.Nome as Terapeuta,
                d.Titulo as Diario,
                COUNT(o.Id_Observacao) as Observacoes
            FROM Checklist c
            JOIN Terapeuta t ON c.Id_Terapeuta = t.Id_Terapeuta
            JOIN DiarioCompartilhado d ON c.Id_Diario = d.Id_Diario
            LEFT JOIN Observacao o ON c.Id_Checklist = o.Id_Checklist
            WHERE c.Id_Checklist = %s
            GROUP BY c.Id_Checklist, t.Nome, d.Titulo
        """, (checklist_id,))
        
        for row in cur.fetchall():
            print(f"   📁 Checklist {row[0]}: {row[3]} (por {row[2]})")
            print(f"   📅 Data: {row[1]} | Observações: {row[4]}")
        
        # 6. Mostrar observações criadas
        print("\n6. 📋 OBSERVAÇÕES CRIADAS:")
        cur.execute("""
            SELECT 
                o.Id_Observacao,
                o.Descricao_Observacao,
                o.Data_Envio,
                f.Nome as Familiar
            FROM Observacao o
            JOIN Familiar f ON o.Id_Familiar = f.Id_Familiar
            WHERE o.Id_Checklist = %s
        """, (checklist_id,))
        
        for row in cur.fetchall():
            print(f"   📄 Observação {row[0]}: '{row[1]}'")
            print(f"   👤 Por: {row[3]} | Data: {row[2]}")
        
        conn.commit()
        conn.close()
        
        print("\n🎯 TESTE DE CHECKLIST CONCLUÍDO!")
        
    except Exception as e:
        print(f"❌ Erro: {e}")
        import traceback
        print(f"📜 Detalhes: {traceback.format_exc()}")

if __name__ == "__main__":
    testar_checklist()