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



CREATE TABLE checklist(
  Id_Checklist INT GENERATED ALWAYS AS IDENTITY,
  DataCriacao DATE NOT NULL,
  Id_Terapeuta INT NOT NULL,
  Id_Diario INT NOT NULL,
  PRIMARY KEY (Id_Checklist),
  FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta),
  FOREIGN KEY (Id_Diario) REFERENCES diariocompartilhado(Id_Diario)
);



CREATE TABLE observacao(
  Id_Observacao INT GENERATED ALWAYS AS IDENTITY,
  Descricao_Observacao VARCHAR(255) NOT NULL,
  Data_Envio DATE NOT NULL,
  Data_Edicao DATE,
  Id_Checklist INT NOT NULL,
  Id_Familiar INT NOT NULL,
  PRIMARY KEY (Id_Observacao),
  FOREIGN KEY (Id_Checklist) REFERENCES checklist(Id_Checklist),
  FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar)
);



CREATE TABLE mensagem(
  Id_Mensagem INT GENERATED ALWAYS AS IDENTITY,
  Descricao_Mensagem VARCHAR(500) NOT NULL,
  Data_Envio DATE NOT NULL,
  Data_Edicao DATE,
  Id_Diario INT,
  Id_Familiar INT,
  Id_Terapeuta INT,
  PRIMARY KEY (Id_Mensagem),
  FOREIGN KEY (Id_Diario) REFERENCES diariocompartilhado(Id_Diario),
  FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar),
  FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta)
);



CREATE TABLE diarioterapeuta(
  Id_Diario INT NOT NULL, 
  Id_Terapeuta INT NOT NULL,
  PRIMARY KEY (Id_Terapeuta, Id_Diario),
  FOREIGN KEY (Id_Diario) REFERENCES diariocompartilhado(Id_Diario),
  FOREIGN KEY (Id_Terapeuta) REFERENCES terapeuta(Id_Terapeuta)
);


CREATE TABLE diariofamiliar(
  Id_Diario INT NOT NULL, 
  Id_Familiar INT NOT NULL,
  PRIMARY KEY (Id_Familiar, Id_Diario),
  FOREIGN KEY (Id_Diario) REFERENCES diariocompartilhado(Id_Diario),
  FOREIGN KEY (Id_Familiar) REFERENCES familiar(Id_Familiar)
);


CREATE TABLE Midia (
    Id_Midia SERIAL PRIMARY KEY,
    Tipo VARCHAR(20) NOT NULL CHECK (Tipo IN ('foto', 'video', 'documento')),

    Arquivo BYTEA NOT NULL,
    NomeArquivo VARCHAR(255),
    MimeType VARCHAR(100),
    DataUpload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    Id_Diario INT,
    Id_Observacao INT,
    Id_Mensagem INT,

    FOREIGN KEY (Id_Diario) REFERENCES DiarioCompartilhado(Id_Diario) ON DELETE CASCADE,
    FOREIGN KEY (Id_Observacao) REFERENCES Observacao(Id_Observacao) ON DELETE CASCADE,
    FOREIGN KEY (Id_Mensagem) REFERENCES Mensagem(Id_Mensagem) ON DELETE CASCADE
);


CREATE OR REPLACE FUNCTION adicionar_midia(
    p_tipo VARCHAR,
    p_arquivo BYTEA,
    p_nomearquivo VARCHAR,
    p_mimetype VARCHAR,
    p_id_diario INT,
    p_id_observacao INT,
    p_id_mensagem INT
)
RETURNS TABLE (
    id_midia INT,
    tipo VARCHAR,
    nomearquivo VARCHAR,
    mimetype VARCHAR,
    dataupload TIMESTAMP,
    id_diario INT,
    id_observacao INT,
    id_mensagem INT
)
AS $$
BEGIN
    IF p_tipo NOT IN ('foto', 'video', 'documento') THEN
        RAISE EXCEPTION 'Tipo de mídia inválido: %', p_tipo;
    END IF;

    RETURN QUERY
    INSERT INTO Midia (Tipo, Arquivo, NomeArquivo, MimeType, Id_Diario, Id_Observacao, Id_Mensagem)
    VALUES (p_tipo, p_arquivo, p_nomearquivo, p_mimetype, p_id_diario, p_id_observacao, p_id_mensagem)
    RETURNING Id_Midia, Tipo, NomeArquivo, MimeType, DataUpload,
              Id_Diario, Id_Observacao, Id_Mensagem;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION listar_midias_por_diario(p_id_diario INT)
RETURNS TABLE (
    id_midia INT,
    tipo VARCHAR,
    arquivo_base64 TEXT,
    nomearquivo VARCHAR,
    mimetype VARCHAR,
    dataupload TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        Id_Midia,
        Tipo,
        encode(Arquivo, 'base64'),
        NomeArquivo,
        MimeType,
        DataUpload
    FROM Midia
    WHERE Id_Diario = p_id_diario
    ORDER BY DataUpload DESC;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION listar_midias_por_observacao(p_id_observacao INT)
RETURNS TABLE (
    id_midia INT,
    tipo VARCHAR,
    arquivo_base64 TEXT,
    nomearquivo VARCHAR,
    mimetype VARCHAR,
    dataupload TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        Id_Midia,
        Tipo,
        encode(Arquivo, 'base64'),
        NomeArquivo,
        MimeType,
        DataUpload
    FROM Midia
    WHERE Id_Observacao = p_id_observacao
    ORDER BY DataUpload DESC;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION listar_midias_por_mensagem(p_id_mensagem INT)
RETURNS TABLE (
    id_midia INT,
    tipo VARCHAR,
    arquivo_base64 TEXT,
    nomearquivo VARCHAR,
    mimetype VARCHAR,
    dataupload TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        Id_Midia,
        Tipo,
        encode(Arquivo, 'base64'),
        NomeArquivo,
        MimeType,
        DataUpload
    FROM Midia
    WHERE Id_Mensagem = p_id_mensagem
    ORDER BY DataUpload DESC;
END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION excluir_midia(p_id_midia INT)
RETURNS TABLE (
    id_midia INT,
    tipo VARCHAR,
    nomearquivo VARCHAR,
    mimetype VARCHAR,
    dataupload TIMESTAMP
)
AS $$
BEGIN
    RETURN QUERY
    DELETE FROM Midia
    WHERE Id_Midia = p_id_midia
    RETURNING Id_Midia, Tipo, NomeArquivo, MimeType, DataUpload;
END;
$$ LANGUAGE plpgsql;
