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

-- Atualização do plano terapêutico

-- Tabela principal que armazena os dados do plano terapêutico
CREATE TABLE PlanoTerapeutico (
    Id_Plano INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Id_Paciente INT NOT NULL,
    Id_Terapeuta INT NOT NULL,
    Id_Familiar INT NULL, -- Pode ser NULL
    
    GrauNeurodivergencia VARCHAR(500) NOT NULL,
    ObjetivosTratamento VARCHAR(2000) NOT NULL,
    AbordagemFamilia VARCHAR(2000) NOT NULL,
    CronogramaAtividades VARCHAR(2000) NOT NULL,
    MensagemPlano VARCHAR(2000),

    DataCriacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DataAssinaturaTerapeuta TIMESTAMP NULL,
    DataAssinaturaFamilia TIMESTAMP NULL,

    FOREIGN KEY (Id_Paciente) REFERENCES Paciente(Id_Paciente),
    FOREIGN KEY (Id_Terapeuta) REFERENCES Terapeuta(Id_Terapeuta),
    FOREIGN KEY (Id_Familiar) REFERENCES Familiar(Id_Familiar)
);


-- Tabela para armazenar arquivos anexos
CREATE TABLE Anexos (
    Id_Anexo INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Id_Plano INT NOT NULL,

    NomeArquivo VARCHAR(255) NOT NULL,
    TipoMime VARCHAR(100) NOT NULL,
    DadosArquivo BYTEA NOT NULL,
    DataUpload TIMESTAMP NOT NULL DEFAULT NOW(),

    FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano)
);


-- Lista pré-definida de neurodivergências
CREATE TABLE Neurodivergencia (
    Id_Neuro INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Sigla VARCHAR(100) UNIQUE NOT NULL,
    NomeCompleto VARCHAR(1000)
);


-- Relação Plano → Neurodivergências
CREATE TABLE PlanoNeurodivergencia (
    Id_Plano INT NOT NULL,
    Id_Neuro INT NOT NULL,

    PRIMARY KEY (Id_Plano, Id_Neuro),

    FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano),
    FOREIGN KEY (Id_Neuro) REFERENCES Neurodivergencia(Id_Neuro)
);

-- Lista pré-definida de métodos de acompanhamento
CREATE TABLE MetodoAcompanhamento (
    Id_Metodo SERIAL PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL UNIQUE
);



-- Relação Plano → Métodos de Acompanhamento
CREATE TABLE PlanoMetodo (
    Id_Plano INT NOT NULL,
    Id_Metodo INT NOT NULL,

    PRIMARY KEY (Id_Plano, Id_Metodo),

    FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano),
    FOREIGN KEY (Id_Metodo) REFERENCES MetodoAcompanhamento(Id_Metodo)
);
-- Lista pré-definida de métodos de acompanhamento
INSERT INTO MetodoAcompanhamento (Nome) VALUES
('Treinamento Parental'),
('Comunicação Assistiva'),
('Terapia Ocupacional'),
('Fonoaudiologia'),
('Terapia Comportamental Cognitiva'),
('Análise do Comportamento Aplicada (ABA)'), -- Adicionado como um método comum
('Psicomotricidade'), -- Adicionado como um método comum
('Intervenção Nutricional'); -- Adicionado como um método comum

-- lista pré-definida de neurodivergências
INSERT INTO Neurodivergencia (Sigla, NomeCompleto) VALUES
('TEA', 'Transtorno do Espectro Autista'),
('TAB', 'Transtorno Afetivo Bipolar'),
('TDAH', 'Transtorno do Déficit de Atenção e Hiperatividade'),
('TPN', 'Transtorno de Processamento Não-Verbal' /* Sugestão baseada em contexto; pode ser ajustado */),
('TOC', 'Transtorno Obsessivo-Compulsivo'),
('Dislexia', 'Transtorno Específico de Aprendizagem com prejuízo na Leitura'),
('Discalculia', 'Transtorno Específico de Aprendizagem com prejuízo na Matemática'),
('Disgrafia', 'Transtorno Específico de Aprendizagem com prejuízo na Escrita'),
('Outros', 'Outros Transtornos ou Condições Neurodivergentes');
--fim da atualização do plano terapêutico

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
  CONSTRAINT fk_consulta_plano FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano),
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
  CONSTRAINT fk_feedback_plano FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano),
  CONSTRAINT fk_feedback_familiar FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar)
);

