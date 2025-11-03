-- ====================================Tabelas=====================================
-- Table usuario
CREATE TABLE usuario(
  Id_Usuario INT GENERATED ALWAYS AS IDENTITY,
  Email VARCHAR(255) NOT NULL UNIQUE,
  Senha VARCHAR(255) NOT NULL,
  ConsentimentoLGDP BOOLEAN NOT NULL,
  CONSTRAINT usuario_pk PRIMARY KEY (Id_Usuario)
);

-- Table clinica
CREATE TABLE clinica(
  Id_Clinica INT GENERATED ALWAYS AS IDENTITY,
  CNPJ VARCHAR(14) NOT NULL UNIQUE,
  Senha VARCHAR(255) NOT NULL,
  ConsentimentoLGDP BOOLEAN NOT NULL,
  Id_Usuario INT NOT NULL,
  CONSTRAINT clinica_pk PRIMARY KEY (Id_Clinica),
  CONSTRAINT fk_clinica_usuario FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
);

-- Table paciente
CREATE TABLE paciente(
  Id_Paciente INT GENERATED ALWAYS AS IDENTITY,
  Nome VARCHAR(255) NOT NULL,
  Data_Nascimento DATE NOT NULL,
  CPF VARCHAR(11) NOT NULL UNIQUE,
  CONSTRAINT paciente_pk PRIMARY KEY (Id_Paciente)
);

-- Table familiar
CREATE TABLE familiar(
  Id_Familiar INT GENERATED ALWAYS AS IDENTITY,
  Nome VARCHAR(255) NOT NULL,
  DataNascimento DATE NOT NULL,
  Telefone VARCHAR(12) NOT NULL,
  CPF VARCHAR(11) NOT NULL UNIQUE,
  Id_Usuario INT NOT NULL,
  CONSTRAINT familiar_pk PRIMARY KEY (Id_Familiar),
  CONSTRAINT fk_familiar_usuario FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
);

-- Table terapeuta
CREATE TABLE terapeuta(
  Id_Terapeuta INT GENERATED ALWAYS AS IDENTITY,
  Nome VARCHAR(255) NOT NULL,
  DataNascimento DATE NOT NULL,
  Telefone VARCHAR(12) NOT NULL,
  CRP VARCHAR(7) NOT NULL UNIQUE,
  Especialidade VARCHAR(255) NOT NULL,
  Id_Usuario INT NOT NULL,
  CONSTRAINT terapeuta_pk PRIMARY KEY (Id_Terapeuta),
  CONSTRAINT fk_terapeuta_usuario FOREIGN KEY (Id_Usuario) REFERENCES usuario(Id_Usuario)
);

-- Table Diario Compartilhado
CREATE TABLE diariocompartilhado(
  Id_Diario INT GENERATED ALWAYS AS IDENTITY,
  DataCriacao DATE NOT NULL,
  Imagens BYTEA,
  Link VARCHAR(255),
  Id_Paciente INT NOT NULL,
  CONSTRAINT diariocompartilhado_pk PRIMARY KEY (Id_Diario),
  CONSTRAINT fk_diario_paciente FOREIGN KEY (Id_Paciente) REFERENCES paciente(Id_Paciente)
);

-- Table Plano Terapeuta
CREATE TABLE planoterapeuta(
  Id_Plano INT GENERATED ALWAYS AS IDENTITY,
  DataCriacao DATE NOT NULL,
  Link VARCHAR(255),
  Arquivo BYTEA,
  DataModificacao DATE,
  Descricao_plano VARCHAR(255),
  Status BOOLEAN NOT NULL,
  Id_Paciente INT NOT NULL,
  Id_Terapeuta INT NOT NULL,
  CONSTRAINT planoterapeuta_pk PRIMARY KEY (Id_Plano),
  CONSTRAINT fk_plano_paciente FOREIGN KEY (Id_Paciente) REFERENCES paciente(Id_Paciente),
  CONSTRAINT fk_plano_terapeuta FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta)
);

