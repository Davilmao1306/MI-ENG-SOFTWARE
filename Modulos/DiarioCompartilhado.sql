-- ==========================================
-- TABELA: DiarioCompartilhado
-- ==========================================
CREATE TABLE DiarioCompartilhado (
    Id_Diario SERIAL PRIMARY KEY,
    Id_Paciente INT NOT NULL,
    Id_Terapeuta INT NOT NULL,
    Titulo VARCHAR(255) NOT NULL,
    Conteudo TEXT NOT NULL,
    DataRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_Paciente) REFERENCES Paciente(Id_Paciente) ON DELETE CASCADE,
    FOREIGN KEY (Id_Terapeuta) REFERENCES Terapeuta(Id_Terapeuta) ON DELETE CASCADE
);

-- ==========================================
-- FUNÇÃO: criar_diario_compartilhado
-- Cadastra um novo diário e retorna o registro recém inserido
-- ==========================================
CREATE OR REPLACE FUNCTION criar_diario_compartilhado(
    p_id_paciente INT,
    p_id_terapeuta INT,
    p_titulo VARCHAR,
    p_conteudo TEXT
)
RETURNS TABLE (
    id_diario INT,
    id_paciente INT,
    id_terapeuta INT,
    titulo VARCHAR,
    conteudo TEXT,
    dataregistro TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    INSERT INTO DiarioCompartilhado (Id_Paciente, Id_Terapeuta, Titulo, Conteudo)
    VALUES (p_id_paciente, p_id_terapeuta, p_titulo, p_conteudo)
    RETURNING Id_Diario, Id_Paciente, Id_Terapeuta, Titulo, Conteudo, DataRegistro;
END;
$$ LANGUAGE plpgsql;


-- ==========================================
-- FUNÇÃO: listar_diarios_compartilhados
-- Lista todos os diários registrados no sistema
-- ==========================================
CREATE OR REPLACE FUNCTION listar_diarios_compartilhados()
RETURNS TABLE (
    id_diario INT,
    id_paciente INT,
    id_terapeuta INT,
    titulo VARCHAR,
    conteudo TEXT,
    dataregistro TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT Id_Diario, Id_Paciente, Id_Terapeuta, Titulo, Conteudo, DataRegistro
    FROM DiarioCompartilhado
    ORDER BY DataRegistro DESC;
END;
$$ LANGUAGE plpgsql;


-- ==========================================
-- FUNÇÃO: listar_diarios_por_terapeuta
-- Retorna os diários de um terapeuta específico
-- ==========================================
CREATE OR REPLACE FUNCTION listar_diarios_por_terapeuta(p_id_terapeuta INT)
RETURNS TABLE (
    id_diario INT,
    id_paciente INT,
    titulo VARCHAR,
    conteudo TEXT,
    dataregistro TIMESTAMP
)
AS $$
BEGIN
    IF p_id_terapeuta IS NULL THEN
        RAISE EXCEPTION 'Id do terapeuta é obrigatório';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM Terapeuta WHERE Id_Terapeuta = p_id_terapeuta) THEN
        RAISE EXCEPTION 'Terapeuta % não existe', p_id_terapeuta;
    END IF;

    RETURN QUERY
    SELECT Id_Diario, Id_Paciente, Titulo, Conteudo, DataRegistro
    FROM DiarioCompartilhado
    WHERE Id_Terapeuta = p_id_terapeuta
    ORDER BY DataRegistro DESC;
END;
$$ LANGUAGE plpgsql;


-- ==========================================
-- FUNÇÃO: listar_diarios_por_paciente
-- Retorna os diários de um paciente específico
-- ==========================================
CREATE OR REPLACE FUNCTION listar_diarios_por_paciente(p_id_paciente INT)
RETURNS TABLE (
    id_diario INT,
    id_terapeuta INT,
    titulo VARCHAR,
    conteudo TEXT,
    dataregistro TIMESTAMP
)
AS $$
BEGIN
    IF p_id_paciente IS NULL THEN
        RAISE EXCEPTION 'Id do paciente é obrigatório';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM Paciente WHERE Id_Paciente = p_id_paciente) THEN
        RAISE EXCEPTION 'Paciente % não existe', p_id_paciente;
    END IF;

    RETURN QUERY
    SELECT Id_Diario, Id_Terapeuta, Titulo, Conteudo, DataRegistro
    FROM DiarioCompartilhado
    WHERE Id_Paciente = p_id_paciente
    ORDER BY DataRegistro DESC;
END;
$$ LANGUAGE plpgsql;



-- ==========================================
-- FUNÇÃO: buscar_diario_por_id
-- Busca um diário específico pelo ID
-- ==========================================
CREATE OR REPLACE FUNCTION buscar_diario_por_id(p_id_diario INT)
RETURNS TABLE (
    id_diario INT,
    id_paciente INT,
    id_terapeuta INT,
    titulo VARCHAR,
    conteudo TEXT,
    dataregistro TIMESTAMP
)
AS $$
BEGIN
    IF p_id_diario IS NULL THEN
        RAISE EXCEPTION 'Id do diário é obrigatório';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM DiarioCompartilhado WHERE Id_Diario = p_id_diario) THEN
        RAISE EXCEPTION 'Diário % não existe', p_id_diario;
    END IF;

    RETURN QUERY
    SELECT Id_Diario, Id_Paciente, Id_Terapeuta, Titulo, Conteudo, DataRegistro
    FROM DiarioCompartilhado
    WHERE Id_Diario = p_id_diario;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- FUNÇÃO: atualizar_diario_compartilhado