-- Table historico plano terapeuta
CREATE TABLE historicoPlanoTerapeutico(
  Id_Historico INT GENERATED ALWAYS AS IDENTITY,
  DataFim DATE NOT NULL,
  Id_Plano INT NOT NULL,
  CONSTRAINT historicoplano_pk PRIMARY KEY (Id_Historico),
  CONSTRAINT fk_historico_plano FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano)
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

-- Table familiarPlanoTerapeutico
CREATE TABLE familiarPlanoTerapeutico(
  Id_Plano INT NOT NULL,
  Id_Familiar INT NOT NULL,
  CONSTRAINT familiarplano_pk PRIMARY KEY (Id_Plano, Id_Familiar),
  CONSTRAINT fk_fp_plano FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano),
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


-- DROP FUNCTION public.cadastrar_clinica(varchar, varchar, varchar, varchar, varchar);

CREATE OR REPLACE FUNCTION public.cadastrar_clinica(p_email character varying, p_senha_usuario character varying, p_cnpj character varying, p_senha_clinica character varying, p_tipo character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_usuario INT;
    v_id_clinica INT;
BEGIN
    INSERT INTO usuario (Email, Senha, ConsentimentoLGDP, p_tipo)
    VALUES (p_email, crypt(p_senha_usuario, gen_salt('bf')), FALSE)
    RETURNING Id_Usuario INTO v_id_usuario;

    INSERT INTO clinica (CNPJ, Senha, Id_Usuario)
    VALUES (p_cnpj, crypt(p_senha_clinica, gen_salt('bf')), v_id_usuario)
    RETURNING Id_Clinica INTO v_id_clinica;

    RETURN v_id_clinica;
END;
$function$
;

-- DROP FUNCTION public.cadastrar_familiar(varchar, varchar, varchar, date, varchar, varchar, varchar);

CREATE OR REPLACE FUNCTION public.cadastrar_familiar(p_email character varying, p_senha character varying, p_nome character varying, p_data_nascimento date, p_telefone character varying, p_cpf character varying, p_tipo character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_usuario INT;
    v_id_familiar INT;
BEGIN
    
    INSERT INTO usuario (Email, Senha, ConsentimentoLGDP, Tipo)
    VALUES (p_email, crypt(p_senha, gen_salt('bf')), FALSE, p_tipo)
    RETURNING Id_Usuario INTO v_id_usuario;


    -- Cria o familiar vinculado ao usuário
    INSERT INTO familiar (Nome, DataNascimento, Telefone, CPF, Id_Usuario)
    VALUES (p_nome, p_data_nascimento, p_telefone, p_cpf, v_id_usuario)
    RETURNING Id_Familiar INTO v_id_familiar;

    RETURN v_id_familiar;
END;
$function$
;
-- DROP FUNCTION public.cadastrar_terapeuta(varchar, varchar, varchar, date, varchar, varchar, varchar, varchar);

CREATE OR REPLACE FUNCTION public.cadastrar_terapeuta(p_email character varying, p_senha character varying, p_nome character varying, p_data_nascimento date, p_telefone character varying, p_crp character varying, p_especialidade character varying, p_tipo character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_usuario INT;
    v_id_terapeuta INT;
BEGIN
    
    INSERT INTO usuario (Email, Senha, ConsentimentoLGDP, Tipo)
    VALUES (p_email, crypt(p_senha, gen_salt('bf')), FALSE, p_tipo)
    RETURNING Id_Usuario INTO v_id_usuario;

    -- Cria o terapeuta vinculado ao usuario
    INSERT INTO terapeuta (Nome, DataNascimento, Telefone, CRP, Especialidade, Id_Usuario)
    VALUES (p_nome, p_data_nascimento, p_telefone, p_crp, p_especialidade, v_id_usuario)
    RETURNING Id_Terapeuta INTO v_id_terapeuta;

    RETURN v_id_terapeuta;
END;
$function$
;


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



-- Função: registrar_consentimento
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
      AND u.Senha = p_senha;
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

-- Função: criar_plano_terapeutico
-- Cria um novo plano terapêutico com os dados básicos do paciente, terapeuta e familiar.
-- Parâmetros:
--   p_id_paciente → ID do paciente associado ao plano
--   p_id_terapeuta → ID do terapeuta responsável pelo plano
--   p_id_familiar → ID do familiar/responsável (pode ser NULL)
--   p_grau_neurodivergencia → Descrição do grau da neurodivergência
--   p_objetivos_tratamento → Objetivos principais do tratamento
--   p_abordagem_familia → Abordagem a ser adotada com a família
--   p_cronograma_atividades → Cronograma das atividades terapêuticas
--   p_mensagem_plano → Mensagem adicional ou observações (opcional)
-- Retorno:
--   INT → ID do plano terapêutico criado
-- Validações:
--   Verifica existência do paciente; lança exceção se não existir.
--   Verifica existência do terapeuta; lança exceção se não existir.
--   Se p_id_familiar for fornecido, verifica existência do familiar; lança exceção se não existir.
-- Uso:
--   SELECT criar_plano_terapeutico(1, 2, 3, 'Leve', 'Melhorar comunicação', 'Envolvimento ativo', 'Segunda a quinta', 'Observações');

CREATE OR REPLACE FUNCTION criar_plano_terapeutico(
    p_id_paciente INT,
    p_id_terapeuta INT,
    p_id_familiar INT DEFAULT NULL,
    p_grau_neurodivergencia VARCHAR DEFAULT 'Não Especificado', 
    p_objetivos_tratamento VARCHAR DEFAULT 'Objetivos não especificados', -- Adicionado valor padrão
    p_abordagem_familia VARCHAR DEFAULT 'Não Especificado',
    p_cronograma_atividades VARCHAR DEFAULT 'Não Especificado',
    p_mensagem_plano VARCHAR DEFAULT NULL
)
RETURNS INT AS $$
DECLARE
    v_id_plano INT;
BEGIN
    -- Verifica paciente
    IF NOT EXISTS (SELECT 1 FROM Paciente WHERE Id_Paciente = p_id_paciente) THEN
        RAISE EXCEPTION 'Paciente % não existe', p_id_paciente;
    END IF;

    -- Verifica terapeuta
    IF NOT EXISTS (SELECT 1 FROM Terapeuta WHERE Id_Terapeuta = p_id_terapeuta) THEN
        RAISE EXCEPTION 'Terapeuta % não existe', p_id_terapeuta;
    END IF;

    -- Verifica familiar se não for NULL
    IF p_id_familiar IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM Familiar WHERE Id_Familiar = p_id_familiar) THEN
            RAISE EXCEPTION 'Familiar % não existe', p_id_familiar;
        END IF;
    END IF;

    INSERT INTO PlanoTerapeutico (
        Id_Paciente,
        Id_Terapeuta,
        Id_Familiar,
        GrauNeurodivergencia,
        ObjetivosTratamento,
        AbordagemFamilia,
        CronogramaAtividades,
        MensagemPlano,
        DataCriacao
    )
    VALUES (
        p_id_paciente,
        p_id_terapeuta,
        p_id_familiar,
        p_grau_neurodivergencia,
        p_objetivos_tratamento,
        p_abordagem_familia,
        p_cronograma_atividades,
        p_mensagem_plano,
        CURRENT_TIMESTAMP
    )
    RETURNING Id_Plano INTO v_id_plano;

    RETURN v_id_plano;
END;
$$ LANGUAGE plpgsql;


-- Função: vincular_familiar_plano
-- Vincula ou atualiza o vínculo de um familiar a um plano terapêutico existente.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico a ser atualizado
--   p_id_familiar → ID do familiar a ser vinculado
-- Validações:
--   Verifica existência do plano; lança exceção se não existir.
--   Verifica existência do familiar; lança exceção se não existir.
--   Confirma que o UPDATE afetou ao menos uma linha; lança exceção se nenhuma linha foi atualizada.
-- Uso:
--   SELECT vincular_familiar_plano(1, 3);
CREATE OR REPLACE FUNCTION vincular_familiar_plano(
    p_id_plano INT,
    p_id_familiar INT
)
RETURNS VOID AS $$
DECLARE
    v_rows INT;
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PlanoTerapeutico WHERE Id_Plano = p_id_plano) THEN
        RAISE EXCEPTION 'Plano % não existe', p_id_plano;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM Familiar WHERE Id_Familiar = p_id_familiar) THEN
        RAISE EXCEPTION 'Familiar % não existe', p_id_familiar;
    END IF;

    UPDATE PlanoTerapeutico
    SET Id_Familiar = p_id_familiar
    WHERE Id_Plano = p_id_plano;

    GET DIAGNOSTICS v_rows = ROW_COUNT;
    IF v_rows = 0 THEN
        RAISE EXCEPTION 'Nenhuma linha atualizada. Plano % não encontrado.', p_id_plano;
    END IF;