-- Table consulta
CREATE TABLE consulta(
  Id_Sessao INT GENERATED ALWAYS AS IDENTITY,
  DataSessao DATE NOT NULL,
  Descricao_sessao VARCHAR(255) NOT NULL,
  Id_Paciente INT NOT NULL,
  Id_Terapeuta INT NOT NULL,
  Id_Plano INT NOT NULL,
  CONSTRAINT consulta_pk PRIMARY KEY (Id_Sessao),
  CONSTRAINT fk_consulta_paciente FOREIGN KEY (Id_Paciente) REFERENCES paciente(Id_Paciente),
  CONSTRAINT fk_consulta_plano FOREIGN KEY (Id_Plano) REFERENCES planoterapeuta(Id_Plano),
  CONSTRAINT fk_consulta_terapeuta FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta)
);

-- Table feedback
CREATE TABLE feedback(
  Id_Feedback INT GENERATED ALWAYS AS IDENTITY,
  DescricaoFeedback VARCHAR(255) NOT NULL,
  RespostaTerapeuta VARCHAR(255),
  DataEnvio DATE NOT NULL,
  Id_Plano INT NOT NULL,
  Id_Familiar INT NOT NULL,
  CONSTRAINT feedback_pk PRIMARY KEY (Id_Feedback),
  CONSTRAINT fk_feedback_plano FOREIGN KEY (Id_Plano) REFERENCES planoterapeuta(Id_Plano),
  CONSTRAINT fk_feedback_familiar FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar)
);

-- Table historico plano terapeuta
CREATE TABLE historicoplanoterapeuta(
  Id_Historico INT GENERATED ALWAYS AS IDENTITY,
  DataFim DATE NOT NULL,
  Id_Plano INT NOT NULL,
  CONSTRAINT historicoplano_pk PRIMARY KEY (Id_Historico),
  CONSTRAINT fk_historico_plano FOREIGN KEY (Id_Plano) REFERENCES planoterapeuta(Id_Plano)
);

-- Table neurodivergencia
CREATE TABLE neurodivergencia(
  Id_Neurodivergencia INT GENERATED ALWAYS AS IDENTITY,
  Tipo VARCHAR(255) NOT NULL,
  Grau INT NOT NULL,
  Id_Paciente INT NOT NULL,
  CONSTRAINT neurodivergencia_pk PRIMARY KEY (Id_Neurodivergencia),
  CONSTRAINT fk_neuro_paciente FOREIGN KEY (Id_Paciente) REFERENCES paciente(Id_Paciente)
);

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

-- Table relatorio
CREATE TABLE relatorio(
  Id_Relatorio INT GENERATED ALWAYS AS IDENTITY,
  Arquivo BYTEA,
  Id_Paciente INT NOT NULL,
  Id_Terapeuta INT,
  Id_Familiar INT,
  CONSTRAINT relatorio_pk PRIMARY KEY (Id_Relatorio),
  CONSTRAINT fk_relatorio_paciente FOREIGN KEY (Id_Paciente) REFERENCES paciente(Id_Paciente),
  CONSTRAINT fk_relatorio_familiar FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar),
  CONSTRAINT fk_relatorio_terapeuta FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta)
);

-- Table pacientefamiliar
CREATE TABLE pacientefamiliar(
  Id_Familiar INT NOT NULL,
  Id_Paciente INT NOT NULL,
  CONSTRAINT pacientefamiliar_pk PRIMARY KEY (Id_Familiar, Id_Paciente),
  CONSTRAINT fk_pf_paciente FOREIGN KEY (Id_Paciente) REFERENCES paciente(Id_Paciente),
  CONSTRAINT fk_pf_familiar FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar)
);

-- Table pacienteterapeuta
CREATE TABLE pacienteterapeuta(
  Id_Paciente INT NOT NULL,
  Id_Terapeuta INT NOT NULL,
  CONSTRAINT pacienteterapeuta_pk PRIMARY KEY (Id_Terapeuta, Id_Paciente),
  CONSTRAINT fk_pt_terapeuta FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta),
  CONSTRAINT fk_pt_paciente FOREIGN KEY (Id_Paciente) REFERENCES paciente(Id_Paciente)
);