-- Atualiza o título e/ou conteúdo de um diário
-- ==========================================
CREATE OR REPLACE FUNCTION atualizar_diario_compartilhado(
    p_id_diario INT,
    p_titulo VARCHAR,
    p_conteudo TEXT
)
RETURNS TABLE (
    id_diario INT,
    titulo VARCHAR,
    conteudo TEXT,
    dataregistro TIMESTAMP
)
AS $$
BEGIN
    IF p_id_diario IS NULL THEN
        RAISE EXCEPTION 'Id do diário é obrigatório';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM DiarioCompartilhado WHERE Id_Diario = p_id_diario) THEN
        RAISE EXCEPTION 'Diário % não existe', p_id_diario;
    END IF;

    -- impede atualização vazia
    IF p_titulo IS NULL AND p_conteudo IS NULL THEN
        RAISE EXCEPTION 'Nada para atualizar: informe título e/ou conteúdo';
    END IF;

    RETURN QUERY
    UPDATE DiarioCompartilhado
    SET 
        Titulo = COALESCE(p_titulo, Titulo),
        Conteudo = COALESCE(p_conteudo, Conteudo),
        DataRegistro = CURRENT_TIMESTAMP
    WHERE Id_Diario = p_id_diario
    RETURNING Id_Diario, Titulo, Conteudo, DataRegistro;
END;
$$ LANGUAGE plpgsql;


-- ==========================================
-- FUNÇÃO: excluir_diario_compartilhado
-- Remove um diário pelo ID e retorna o registro excluído
-- ==========================================
CREATE OR REPLACE FUNCTION excluir_diario_compartilhado(p_id_diario INT)
RETURNS TABLE (
    id_diario INT,
    id_paciente INT,
    id_terapeuta INT,
    titulo VARCHAR,
    conteudo TEXT,
    dataregistro TIMESTAMP
)
AS $$
BEGIN
    IF p_id_diario IS NULL THEN
        RAISE EXCEPTION 'Id do diário é obrigatório';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM DiarioCompartilhado WHERE Id_Diario = p_id_diario) THEN
        RAISE EXCEPTION 'Diário % não existe', p_id_diario;
    END IF;

    RETURN QUERY
    DELETE FROM DiarioCompartilhado
    WHERE Id_Diario = p_id_diario
    RETURNING Id_Diario, Id_Paciente, Id_Terapeuta, Titulo, Conteudo, DataRegistro;
END;
$$ LANGUAGE plpgsql;
-- Table checklist
CREATE TABLE checklist(
  Id_Checklist INT GENERATED ALWAYS AS IDENTITY,
  DataCriacao DATE NOT NULL,
  Id_Terapeuta INT NOT NULL,
  Id_Diario INT NOT NULL,
  CONSTRAINT checklist_pk PRIMARY KEY (Id_Checklist),
  CONSTRAINT fk_checklist_terapeuta FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta),
  CONSTRAINT fk_checklist_diario FOREIGN KEY (Id_Diario) REFERENCES diariocompartilhado(Id_Diario)
);

-- Table observacao
CREATE TABLE observacao(
  Id_Observacao INT GENERATED ALWAYS AS IDENTITY,
  Descricao_Observacao VARCHAR(255) NOT NULL,
  Data_Envio DATE NOT NULL,
  Data_Edicao DATE,
  Id_Checklist INT NOT NULL,
  Id_Familiar INT NOT NULL,
  CONSTRAINT observacao_pk PRIMARY KEY (Id_Observacao),
  CONSTRAINT fk_observacao_checklist FOREIGN KEY (Id_Checklist) REFERENCES checklist(Id_Checklist),
  CONSTRAINT fk_observacao_familiar FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar)
);

-- Table mensagem
CREATE TABLE mensagem(
  Id_Mensagem INT GENERATED ALWAYS AS IDENTITY,
  Descricao_Mensagem VARCHAR(500) NOT NULL,
  Data_Envio DATE NOT NULL,
  Data_Edicao DATE,
  Id_Diario INT,
  Id_Familiar INT,
  Id_Terapeuta INT,
  CONSTRAINT mensagem_pk PRIMARY KEY (Id_Mensagem),
  CONSTRAINT fk_msg_diario FOREIGN KEY (Id_Diario) REFERENCES diariocompartilhado(Id_Diario),
  CONSTRAINT fk_msg_familiar FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar),
  CONSTRAINT fk_msg_terapeuta FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta)
);

-- Table diario terapeuta 
CREATE TABLE diarioterapeuta(
  Id_Diario INT NOT NULL, 
  Id_Terapeuta INT NOT NULL,
  CONSTRAINT diarioterapeuta_pk PRIMARY KEY (Id_Terapeuta, Id_Diario),
  CONSTRAINT fk_dt_diario FOREIGN KEY (Id_Diario) REFERENCES diariocompartilhado(Id_Diario),
  CONSTRAINT fk_dt_terapeuta FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta)
);

-- Table diario familiar
CREATE TABLE diariofamiliar(
  Id_Diario INT NOT NULL, 
  Id_Familiar INT NOT NULL,
  CONSTRAINT diariofamiliar_pk PRIMARY KEY (Id_Familiar, Id_Diario),
  CONSTRAINT fk_df_diario FOREIGN KEY (Id_Diario) REFERENCES diariocompartilhado(Id_Diario),
  CONSTRAINT fk_df_familiar FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar)
);