END;
$$ LANGUAGE plpgsql;



-- Função: adicionar_neurodivergencia_plano
-- Adiciona uma neurodivergência associada a um plano terapêutico.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico
--   p_id_neuro → ID da neurodivergência a ser adicionada
-- Validações:
--   Verifica existência do plano; lança exceção se não existir.
--   Verifica existência da neurodivergência; lança exceção se não existir.
--   Evita duplicação usando PRIMARY KEY / ON CONFLICT DO NOTHING.
-- Uso:
--   SELECT adicionar_neurodivergencia_plano(1, 1); -- Adiciona TEA ao plano 1

CREATE OR REPLACE FUNCTION adicionar_neurodivergencia_plano(
    p_id_plano INT,
    p_id_neuro INT
)
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PlanoTerapeutico WHERE Id_Plano = p_id_plano) THEN
        RAISE EXCEPTION 'Plano % não existe', p_id_plano;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM Neurodivergencia WHERE Id_Neuro = p_id_neuro) THEN
        RAISE EXCEPTION 'Neurodivergência % não existe', p_id_neuro;
    END IF;

    INSERT INTO PlanoNeurodivergencia (Id_Plano, Id_Neuro)
    VALUES (p_id_plano, p_id_neuro)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;


-- Função: adicionar_metodo_plano
-- Adiciona um método de acompanhamento associado a um plano terapêutico.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico
--   p_id_metodo → ID do método de acompanhamento a ser adicionado
-- Validações:
--   Verifica existência do plano; lança exceção se não existir.
--   Verifica existência do método; lança exceção se não existir.
--   Evita duplicação usando PRIMARY KEY / ON CONFLICT DO NOTHING.
-- Uso:
--   SELECT adicionar_metodo_plano(1, 1); -- Adiciona Treinamento Parental ao plano 1