-- Table familiarplanoterapeuta
CREATE TABLE familiarplanoterapeuta(
  Id_Plano INT NOT NULL,
  Id_Familiar INT NOT NULL,
  CONSTRAINT familiarplano_pk PRIMARY KEY (Id_Plano, Id_Familiar),
  CONSTRAINT fk_fp_plano FOREIGN KEY (Id_Plano) REFERENCES planoterapeuta(Id_Plano),
  CONSTRAINT fk_fp_familiar FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar)
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








-- ====================================Funções=====================================


-- Habilita a extensão pgcrypto para uso de funções de criptografia
CREATE EXTENSION IF NOT EXISTS pgcrypto;


-- O concentimento LGDP é inicialmente FALSE ao cadastrar um novo usuário. Quando o usuário aceitar os termos, a função registrar_consentimento deve ser chamada para atualizar esse valor para TRUE.
-- Função: cadastrar_familiar
CREATE OR REPLACE FUNCTION cadastrar_familiar(
    p_email VARCHAR,
    p_senha VARCHAR,
    p_nome VARCHAR,
    p_data_nascimento DATE,
    p_telefone VARCHAR,
    p_cpf VARCHAR
)
RETURNS INT AS $$
DECLARE
    v_id_usuario INT;
    v_id_familiar INT;
BEGIN
    
    INSERT INTO usuario (Email, Senha, ConsentimentoLGDP)
    VALUES (p_email, crypt(p_senha, gen_salt('bf')), FALSE)
    RETURNING Id_Usuario INTO v_id_usuario;


    -- Cria o familiar vinculado ao usuário
    INSERT INTO familiar (Nome, DataNascimento, Telefone, CPF, Id_Usuario)
    VALUES (p_nome, p_data_nascimento, p_telefone, p_cpf, v_id_usuario)
    RETURNING Id_Familiar INTO v_id_familiar;

    RETURN v_id_familiar;
END;
$$ LANGUAGE plpgsql;



-- Função: cadastrar_terapeuta
CREATE OR REPLACE FUNCTION cadastrar_terapeuta(
    p_email VARCHAR,
    p_senha VARCHAR,
    p_nome VARCHAR,
    p_data_nascimento DATE,
    p_telefone VARCHAR,
    p_crp VARCHAR,
    p_especialidade VARCHAR
)
RETURNS INT AS $$
DECLARE
    v_id_usuario INT;
    v_id_terapeuta INT;
BEGIN
    
    INSERT INTO usuario (Email, Senha, ConsentimentoLGDP)
    VALUES (p_email, crypt(p_senha, gen_salt('bf')), FALSE)
    RETURNING Id_Usuario INTO v_id_usuario;

    -- Cria o terapeuta vinculado ao usuario
    INSERT INTO terapeuta (Nome, DataNascimento, Telefone, CRP, Especialidade, Id_Usuario)
    VALUES (p_nome, p_data_nascimento, p_telefone, p_crp, p_especialidade, v_id_usuario)
    RETURNING Id_Terapeuta INTO v_id_terapeuta;

    RETURN v_id_terapeuta;
END;
$$ LANGUAGE plpgsql;



-- Função: cadastrar_clinica
CREATE OR REPLACE FUNCTION cadastrar_clinica(
    p_email VARCHAR,
    p_senha_usuario VARCHAR,
    p_cnpj VARCHAR,
    p_senha_clinica VARCHAR
)
RETURNS INT AS $$
DECLARE
    v_id_usuario INT;
    v_id_clinica INT;
BEGIN

    INSERT INTO usuario (Email, Senha, ConsentimentoLGDP)
    VALUES (p_email, crypt(p_senha, gen_salt('bf')), FALSE)
    RETURNING Id_Usuario INTO v_id_usuario;


    -- Cria a clínica vinculada ao usuario
    INSERT INTO clinica (CNPJ, Senha, ConsentimentoLGDP, Id_Usuario)
    VALUES (p_cnpj, p_senha_clinica, FALSE, v_id_usuario)
    RETURNING Id_Clinica INTO v_id_clinica;

    RETURN v_id_clinica;
