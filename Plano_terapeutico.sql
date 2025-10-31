-- Função: criar_plano_terapeutico
-- Cria um novo plano terapêutico para um paciente.
-- Parâmetros:
--   p_id_paciente → ID do paciente
--   p_id_terapeuta → ID do terapeuta
--   p_objetivos_gerais → texto descritivo dos objetivos
--   p_observacoes → observações adicionais (opcional)
-- Uso:
--   SELECT criar_plano_terapeutico(1, 2, 'Melhorar comunicação', 'Paciente apresenta bom engajamento');
CREATE OR REPLACE FUNCTION criar_plano_terapeutico(
    p_id_paciente INT,
    p_id_terapeuta INT,
    p_objetivos_gerais TEXT,
    p_observacoes TEXT DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
    v_id_plano INT;
BEGIN
    INSERT INTO plano_terapeutico (Id_Paciente, Id_Terapeuta, Data_Inicio, Objetivos_Gerais, Observacoes)
    VALUES (p_id_paciente, p_id_terapeuta, CURRENT_DATE, p_objetivos_gerais, p_observacoes)
    RETURNING Id_Plano_Terapeutico INTO v_id_plano;

    RETURN v_id_plano;
END;
$$ LANGUAGE plpgsql;

-- Função: adicionar_atividade
-- Adiciona uma atividade a um plano terapêutico existente.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico
--   p_descricao → descrição da atividade
--   p_frequencia → frequência da atividade (ex: "3x por semana")
--   p_duracao → duração em minutos
-- Uso:
--   SELECT adicionar_atividade(1, 'Treino de fala', '2x por semana', 45);
CREATE OR REPLACE FUNCTION adicionar_atividade(
    p_id_plano INT,
    p_descricao TEXT,
    p_frequencia VARCHAR,
    p_duracao INT
)
RETURNS TEXT AS $$
BEGIN
    INSERT INTO atividade_terapeutica (Id_Plano_Terapeutico, Descricao, Frequencia, Duracao)
    VALUES (p_id_plano, p_descricao, p_frequencia, p_duracao);

    RETURN 'Atividade adicionada com sucesso.';
END;
$$ LANGUAGE plpgsql;

-- Função: atualizar_progresso_atividade
-- Atualiza o progresso de uma atividade específica.
-- Parâmetros:
--   p_id_atividade → ID da atividade
--   p_progresso → novo valor de progresso (0–100)
-- Validações:
--   Garante que o progresso esteja dentro do intervalo permitido
-- Uso:
--   SELECT atualizar_progresso_atividade(1, 75);
CREATE OR REPLACE FUNCTION atualizar_progresso_atividade(
    p_id_atividade INT,
    p_progresso INT
)
RETURNS TEXT AS $$
BEGIN
    IF p_progresso < 0 OR p_progresso > 100 THEN
        RETURN 'Erro: O progresso deve estar entre 0 e 100.';
    END IF;

    UPDATE atividade_terapeutica
    SET Progresso = p_progresso
    WHERE Id_Atividade = p_id_atividade;

    RETURN 'Progresso atualizado com sucesso.';
END;
$$ LANGUAGE plpgsql;

-- Função: encerrar_plano_terapeutico
-- Marca um plano como concluído, definindo a data de fim.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico
-- Uso:
--   SELECT encerrar_plano_terapeutico(1);
CREATE OR REPLACE FUNCTION encerrar_plano_terapeutico(
    p_id_plano INT
)
RETURNS TEXT AS $$
BEGIN
    UPDATE plano_terapeutico
    SET Data_Fim = CURRENT_DATE
    WHERE Id_Plano_Terapeutico = p_id_plano AND Data_Fim IS NULL;

    RETURN 'Plano terapêutico encerrado.';
END;
$$ LANGUAGE plpgsql;