CREATE OR REPLACE FUNCTION adicionar_metodo_plano(
    p_id_plano INT,
    p_id_metodo INT
)
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PlanoTerapeutico WHERE Id_Plano = p_id_plano) THEN
        RAISE EXCEPTION 'Plano % não existe', p_id_plano;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM MetodoAcompanhamento WHERE Id_Metodo = p_id_metodo) THEN
        RAISE EXCEPTION 'Método % não existe', p_id_metodo;
    END IF;

    INSERT INTO PlanoMetodo (Id_Plano, Id_Metodo)
    VALUES (p_id_plano, p_id_metodo)
    ON CONFLICT DO NOTHING;
END;
$$ LANGUAGE plpgsql;



-- Função: assinar_plano_terapeuta
-- Registra a assinatura digital do terapeuta no plano terapêutico.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico a ser assinado
-- Retorno:
--   VOID
-- Validações:
--   Executa UPDATE em DataAssinaturaTerapeuta e verifica se alguma linha foi afetada; lança exceção se o plano não existir.
-- Uso:
--   SELECT assinar_plano_terapeuta(1);

CREATE OR REPLACE FUNCTION assinar_plano_terapeuta(
    p_id_plano INT
)
RETURNS VOID AS $$
DECLARE
    v_rows INT;
BEGIN
    UPDATE PlanoTerapeutico
    SET DataAssinaturaTerapeuta = NOW()
    WHERE Id_Plano = p_id_plano;

    GET DIAGNOSTICS v_rows = ROW_COUNT;

    IF v_rows = 0 THEN
        RAISE EXCEPTION 'Plano % não existe', p_id_plano;
    END IF;
END;
$$ LANGUAGE plpgsql;



