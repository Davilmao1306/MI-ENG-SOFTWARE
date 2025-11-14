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