END;
$$ LANGUAGE plpgsql;

-- Função: cadastrar_paciente
CREATE OR REPLACE FUNCTION cadastrar_paciente(
    p_nome VARCHAR,
    p_data_nascimento DATE,
    p_cpf VARCHAR
)
RETURNS INT AS $$
DECLARE
    v_id_paciente INT;
BEGIN
    INSERT INTO paciente (Nome, Data_Nascimento, CPF)
    VALUES (p_nome, p_data_nascimento, p_cpf)
    RETURNING Id_Paciente INTO v_id_paciente;

    RETURN v_id_paciente;
END;
$$ LANGUAGE plpgsql;

--Se o usuário ainda não tiver aceitodo a LGPD, deve ser perguntado se ele aceita os termos. Caso aceite, essa função deve ser chamada para atualizar o consentimento para TRUE.
--Função: registrar_consentimento
CREATE OR REPLACE FUNCTION registrar_consentimento(
    p_id_usuario INT
) RETURNS VOID AS $$
BEGIN
    UPDATE usuario
    SET ConsentimentoLGDP = TRUE
    WHERE Id_Usuario = p_id_usuario;
END;
$$ LANGUAGE plpgsql;


-- Função: validar_login
CREATE OR REPLACE FUNCTION validar_login(
    p_email VARCHAR,    
    p_senha VARCHAR
)