-- Função: anexar_arquivo_plano
-- Anexa um arquivo (binário) ao plano terapêutico.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico
--   p_nome_arquivo → Nome do arquivo (ex: 'plano_2025.pdf')
--   p_tipo_mime → Tipo MIME do arquivo (ex: 'application/pdf')
--   p_dados → Dados binários do arquivo (BYTEA)
-- Retorno:
--   VOID
-- Validações:
--   Verifica existência do plano; lança exceção se não existir.
--   Insere o anexo com DataUpload = NOW().
-- Observações:
--   Armazena diretamente no banco de dados; considerar impacto de performance e limites de tamanho.
-- Uso:
--   SELECT anexar_arquivo_plano(1, 'plano_terapeutico.pdf', 'application/pdf', dados_binarios);

CREATE OR REPLACE FUNCTION anexar_arquivo_plano(
    p_id_plano INT,
    p_nome_arquivo VARCHAR,
    p_tipo_mime VARCHAR,
    p_dados BYTEA
)
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PlanoTerapeutico WHERE Id_Plano = p_id_plano) THEN
        RAISE EXCEPTION 'Plano % não existe', p_id_plano;
    END IF;

    INSERT INTO Anexos (Id_Plano, NomeArquivo, TipoMime, DadosArquivo, DataUpload)
    VALUES (p_id_plano, p_nome_arquivo, p_tipo_mime, p_dados, NOW());
END;
$$ LANGUAGE plpgsql;


-- Função: buscar_resumo_plano
-- Retorna um resumo do plano terapêutico com informações principais.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico a ser consultado
-- Retorno:
--   TABLE (id_plano, paciente_nome, terapeuta_nome, familiar_nome, grau_neurodivergencia, objetivos_tratamento, data_criacao)
-- Validações:
--   Não realiza validação explícita no corpo da função; retorna zero linhas se o plano não existir.
--   Usa LEFT JOIN para obter dados relacionados mesmo quando campos de relacionamento estão NULL.
-- Uso:
--   SELECT * FROM buscar_resumo_plano(1);

