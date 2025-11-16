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

-- Tabela para armazenar os métodos de acompanhamento disponíveis
CREATE TABLE MetodoAcompanhamento (
    Id_Metodo SERIAL PRIMARY KEY,
    Nome VARCHAR(255) NOT NULL UNIQUE
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
    Sigla VARCHAR(10) UNIQUE NOT NULL,
    NomeCompleto VARCHAR(100)
);


-- Relação Plano → Neurodivergências
CREATE TABLE PlanoNeurodivergencia (
    Id_Plano INT NOT NULL,
    Id_Neuro INT NOT NULL,

    PRIMARY KEY (Id_Plano, Id_Neuro),

    FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano),
    FOREIGN KEY (Id_Neuro) REFERENCES Neurodivergencia(Id_Neuro)
);


-- Relação Plano → Métodos de Acompanhamento
CREATE TABLE PlanoMetodo (
    Id_Plano INT NOT NULL,
    Id_Metodo INT NOT NULL,

    PRIMARY KEY (Id_Plano, Id_Metodo),

    FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano),
    FOREIGN KEY (Id_Metodo) REFERENCES MetodoAcompanhamento(Id_Metodo)
);


-- Inserts padrões dos métodos
INSERT INTO MetodoAcompanhamento (Nome) VALUES
('Treinamento Parental'),
('Comunicação Assistiva'),
('Terapia Ocupacional'),
('Fonoaudiologia'),
('Terapia Comportamental Cognitiva'),
('Análise do Comportamento Aplicada (ABA)'),
('Psicomotricidade'),
('Intervenção Nutricional');


-- Inserts padrões das neurodivergências
INSERT INTO Neurodivergencia (Sigla, NomeCompleto) VALUES
('TEA', 'Transtorno do Espectro Autista'),
('TAB', 'Transtorno Afetivo Bipolar'),
('TDAH', 'Transtorno do Déficit de Atenção e Hiperatividade'),
('TPN', 'Transtorno de Processamento Não-Verbal'),
('TOC', 'Transtorno Obsessivo-Compulsivo'),
('Dislexia', 'Transtorno Específico de Aprendizagem com prejuízo na Leitura'),
('Discalculia', 'Transtorno Específico de Aprendizagem com prejuízo na Matemática'),
('Disgrafia', 'Transtorno Específico de Aprendizagem com prejuízo na Escrita'),
('Outros', 'Outros Transtornos ou Condições Neurodivergentes');


----------------------- Funções -----------------------------
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
    p_grau_neurodivergencia VARCHAR,
    p_objetivos_tratamento VARCHAR,
    p_abordagem_familia VARCHAR,
    p_cronograma_atividades VARCHAR,
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
