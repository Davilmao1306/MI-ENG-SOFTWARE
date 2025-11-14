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