CREATE OR REPLACE FUNCTION buscar_resumo_plano(
    p_id_plano INT
)
RETURNS TABLE (
    id_plano INT,
    paciente_nome VARCHAR,
    terapeuta_nome VARCHAR,
    familiar_nome VARCHAR,
    grau_neurodivergencia VARCHAR,
    objetivos_tratamento VARCHAR,
    data_criacao TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.Id_Plano,
        pa.Nome AS Paciente,
        t.Nome AS Terapeuta,
        f.Nome AS Familiar,
        p.GrauNeurodivergencia,
        p.ObjetivosTratamento,
        p.DataCriacao
    FROM PlanoTerapeutico p
    LEFT JOIN Paciente pa ON p.Id_Paciente = pa.Id_Paciente
    LEFT JOIN Terapeuta t ON p.Id_Terapeuta = t.Id_Terapeuta
    LEFT JOIN Familiar f ON p.Id_Familiar = f.Id_Familiar
    WHERE p.Id_Plano = p_id_plano;
END;
$$ LANGUAGE plpgsql;


-- Função: listar_planos_paciente
-- Lista todos os planos terapêuticos associados a um paciente específico.
-- Parâmetros:
--   p_id_paciente → ID do paciente
-- Retorno:
--   TABLE (id_plano, terapeuta_nome, familiar_nome, grau_neurodivergencia, objetivos_tratamento, data_criacao)
-- Validações:
--   Não valida a existência do paciente; retorna lista vazia se não houver planos.
--   Usa LEFT JOIN para lidar com familiares ou terapeutas ausentes.
-- Observações:
--   Ordena por DataCriacao DESC.
-- Uso:
--   SELECT * FROM listar_planos_paciente(1);

CREATE OR REPLACE FUNCTION listar_planos_paciente(
    p_id_paciente INT
)
RETURNS TABLE (
    id_plano INT,
    terapeuta_nome VARCHAR,
    familiar_nome VARCHAR,
    grau_neurodivergencia VARCHAR,
    objetivos_tratamento VARCHAR,
    data_criacao TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.Id_Plano,
        t.Nome AS terapeuta_nome,
        f.Nome AS familiar_nome,
        p.GrauNeurodivergencia,
        p.ObjetivosTratamento,
        p.DataCriacao
    FROM PlanoTerapeutico p
    LEFT JOIN Terapeuta t ON p.Id_Terapeuta = t.Id_Terapeuta
    LEFT JOIN Familiar f ON p.Id_Familiar = f.Id_Familiar
    WHERE p.Id_Paciente = p_id_paciente
    ORDER BY p.DataCriacao DESC;
END;
$$ LANGUAGE plpgsql;


-- Função: listar_planos_terapeuta
-- Lista todos os planos terapêuticos associados a um terapeuta específico.
-- Parâmetros:
--   p_id_terapeuta → ID do terapeuta
-- Retorno:
--   TABLE (id_plano, paciente_nome, familiar_nome, grau_neurodivergencia, objetivos_tratamento, data_criacao)
-- Validações:
--   Não valida a existência do terapeuta; retorna lista vazia se não houver planos.
--   Usa LEFT JOIN para lidar com pacientes ou familiares ausentes.
-- Observações:
--   Ordena por DataCriacao DESC.
-- Uso:
--   SELECT * FROM listar_planos_terapeuta(2);

CREATE OR REPLACE FUNCTION listar_planos_terapeuta(
    p_id_terapeuta INT
)
RETURNS TABLE (
    id_plano INT,
    paciente_nome VARCHAR,
    familiar_nome VARCHAR,
    grau_neurodivergencia VARCHAR,
    objetivos_tratamento VARCHAR,
    data_criacao TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.Id_Plano,
        pa.Nome AS paciente_nome,
        f.Nome AS familiar_nome,
        p.GrauNeurodivergencia,
        p.ObjetivosTratamento,
        p.DataCriacao
    FROM PlanoTerapeutico p
    LEFT JOIN Paciente pa ON p.Id_Paciente = pa.Id_Paciente
    LEFT JOIN Familiar f ON p.Id_Familiar = f.Id_Familiar
    WHERE p.Id_Terapeuta = p_id_terapeuta
    ORDER BY p.DataCriacao DESC;
END;
$$ LANGUAGE plpgsql;


-- Função: listar_planos_familiar
-- Lista todos os planos terapêuticos associados a um familiar específico.
-- Parâmetros:
--   p_id_familiar → ID do familiar
-- Retorno:
--   TABLE (id_plano, paciente_nome, terapeuta_nome, grau_neurodivergencia, objetivos_tratamento, data_criacao)
-- Validações:
--   Não valida a existência do familiar; retorna lista vazia se não houver planos.
--   Usa LEFT JOIN para lidar com dados relacionados opcionais.
-- Observações:
--   Ordena por DataCriacao DESC.
-- Uso:
--   SELECT * FROM listar_planos_familiar(3);

CREATE OR REPLACE FUNCTION listar_planos_familiar(
    p_id_familiar INT
)
RETURNS TABLE (
    id_plano INT,
    paciente_nome VARCHAR,
    terapeuta_nome VARCHAR,
    grau_neurodivergencia VARCHAR,
    objetivos_tratamento VARCHAR,
    data_criacao TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.Id_Plano,
        pa.Nome AS paciente_nome,
        t.Nome AS terapeuta_nome,
        p.GrauNeurodivergencia,
        p.ObjetivosTratamento,
        p.DataCriacao
    FROM PlanoTerapeutico p
    LEFT JOIN Paciente pa ON p.Id_Paciente = pa.Id_Paciente
    LEFT JOIN Terapeuta t ON p.Id_Terapeuta = t.Id_Terapeuta
    WHERE p.Id_Familiar = p_id_familiar
    ORDER BY p.DataCriacao DESC;
END;
$$ LANGUAGE plpgsql;


-- Função: listar_anexos_plano
-- Lista todos os arquivos anexados a um plano terapêutico específico.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico
-- Retorno:
--   TABLE (id_anexo, nome_arquivo, tipo_mime, data_upload)
-- Validações:
--   Não valida explicitamente a existência do plano; retornará lista vazia se não houver anexos.
-- Observações:
--   Não retorna DadosArquivo (binário) para otimizar performance.
--   Ordena por DataUpload DESC.
-- Uso:
--   SELECT * FROM listar_anexos_plano(1);

CREATE OR REPLACE FUNCTION listar_anexos_plano(
    p_id_plano INT
)
RETURNS TABLE (
    id_anexo INT,
    nome_arquivo VARCHAR,
    tipo_mime VARCHAR,
    data_upload TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        a.Id_Anexo,
        a.NomeArquivo,
        a.TipoMime,
        a.DataUpload
    FROM Anexos a
    WHERE a.Id_Plano = p_id_plano
    ORDER BY a.DataUpload DESC;
END;
$$ LANGUAGE plpgsql;


-- Função: listar_metodos_plano
-- Lista todos os métodos de acompanhamento associados a um plano terapêutico.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico
-- Retorno:
--   TABLE (nome_metodo)
-- Validações:
--   Não valida explicitamente a existência do plano; retornará lista vazia se não houver métodos vinculados.
-- Uso:
--   SELECT * FROM listar_metodos_plano(1);

CREATE OR REPLACE FUNCTION listar_metodos_plano(
    p_id_plano INT
)
RETURNS TABLE (
    nome_metodo VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT m.Nome
    FROM PlanoMetodo pm
    JOIN MetodoAcompanhamento m ON pm.Id_Metodo = m.Id_Metodo
    WHERE pm.Id_Plano = p_id_plano;
END;
$$ LANGUAGE plpgsql;


-- Função: listar_neurodivergencias_plano
-- Lista todas as neurodivergências associadas a um plano terapêutico.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico
-- Retorno:
--   TABLE (sigla, nome_completo)
-- Validações:
--   Não valida explicitamente a existência do plano; retornará lista vazia se não houver neurodivergências vinculadas.
-- Uso:
--   SELECT * FROM listar_neurodivergencias_plano(1);

CREATE OR REPLACE FUNCTION listar_neurodivergencias_plano(
    p_id_plano INT
)
RETURNS TABLE (
    sigla VARCHAR,
    nome_completo VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT n.Sigla, n.NomeCompleto
    FROM PlanoNeurodivergencia pn
    JOIN Neurodivergencia n ON pn.Id_Neuro = n.Id_Neuro
    WHERE pn.Id_Plano = p_id_plano;
END;
$$ LANGUAGE plpgsql;


-- Função: buscar_plano_completo
-- Retorna todos os detalhes completos de um plano terapêutico.
-- Parâmetros:
--   p_id_plano → ID do plano terapêutico a ser consultado
-- Retorno:
--   TABLE (id_plano, paciente_nome, terapeuta_nome, familiar_nome, grau_neurodivergencia, 
--          objetivos_tratamento, abordagem_familia, cronograma_atividades, mensagem_plano, 
--          data_criacao, assinatura_terapeuta, assinatura_familia)
-- Validações:
--   Não realiza validação explícita; retorna zero linhas se o plano não existir.
--   Usa LEFT JOIN para recuperar valores de relacionamentos opcionais.
-- Uso:
--   SELECT * FROM buscar_plano_completo(1);

CREATE OR REPLACE FUNCTION buscar_plano_completo(
    p_id_plano INT
)
RETURNS TABLE (
    id_plano INT,
    paciente_nome VARCHAR,
    terapeuta_nome VARCHAR,
    familiar_nome VARCHAR,
    grau_neurodivergencia VARCHAR,
    objetivos_tratamento VARCHAR,
    abordagem_familia VARCHAR,
    cronograma_atividades VARCHAR,
    mensagem_plano VARCHAR,
    data_criacao TIMESTAMP,
    assinatura_terapeuta TIMESTAMP,
    assinatura_familia TIMESTAMP
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.Id_Plano,
        pa.Nome AS paciente_nome,
        t.Nome AS terapeuta_nome,
        f.Nome AS familiar_nome,
        p.GrauNeurodivergencia,
        p.ObjetivosTratamento,
        p.AbordagemFamilia,
        p.CronogramaAtividades,
        p.MensagemPlano,
        p.DataCriacao,
        p.DataAssinaturaTerapeuta,
        p.DataAssinaturaFamilia
    FROM PlanoTerapeutico p
    LEFT JOIN Paciente pa ON p.Id_Paciente = pa.Id_Paciente
    LEFT JOIN Terapeuta t ON p.Id_Terapeuta = t.Id_Terapeuta
    LEFT JOIN Familiar f ON p.Id_Familiar = f.Id_Familiar
    WHERE p.Id_Plano = p_id_plano;
END;
$$ LANGUAGE plpgsql;