-- Retornos:
-- id_usuario   → usado para identificar o usuário em outras tabelas (por exemplo: familiar, terapeuta, clínica, etc.)
-- email        → pode ser exibido na interface
-- consentimento→ indica se o usuário já aceitou a LGPD (TRUE) ou não (FALSE)
RETURNS TABLE (
    id_usuario INT,
    email VARCHAR,
    consentimento BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT u.Id_Usuario, u.Email, u.ConsentimentoLGDP
    FROM usuario u
    WHERE u.Email = p_email
      AND u.Senha = crypt(p_senha, u.Senha);
END;
$$ LANGUAGE plpgsql;



-- Função: vincular_paciente_familiar
-- Cria o vínculo entre um paciente e um familiar.
-- Parâmetros:
--   p_id_paciente → ID do paciente que será vinculado
--   p_id_familiar → ID do familiar que será vinculado
-- Validações:
--   Verifica se o paciente existe.
--   Verifica se o familiar existe.
--   Evita duplicar vínculos já existentes.
-- Uso:
--   SELECT vincular_paciente_familiar(1, 2);

CREATE OR REPLACE FUNCTION vincular_paciente_familiar(
    p_id_paciente INT,
    p_id_familiar INT
)
RETURNS TEXT AS $$
DECLARE
    v_existe BOOLEAN;
BEGIN
    -- Verifica se paciente existe
    IF NOT EXISTS (SELECT 1 FROM paciente WHERE Id_Paciente = p_id_paciente) THEN
        RAISE EXCEPTION 'Paciente com ID % não existe.', p_id_paciente;
    END IF;

    -- Verifica se familiar existe
    IF NOT EXISTS (SELECT 1 FROM familiar WHERE Id_Familiar = p_id_familiar) THEN
        RAISE EXCEPTION 'Familiar com ID % não existe.', p_id_familiar;
    END IF;

    -- Verifica se já há vínculo
    SELECT TRUE
    FROM pacientefamiliar
    WHERE Id_Paciente = p_id_paciente AND Id_Familiar = p_id_familiar
    INTO v_existe;

    IF v_existe THEN
        RETURN 'Vínculo já existente.';
    END IF;

    -- Insere vínculo
    INSERT INTO pacientefamiliar (Id_Familiar, Id_Paciente)
    VALUES (p_id_familiar, p_id_paciente);

    RETURN 'Vínculo paciente-familiar criado com sucesso.';
END;
$$ LANGUAGE plpgsql;

-- Função: vincular_paciente_terapeuta
-- Cria o vínculo entre um paciente e um terapeuta.
-- Parâmetros:
--   p_id_paciente → ID do paciente que será vinculado
--   p_id_terapeuta → ID do terapeuta responsável
-- Validações:
--   Verifica se o paciente existe.
--   Verifica se o terapeuta existe.
--   Evita vínculos duplicados.
-- Uso:
--   SELECT vincular_paciente_terapeuta(1, 3);

CREATE OR REPLACE FUNCTION vincular_paciente_terapeuta(
    p_id_paciente INT,
    p_id_terapeuta INT
)
RETURNS TEXT AS $$
DECLARE
    v_existe BOOLEAN;
BEGIN
    -- Verifica se paciente existe
    IF NOT EXISTS (SELECT 1 FROM paciente WHERE Id_Paciente = p_id_paciente) THEN
        RAISE EXCEPTION 'Paciente com ID % não existe.', p_id_paciente;
    END IF;

    -- Verifica se terapeuta existe
    IF NOT EXISTS (SELECT 1 FROM terapeuta WHERE Id_Terapeuta = p_id_terapeuta) THEN
        RAISE EXCEPTION 'Terapeuta com ID % não existe.', p_id_terapeuta;
    END IF;

    -- Verifica se já há vínculo
    SELECT TRUE
    FROM pacienteterapeuta
    WHERE Id_Paciente = p_id_paciente AND Id_Terapeuta = p_id_terapeuta
    INTO v_existe;

    IF v_existe THEN
        RETURN 'Vínculo já existente.';
    END IF;

    -- Insere vínculo
    INSERT INTO pacienteterapeuta (Id_Terapeuta, Id_Paciente)
    VALUES (p_id_terapeuta, p_id_paciente);

    RETURN 'Vínculo paciente-terapeuta criado com sucesso.';
END;
$$ LANGUAGE plpgsql;


-- Função: desvincular_paciente_familiar
-- Remove o vínculo entre um paciente e um familiar.
-- Parâmetros:
--   p_id_paciente → ID do paciente
--   p_id_familiar → ID do familiar
-- Validações:
--   Verifica se o vínculo existe antes de remover
-- Uso:
--   SELECT desvincular_paciente_familiar(1, 2);

CREATE OR REPLACE FUNCTION desvincular_paciente_familiar(
    p_id_paciente INT,
    p_id_familiar INT
)
RETURNS TEXT AS $$
DECLARE
    v_existe BOOLEAN;
BEGIN
    -- Verifica se há vínculo
    SELECT TRUE
    FROM pacientefamiliar
    WHERE Id_Paciente = p_id_paciente AND Id_Familiar = p_id_familiar
    INTO v_existe;

    IF NOT v_existe THEN
        RETURN 'Vínculo não existe.';
    END IF;

    -- Remove vínculo
    DELETE FROM pacientefamiliar
    WHERE Id_Paciente = p_id_paciente AND Id_Familiar = p_id_familiar;

    RETURN 'Vínculo paciente-familiar removido com sucesso.';
END;
$$ LANGUAGE plpgsql;


-- Função: desvincular_paciente_terapeuta
-- Remove o vínculo entre um paciente e um terapeuta.
-- Parâmetros:
--   p_id_paciente → ID do paciente
--   p_id_terapeuta → ID do terapeuta
-- Validações:
--   Verifica se o vínculo existe antes de remover
-- Uso:
--   SELECT desvincular_paciente_terapeuta(1, 3);

CREATE OR REPLACE FUNCTION desvincular_paciente_terapeuta(
    p_id_paciente INT,
    p_id_terapeuta INT
)
RETURNS TEXT AS $$
DECLARE
    v_existe BOOLEAN;
BEGIN
    -- Verifica se há vínculo
    SELECT TRUE
    FROM pacienteterapeuta
    WHERE Id_Paciente = p_id_paciente AND Id_Terapeuta = p_id_terapeuta
    INTO v_existe;

    IF NOT v_existe THEN
        RETURN 'Vínculo não existe.';
    END IF;

    -- Remove vínculo
    DELETE FROM pacienteterapeuta
    WHERE Id_Paciente = p_id_paciente AND Id_Terapeuta = p_id_terapeuta;

    RETURN 'Vínculo paciente-terapeuta removido com sucesso.';
END;
$$ LANGUAGE plpgsql;
