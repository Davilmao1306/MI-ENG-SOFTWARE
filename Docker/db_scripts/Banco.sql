CREATE EXTENSION IF NOT EXISTS pgcrypto;


--======================================== Tabelas ========================================

CREATE TABLE public.usuario (
	id_usuario int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	email varchar(255) NOT NULL,
	senha varchar(255) NOT NULL,
	consentimentolgdp bool NOT NULL,
	tipo varchar(1) DEFAULT 'C'::character varying NOT NULL,
	CONSTRAINT usuario_email_key UNIQUE (email),
	CONSTRAINT usuario_pk PRIMARY KEY (id_usuario)
);

CREATE TABLE public.terapeuta (
	id_terapeuta int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	nome varchar(255) NOT NULL,
	datanascimento date NOT NULL,
	telefone varchar(12) NOT NULL,
	crp varchar(7) NOT NULL,
	especialidade varchar(255) NOT NULL,
	id_usuario int4 NOT NULL,
	datacadastro timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT terapeuta_crp_key UNIQUE (crp),
	CONSTRAINT terapeuta_pk PRIMARY KEY (id_terapeuta),
	CONSTRAINT fk_terapeuta_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario)
);

CREATE TABLE public.familiar (
	id_familiar int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY
     1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	nome varchar(255) NOT NULL,
	datanascimento date NOT NULL,
	telefone varchar(12) NOT NULL,
	cpf varchar(11) NOT NULL,
	id_usuario int4 NOT NULL,
	datacriacao timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT familiar_cpf_key UNIQUE (cpf),
	CONSTRAINT familiar_pk PRIMARY KEY (id_familiar),
	CONSTRAINT fk_familiar_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario)
);

CREATE TABLE public.paciente (
	id_paciente int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	nome varchar(255) NOT NULL,
	data_nascimento date NOT NULL,
	cpf varchar(11) NOT NULL,
	genero varchar(20) DEFAULT 'Não informado'::character varying NOT NULL,
	telefone varchar(11) DEFAULT '00000000000'::character varying NOT NULL,
	CONSTRAINT paciente_cpf_key UNIQUE (cpf),
	CONSTRAINT paciente_pk PRIMARY KEY (id_paciente)
);

CREATE TABLE public.neurodivergencia (
	id_neuro int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	sigla varchar(20) NOT NULL,
	nomecompleto varchar(100) NULL,
	CONSTRAINT neurodivergencia_pkey PRIMARY KEY (id_neuro),
	CONSTRAINT neurodivergencia_sigla_key UNIQUE (sigla)
);

CREATE TABLE public.metodoacompanhamento (
	id_metodo serial4 NOT NULL,
	nome varchar(255) NOT NULL,
	CONSTRAINT metodoacompanhamento_nome_key UNIQUE (nome),
	CONSTRAINT metodoacompanhamento_pkey PRIMARY KEY (id_metodo)
);

CREATE TABLE public.planoterapeutico (
	id_plano int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	id_paciente int4 NOT NULL,
	id_terapeuta int4 NOT NULL,
	id_familiar int4 NULL,
	grauneurodivergencia varchar(500) NOT NULL,
	objetivostratamento varchar(500) NOT NULL,
	abordagemfamilia varchar(500) NOT NULL,
	cronogramaatividades varchar(500) NOT NULL,
	mensagemplano varchar(500) NULL,
	datacriacao timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	dataassinaturaterapeuta timestamp NULL,
	dataassinaturafamilia timestamp NULL,
	CONSTRAINT planoterapeutico_pkey PRIMARY KEY (id_plano),
	CONSTRAINT planoterapeutico_id_familiar_fkey FOREIGN KEY (id_familiar) REFERENCES public.familiar(id_familiar),
	CONSTRAINT planoterapeutico_id_paciente_fkey FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_paciente),
	CONSTRAINT planoterapeutico_id_terapeuta_fkey FOREIGN KEY (id_terapeuta) REFERENCES public.terapeuta(id_terapeuta)
);

CREATE TABLE public.diariocompartilhado (
	id_diario int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	id_paciente int4 NOT NULL,
	titulo varchar(255) DEFAULT 'Diário de Acompanhamento'::character varying NULL,
	conteudo text DEFAULT ''::text NULL,
	datacriacao timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT diariocompartilhado_id_paciente_key UNIQUE (id_paciente),
	CONSTRAINT diariocompartilhado_pkey PRIMARY KEY (id_diario),
	CONSTRAINT diariocompartilhado_id_paciente_fkey FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_paciente) ON DELETE CASCADE
);

CREATE TABLE public.planoneurodivergencia (
	id_plano int4 NOT NULL,
	id_neuro int4 NOT NULL,
	CONSTRAINT planoneurodivergencia_pkey PRIMARY KEY (id_plano, id_neuro),
	CONSTRAINT planoneurodivergencia_id_neuro_fkey FOREIGN KEY (id_neuro) REFERENCES public.neurodivergencia(id_neuro),
	CONSTRAINT planoneurodivergencia_id_plano_fkey FOREIGN KEY (id_plano) REFERENCES public.planoterapeutico(id_plano)
);

CREATE TABLE public.planometodo (
	id_plano int4 NOT NULL,
	id_metodo int4 NOT NULL,
	CONSTRAINT planometodo_pkey PRIMARY KEY (id_plano, id_metodo),
	CONSTRAINT planometodo_id_metodo_fkey FOREIGN KEY (id_metodo) REFERENCES public.metodoacompanhamento(id_metodo),
	CONSTRAINT planometodo_id_plano_fkey FOREIGN KEY (id_plano) REFERENCES public.planoterapeutico(id_plano)
);

CREATE TABLE public.relatorio (
	id_relatorio int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	arquivo bytea NULL,
	id_paciente int4 NOT NULL,
	id_terapeuta int4 NULL,
	id_familiar int4 NULL,
	CONSTRAINT relatorio_pk PRIMARY KEY (id_relatorio),
	CONSTRAINT fk_relatorio_familiar FOREIGN KEY (id_familiar) REFERENCES public.familiar(id_familiar),
	CONSTRAINT fk_relatorio_paciente FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_paciente),
	CONSTRAINT fk_relatorio_terapeuta FOREIGN KEY (id_terapeuta) REFERENCES public.terapeuta(id_terapeuta)
);

CREATE TABLE public.pacienteterapeuta (
	id_paciente int4 NOT NULL,
	id_terapeuta int4 NOT NULL,
	CONSTRAINT pacienteterapeuta_pk PRIMARY KEY (id_terapeuta, id_paciente),
	CONSTRAINT fk_pt_paciente FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_paciente),
	CONSTRAINT fk_pt_terapeuta FOREIGN KEY (id_terapeuta) REFERENCES public.terapeuta(id_terapeuta)
);

CREATE TABLE public.pacientefamiliar (
	id_familiar int4 NOT NULL,
	id_paciente int4 NOT NULL,
	CONSTRAINT pacientefamiliar_pk PRIMARY KEY (id_familiar, id_paciente),
	CONSTRAINT fk_pf_familiar FOREIGN KEY (id_familiar) REFERENCES public.familiar(id_familiar),
	CONSTRAINT fk_pf_paciente FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_paciente)
);

CREATE TABLE public.clinica (
	id_clinica int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	cnpj varchar(14) NOT NULL,
	senha varchar(255) NOT NULL,
	consentimentolgdp bool NOT NULL,
	id_usuario int4 NOT NULL,
	CONSTRAINT clinica_cnpj_key UNIQUE (cnpj),
	CONSTRAINT clinica_pk PRIMARY KEY (id_clinica),
	CONSTRAINT fk_clinica_usuario FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario)
);

CREATE TABLE public.checklist (
	id_checklist int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	datacriacao timestamp NOT NULL,
	id_terapeuta int4 NOT NULL,
	id_diario int4 NOT NULL,
	titulo varchar(255) NULL,
	CONSTRAINT checklist_pk PRIMARY KEY (id_checklist),
	CONSTRAINT fk_checklist_terapeuta FOREIGN KEY (id_terapeuta) REFERENCES public.terapeuta(id_terapeuta),
	CONSTRAINT fk_checklist_diario FOREIGN KEY (id_diario) REFERENCES public.diariocompartilhado(id_diario)
);

CREATE TABLE public.observacao (
	id_observacao int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	descricao_observacao varchar(255) NOT NULL,
	data_envio date NOT NULL,
	data_edicao date NULL,
	id_checklist int4 NOT NULL,
	id_familiar int4 NOT NULL,
	CONSTRAINT observacao_pk PRIMARY KEY (id_observacao),
	CONSTRAINT fk_observacao_checklist FOREIGN KEY (id_checklist) REFERENCES public.checklist(id_checklist),
	CONSTRAINT fk_observacao_familiar FOREIGN KEY (id_familiar) REFERENCES public.familiar(id_familiar)
);

CREATE TABLE public.mensagem (
	id_mensagem int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	descricao_mensagem varchar(500) NOT NULL,
	data_envio timestamp NOT NULL,
	data_edicao date NULL,
	id_diario int4 NULL,
	id_familiar int4 NULL,
	id_terapeuta int4 NULL,
	CONSTRAINT mensagem_pk PRIMARY KEY (id_mensagem),
	CONSTRAINT fk_msg_familiar FOREIGN KEY (id_familiar) REFERENCES public.familiar(id_familiar),
	CONSTRAINT fk_msg_terapeuta FOREIGN KEY (id_terapeuta) REFERENCES public.terapeuta(id_terapeuta)
);

CREATE TABLE public.midia (
	id_midia serial4 NOT NULL,
	tipo varchar(20) NOT NULL,
	arquivo bytea NOT NULL,
	nomearquivo varchar(255) NULL,
	mimetype varchar(100) NULL,
	dataupload timestamp DEFAULT CURRENT_TIMESTAMP NULL,
	id_diario int4 NULL,
	id_observacao int4 NULL,
	id_mensagem int4 NULL,
	CONSTRAINT midia_pkey PRIMARY KEY (id_midia),
	CONSTRAINT midia_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['foto'::character varying, 'video'::character varying, 'documento'::character varying])::text[]))),
	CONSTRAINT midia_id_diario_fkey FOREIGN KEY (id_diario) REFERENCES public.diariocompartilhado(id_diario) ON DELETE CASCADE,
	CONSTRAINT midia_id_observacao_fkey FOREIGN KEY (id_observacao) REFERENCES public.observacao(id_observacao) ON DELETE CASCADE,
	CONSTRAINT midia_id_mensagem_fkey FOREIGN KEY (id_mensagem) REFERENCES public.mensagem(id_mensagem) ON DELETE CASCADE
);

CREATE TABLE public.feedback (
	id_feedback int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	secao varchar(100) NOT NULL,
	sentimento varchar(20) NOT NULL,
	descricaofeedback varchar(500) NOT NULL,
	respostaterapeuta varchar(500) NULL,
	dataenvio date DEFAULT CURRENT_DATE NULL,
	id_plano int4 NOT NULL,
	id_familiar int4 NOT NULL,
	CONSTRAINT feedback_pkey PRIMARY KEY (id_feedback),
	CONSTRAINT fk_feedback_familiar FOREIGN KEY (id_familiar) REFERENCES public.familiar(id_familiar),
	CONSTRAINT fk_feedback_plano FOREIGN KEY (id_plano) REFERENCES public.planoterapeutico(id_plano)
);

CREATE TABLE public.familiarplanoterapeuta (
	id_plano int4 NOT NULL,
	id_familiar int4 NOT NULL,
	CONSTRAINT familiarplano_pk PRIMARY KEY (id_plano, id_familiar),
	CONSTRAINT fk_fp_familiar FOREIGN KEY (id_familiar) REFERENCES public.familiar(id_familiar)
);

CREATE TABLE public.diarioterapeuta (
	id_diario int4 NOT NULL,
	id_terapeuta int4 NOT NULL,
	CONSTRAINT diarioterapeuta_pk PRIMARY KEY (id_terapeuta, id_diario),
	CONSTRAINT fk_dt_diario FOREIGN KEY (id_diario) REFERENCES public.diariocompartilhado(id_diario),
	CONSTRAINT fk_dt_terapeuta FOREIGN KEY (id_terapeuta) REFERENCES public.terapeuta(id_terapeuta)
);

CREATE TABLE public.diariofamiliar (
	id_diario int4 NOT NULL,
	id_familiar int4 NOT NULL,
	CONSTRAINT diariofamiliar_pk PRIMARY KEY (id_familiar, id_diario),
	CONSTRAINT fk_df_diario FOREIGN KEY (id_diario) REFERENCES public.diariocompartilhado(id_diario),
	CONSTRAINT fk_df_familiar FOREIGN KEY (id_familiar) REFERENCES public.familiar(id_familiar)
);

CREATE TABLE public.checklist_item (
	id_item int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	descricao varchar(255) NOT NULL,
	is_feito bool DEFAULT false NULL,
	id_checklist int4 NOT NULL,
	CONSTRAINT checklist_item_pkey PRIMARY KEY (id_item),
	CONSTRAINT fk_item_checklist FOREIGN KEY (id_checklist) REFERENCES public.checklist(id_checklist) ON DELETE CASCADE
);

CREATE TABLE public.historicoplanoterapeuta (
	id_historico int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	datafim date NOT NULL,
	id_plano int4 NOT NULL,
	CONSTRAINT historicoplano_pk PRIMARY KEY (id_historico)
);

CREATE TABLE public.consulta (
	id_sessao int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	datasessao date NOT NULL,
	descricao_sessao varchar(255) NOT NULL,
	id_paciente int4 NOT NULL,
	id_terapeuta int4 NOT NULL,
	id_plano int4 NOT NULL,
	CONSTRAINT consulta_pk PRIMARY KEY (id_sessao),
	CONSTRAINT fk_consulta_paciente FOREIGN KEY (id_paciente) REFERENCES public.paciente(id_paciente),
	CONSTRAINT fk_consulta_terapeuta FOREIGN KEY (id_terapeuta) REFERENCES public.terapeuta(id_terapeuta)
);

CREATE TABLE public.anexos (
	id_anexo int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	id_plano int4 NOT NULL,
	nomearquivo varchar(255) NOT NULL,
	tipomime varchar(100) NOT NULL,
	dadosarquivo bytea NOT NULL,
	dataupload timestamp DEFAULT now() NOT NULL,
	CONSTRAINT anexos_pkey PRIMARY KEY (id_anexo),
	CONSTRAINT anexos_id_plano_fkey FOREIGN KEY (id_plano) REFERENCES public.planoterapeutico(id_plano)
);

--======================================== Funções ========================================
CREATE OR REPLACE FUNCTION public.adicionar_feedback(p_id_plano integer, p_id_familiar integer, p_secao character varying, p_sentimento character varying, p_descricao character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_feedback INT;
BEGIN
    
    IF NOT EXISTS (SELECT 1 FROM public.planoterapeutico WHERE id_plano = p_id_plano) THEN
        RAISE EXCEPTION 'Plano % não existe.', p_id_plano;
    END IF;

    INSERT INTO public.feedback (
        id_plano, 
        id_familiar, 
        secao, 
        sentimento, 
        descricaofeedback, 
        dataenvio
    )
    VALUES (
        p_id_plano, 
        p_id_familiar, 
        p_secao, 
        p_sentimento, 
        p_descricao, 
        CURRENT_DATE
    )
    RETURNING id_feedback INTO v_id_feedback;

    RETURN v_id_feedback;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.adicionar_item_checklist(p_descricao character varying, p_id_checklist integer)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_item INT;
BEGIN
    INSERT INTO public.checklist_item (descricao, is_feito, id_checklist)
    VALUES (p_descricao, FALSE, p_id_checklist)
    RETURNING id_item INTO v_id_item;
    
    RETURN v_id_item;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.adicionar_metodo_plano(p_id_plano integer, p_id_metodo integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.adicionar_midia(p_tipo character varying, p_arquivo bytea, p_nomearquivo character varying, p_mimetype character varying, p_id_diario integer, p_id_observacao integer, p_id_mensagem integer)
 RETURNS TABLE(out_id_midia integer, out_tipo character varying, out_nomearquivo character varying, out_mimetype character varying, out_dataupload timestamp without time zone, out_id_diario integer, out_id_observacao integer, out_id_mensagem integer)
 LANGUAGE plpgsql
AS $function$ 
BEGIN 
    -- Validar tipo
    IF p_tipo NOT IN ('foto', 'video', 'documento') THEN 
        RAISE EXCEPTION 'Tipo de mídia inválido: %', p_tipo; 
    END IF; 
    
    -- Validar tamanho máximo do arquivo (5MB)
    IF octet_length(p_arquivo) > 5242880 THEN
        RAISE EXCEPTION 'Arquivo excede o tamanho máximo permitido de 5MB.';
    END IF;

    RETURN QUERY 
    INSERT INTO Midia (Tipo, Arquivo, NomeArquivo, MimeType, Id_Diario, Id_Observacao, Id_Mensagem)
    VALUES (p_tipo, p_arquivo, p_nomearquivo, p_mimetype, p_id_diario, p_id_observacao, p_id_mensagem)
    RETURNING 
        Id_Midia,      
        Tipo, 
        NomeArquivo, 
        MimeType, 
        DataUpload,
        Id_Diario, 
        Id_Observacao, 
        Id_Mensagem;
END; 
$function$
;

CREATE OR REPLACE FUNCTION public.adicionar_neurodivergencia_plano(p_id_plano integer, p_id_neuro integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.anexar_arquivo_plano(p_id_plano integer, p_nome_arquivo character varying, p_tipo_mime character varying, p_dados bytea)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PlanoTerapeutico WHERE Id_Plano = p_id_plano) THEN
        RAISE EXCEPTION 'Plano % não existe', p_id_plano;
    END IF;

    INSERT INTO Anexos (Id_Plano, NomeArquivo, TipoMime, DadosArquivo, DataUpload)
    VALUES (p_id_plano, p_nome_arquivo, p_tipo_mime, p_dados, NOW());
END;
$function$
;

CREATE OR REPLACE FUNCTION public.atualizar_diario_compartilhado(p_id_diario integer, p_titulo character varying, p_conteudo text)
 RETURNS TABLE(id_diario integer, titulo character varying, conteudo text, dataregistro timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.atualizar_familiar(p_id_familiar integer, p_nome character varying, p_data_nascimento date, p_telefone character varying, p_cpf character varying, p_email character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_usuario INT;
BEGIN
    -- 1. Descobrir qual é o ID_USUARIO vinculado a este familiar
    SELECT id_usuario INTO v_id_usuario
    FROM public.familiar
    WHERE id_familiar = p_id_familiar;

    -- Se não existir registro, interrompe
    IF v_id_usuario IS NULL THEN
        RAISE EXCEPTION 'Familiar não encontrado.';
    END IF;

    -- 2. Atualizar os dados na tabela FAMILIAR
    UPDATE public.familiar
    SET
        nome = p_nome,
        datanascimento = p_data_nascimento,
        telefone = p_telefone,
        cpf = p_cpf
    WHERE id_familiar = p_id_familiar;

    -- 3. Atualizar o email na tabela USUARIO
    UPDATE public.usuario
    SET email = p_email
    WHERE id_usuario = v_id_usuario;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.atualizar_paciente(p_id_paciente integer, p_nome character varying, p_data_nascimento date, p_telefone character varying, p_cpf character varying, p_genero character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    
    UPDATE public.paciente
    SET
        nome = p_nome,
        data_nascimento = p_data_nascimento,
        telefone = p_telefone,
        cpf = p_cpf,
        genero = p_genero
    WHERE id_paciente = p_id_paciente;

    
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Paciente não encontrado.';
    END IF;

END;
$function$
;
CREATE OR REPLACE FUNCTION public.atualizar_status_item_checklist(p_id_item integer, p_is_feito boolean)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE checklist_item
    SET is_feito = p_is_feito
    WHERE id_item = p_id_item;
    
    IF NOT FOUND THEN
        RAISE NOTICE 'Item % não encontrado para atualização.', p_id_item;
    END IF;
END;
$function$
;

-- DROP FUNCTION public.atualizar_terapeuta(int4, varchar, date, varchar, varchar, varchar, varchar);

CREATE OR REPLACE FUNCTION public.atualizar_terapeuta(p_id_terapeuta integer, p_nome character varying, p_data_nascimento date, p_telefone character varying, p_crp character varying, p_especialidade character varying, p_email character varying)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_usuario INT;
BEGIN
    -- 1. Descobrir qual é o ID_USUARIO vinculado a este terapeuta
    SELECT id_usuario INTO v_id_usuario 
    FROM public.terapeuta 
    WHERE id_terapeuta = p_id_terapeuta;

    -- 2. Atualizar os dados da tabela TERAPEUTA
    UPDATE public.terapeuta
    SET
        nome = p_nome,
        datanascimento = p_data_nascimento,
        telefone = p_telefone,
        crp = p_crp,
        especialidade = p_especialidade
    WHERE id_terapeuta = p_id_terapeuta;

    -- 3. Atualizar o email na tabela USUARIO
    IF v_id_usuario IS NOT NULL THEN
        UPDATE public.usuario
        SET email = p_email
        WHERE id_usuario = v_id_usuario;
    END IF;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.buscar_diario_por_id(p_id_diario integer)
 RETURNS TABLE(id_diario integer, id_paciente integer, id_terapeuta integer, titulo character varying, conteudo text, dataregistro timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.buscar_plano_completo(p_id_plano integer)
 RETURNS TABLE(id_plano integer, paciente_nome character varying, terapeuta_nome character varying, familiar_nome character varying, grau_neurodivergencia character varying, objetivos_tratamento character varying, abordagem_familia character varying, cronograma_atividades character varying, mensagem_plano character varying, data_criacao timestamp without time zone, assinatura_terapeuta timestamp without time zone, assinatura_familia timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;
CREATE OR REPLACE FUNCTION public.buscar_resumo_plano(p_id_plano integer)
 RETURNS TABLE(id_plano integer, paciente_nome character varying, terapeuta_nome character varying, familiar_nome character varying, grau_neurodivergencia character varying, objetivos_tratamento character varying, data_criacao timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

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

CREATE OR REPLACE FUNCTION public.cadastrar_familiar(p_email character varying, p_senha character varying, p_nome character varying, p_data_nascimento date, p_telefone character varying, p_cpf character varying, p_tipo character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_usuario INT;
    v_id_familiar INT;
BEGIN
    
    -- Cria o Usuário
    INSERT INTO usuario (Email, Senha, ConsentimentoLGDP, Tipo)
    VALUES (p_email, crypt(p_senha, gen_salt('bf')), FALSE, p_tipo)
    RETURNING Id_Usuario INTO v_id_usuario;

    -- Cria o Familiar (AGORA COM DATA DE CADASTRO)
    INSERT INTO familiar (
        Nome, 
        DataNascimento, 
        Telefone, 
        CPF, 
        Id_Usuario, 
        DataCadastro -- <--- Coluna Nova
    )
    VALUES (
        p_nome, 
        p_data_nascimento, 
        p_telefone, 
        p_cpf, 
        v_id_usuario, 
        CURRENT_TIMESTAMP -- <--- Salva a data e hora exata de agora
    )
    RETURNING Id_Familiar INTO v_id_familiar;

    RETURN v_id_familiar;
END;
$function$
;
CREATE OR REPLACE FUNCTION public.cadastrar_paciente(p_nome character varying, p_data_nascimento date, p_cpf character varying, p_genero character varying, p_telefone character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_paciente INT;
BEGIN
    -- 1. Cria o Paciente com Data de Cadastro
    INSERT INTO paciente (
        nome, 
        data_nascimento, 
        cpf, 
        genero, 
        telefone, 
        DataCadastro -- <--- Campo Novo
    )
    VALUES (
        p_nome, 
        p_data_nascimento, 
        p_cpf, 
        p_genero, 
        p_telefone, 
        CURRENT_TIMESTAMP -- <--- Salva o momento exato
    )
    RETURNING id_paciente INTO v_id_paciente;

    -- 2. Cria AUTOMATICAMENTE o Diário para este paciente
    INSERT INTO DiarioCompartilhado (Id_Paciente, Titulo, Conteudo)
    VALUES (
        v_id_paciente,
        'Diário de ' || p_nome,
        'Diário de acompanhamento criado automaticamente no cadastro.'
    );

    RETURN v_id_paciente;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.cadastrar_terapeuta(p_email character varying, p_senha character varying, p_nome character varying, p_data_nascimento date, p_telefone character varying, p_crp character varying, p_especialidade character varying, p_tipo character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_usuario INT;
    v_id_terapeuta INT;
BEGIN
    -- 1. Cria o Login (Usuário)
    INSERT INTO usuario (Email, Senha, ConsentimentoLGDP, Tipo)
    VALUES (p_email, crypt(p_senha, gen_salt('bf')), FALSE, p_tipo)
    RETURNING Id_Usuario INTO v_id_usuario;

    -- 2. Cria o Terapeuta vinculado ao usuario com Data de Cadastro
    INSERT INTO terapeuta (
        Nome, 
        DataNascimento, 
        Telefone, 
        CRP, 
        Especialidade, 
        Id_Usuario,
        DataCadastro -- <--- Campo Novo
    )
    VALUES (
        p_nome, 
        p_data_nascimento, 
        p_telefone, 
        p_crp, 
        p_especialidade, 
        v_id_usuario,
        CURRENT_TIMESTAMP -- <--- Salva o momento exato
    )
    RETURNING Id_Terapeuta INTO v_id_terapeuta;

    RETURN v_id_terapeuta;
END;
$function$
;
CREATE OR REPLACE FUNCTION public.criar_checklist_com_titulo(p_id_terapeuta integer, p_id_diario integer, p_titulo character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_checklist INT;
BEGIN
    INSERT INTO public.checklist (datacriacao, id_terapeuta, id_diario, titulo)
    VALUES (CURRENT_TIMESTAMP, p_id_terapeuta, p_id_diario, p_titulo)
    RETURNING id_checklist INTO v_id_checklist;
    
    RETURN v_id_checklist;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.criar_diario_compartilhado(p_id_paciente integer, p_id_terapeuta integer, p_titulo character varying, p_conteudo text)
 RETURNS TABLE(id_diario integer, id_paciente integer, id_terapeuta integer, titulo character varying, conteudo text, dataregistro timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    INSERT INTO DiarioCompartilhado (Id_Paciente, Id_Terapeuta, Titulo, Conteudo)
    VALUES (p_id_paciente, p_id_terapeuta, p_titulo, p_conteudo)
    RETURNING Id_Diario, Id_Paciente, Id_Terapeuta, Titulo, Conteudo, DataRegistro;
END;
$function$
;


CREATE OR REPLACE FUNCTION public.criar_plano_terapeutico(p_id_paciente integer, p_id_terapeuta integer, p_grau_neurodivergencia character varying, p_objetivos_tratamento character varying, p_abordagem_familia character varying, p_cronograma_atividades character varying, p_id_familiar integer DEFAULT NULL::integer, p_mensagem_plano character varying DEFAULT NULL::character varying)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.desvincular_paciente_familiar(p_id_paciente integer, p_id_familiar integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_existe BOOLEAN;
BEGIN
    SELECT TRUE INTO v_existe
    FROM pacientefamiliar
    WHERE Id_Paciente = p_id_paciente AND Id_Familiar = p_id_familiar;

    IF NOT v_existe THEN
        RETURN 'Vínculo não existe.';
    END IF;

    DELETE FROM pacientefamiliar
    WHERE Id_Paciente = p_id_paciente AND Id_Familiar = p_id_familiar;

    RETURN 'Vínculo paciente-familiar removido com sucesso.';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.desvincular_paciente_terapeuta(p_id_paciente integer, p_id_terapeuta integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_existe BOOLEAN;
BEGIN
    SELECT TRUE INTO v_existe
    FROM pacienteterapeuta
    WHERE Id_Paciente = p_id_paciente AND Id_Terapeuta = p_id_terapeuta;

    IF NOT v_existe THEN
        RETURN 'Vínculo não existe.';
    END IF;

    DELETE FROM pacienteterapeuta
    WHERE Id_Paciente = p_id_paciente AND Id_Terapeuta = p_id_terapeuta;

    RETURN 'Vínculo paciente-terapeuta removido com sucesso.';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.excluir_diario_compartilhado(p_id_diario integer)
 RETURNS TABLE(id_diario integer, id_paciente integer, id_terapeuta integer, titulo character varying, conteudo text, dataregistro timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.excluir_familiar(p_id_familiar integer)
 RETURNS TABLE(out_id_familiar integer, out_nome_excluido character varying)
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_usuario INT;
    v_nome VARCHAR;
BEGIN
    -- 1. Verifica se o familiar existe e pega o ID do usuário
    -- Usamos o alias 'f' para dizer explicitamente f.id_familiar
    SELECT f.id_usuario, f.nome INTO v_id_usuario, v_nome
    FROM public.familiar f
    WHERE f.id_familiar = p_id_familiar;

    IF v_id_usuario IS NULL THEN
        RAISE EXCEPTION 'Familiar com ID % não encontrado.', p_id_familiar;
    END IF;

    -- 2. Remove Vínculos (Usando aliases para evitar ambiguidade)
    DELETE FROM public.pacientefamiliar pf WHERE pf.id_familiar = p_id_familiar;
    DELETE FROM public.diariofamiliar df WHERE df.id_familiar = p_id_familiar;
    DELETE FROM public.familiarplanoterapeuta fp WHERE fp.id_familiar = p_id_familiar;

    -- 3. Remove Conteúdos gerados pelo familiar
    DELETE FROM public.feedback fb WHERE fb.id_familiar = p_id_familiar;
    DELETE FROM public.mensagem m WHERE m.id_familiar = p_id_familiar;
    DELETE FROM public.observacao o WHERE o.id_familiar = p_id_familiar;

    -- 4. Remove o perfil do Familiar
    DELETE FROM public.familiar f WHERE f.id_familiar = p_id_familiar;

    -- 5. Remove o Login (Usuário)
    DELETE FROM public.usuario u WHERE u.id_usuario = v_id_usuario;

    -- Retorna os dados
    RETURN QUERY SELECT p_id_familiar, v_nome;
END;
$function$
;
CREATE OR REPLACE FUNCTION public.excluir_midia(p_id_midia integer)
 RETURNS TABLE(id_midia integer, tipo character varying, nomearquivo character varying, mimetype character varying, dataupload timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    DELETE FROM Midia
    WHERE Id_Midia = p_id_midia
    RETURNING Id_Midia, Tipo, NomeArquivo, MimeType, DataUpload;
END;
$function$
;


CREATE OR REPLACE FUNCTION public.excluir_paciente(p_id_paciente integer)
 RETURNS TABLE(out_id_paciente integer, out_nome_excluido character varying)
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_nome VARCHAR;
BEGIN
    -- Verifica se o paciente existe e pega o nome para retorno
    SELECT nome INTO v_nome
    FROM public.paciente
    WHERE id_paciente = p_id_paciente;

    IF v_nome IS NULL THEN
        RAISE EXCEPTION 'Paciente com ID % não encontrado.', p_id_paciente;
    END IF;

    -- Remove Vínculos (Tabelas de ligação)
    DELETE FROM public.pacienteterapeuta WHERE id_paciente = p_id_paciente;
    DELETE FROM public.pacientefamiliar WHERE id_paciente = p_id_paciente;

    -- Remove Diários e acessos ao diário
    -- Primeiro removemos as permissões de acesso ao diário deste paciente
    DELETE FROM public.diarioterapeuta 
    WHERE id_diario IN (SELECT id_diario FROM public.diariocompartilhado WHERE id_paciente = p_id_paciente);
    
    DELETE FROM public.diariofamiliar 
    WHERE id_diario IN (SELECT id_diario FROM public.diariocompartilhado WHERE id_paciente = p_id_paciente);

    -- O banco geralmente tem CASCADE configurado nas mensagens/midias quando o diário é apagado.
    -- Se não tiver, o DELETE abaixo falharia, mas assumindo que sua tabela diario tem CASCADE nas filhas:
    DELETE FROM public.diariocompartilhado WHERE id_paciente = p_id_paciente;

    -- Remove Planos Terapêuticos
    -- Limpa tabelas filhas do Plano antes de deletar o Plano
    DELETE FROM public.anexos 
    WHERE id_plano IN (SELECT id_plano FROM public.planoterapeutico WHERE id_paciente = p_id_paciente);
    
    DELETE FROM public.planometodo 
    WHERE id_plano IN (SELECT id_plano FROM public.planoterapeutico WHERE id_paciente = p_id_paciente);
    
    DELETE FROM public.planoneurodivergencia 
    WHERE id_plano IN (SELECT id_plano FROM public.planoterapeutico WHERE id_paciente = p_id_paciente);
    
    DELETE FROM public.familiarplanoterapeuta 
    WHERE id_plano IN (SELECT id_plano FROM public.planoterapeutico WHERE id_paciente = p_id_paciente);

    -- Deleta os Planos
    DELETE FROM public.planoterapeutico WHERE id_paciente = p_id_paciente;

    -- Finalmente, remove o Paciente
    DELETE FROM public.paciente WHERE id_paciente = p_id_paciente;

    -- Retorna os dados do excluído
    RETURN QUERY SELECT p_id_paciente, v_nome;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.excluir_terapeuta(p_id_terapeuta integer)
 RETURNS TABLE(out_id_terapeuta integer, out_nome_excluido character varying)
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_id_usuario INT;
    v_nome VARCHAR;
BEGIN
    -- Verifica se o terapeuta existe e pega o ID do usuário vinculado
    SELECT t.id_usuario, t.nome INTO v_id_usuario, v_nome
    FROM public.terapeuta t
    WHERE t.id_terapeuta = p_id_terapeuta;

    IF v_id_usuario IS NULL THEN
        RAISE EXCEPTION 'Terapeuta com ID % não encontrado.', p_id_terapeuta;
    END IF;

    -- Remove Vínculos (Tabelas de ligação)
    -- Vínculo com Pacientes
    DELETE FROM public.pacienteterapeuta pt WHERE pt.id_terapeuta = p_id_terapeuta;
    
    -- Vínculo com Diários (Permissão de acesso)
    DELETE FROM public.diarioterapeuta dt WHERE dt.id_terapeuta = p_id_terapeuta;

    -- Remove Conteúdos gerados pelo terapeuta
    -- Feedbacks dados pelo terapeuta
    DELETE FROM public.feedback fb WHERE fb.respostaterapeuta IS NOT NULL 
    AND fb.id_plano IN (SELECT id_plano FROM public.planoterapeutico WHERE id_terapeuta = p_id_terapeuta);
    
    -- Mensagens no diário
    DELETE FROM public.mensagem m WHERE m.id_terapeuta = p_id_terapeuta;
    DELETE FROM public.anexos a 
    WHERE a.id_plano IN (SELECT id_plano FROM public.planoterapeutico WHERE id_terapeuta = p_id_terapeuta);
    
    DELETE FROM public.planometodo pm
    WHERE pm.id_plano IN (SELECT id_plano FROM public.planoterapeutico WHERE id_terapeuta = p_id_terapeuta);
    
    DELETE FROM public.planoneurodivergencia pn
    WHERE pn.id_plano IN (SELECT id_plano FROM public.planoterapeutico WHERE id_terapeuta = p_id_terapeuta);

    -- Agora deleta o Plano Terapêutico em si
    DELETE FROM public.planoterapeutico p WHERE p.id_terapeuta = p_id_terapeuta;

    -- Deleta Checklists criados por ele
    DELETE FROM public.checklist c WHERE c.id_terapeuta = p_id_terapeuta;

    -- Remove o perfil do Terapeuta
    DELETE FROM public.terapeuta t WHERE t.id_terapeuta = p_id_terapeuta;

    -- Remove o Login (Usuário)
    DELETE FROM public.usuario u WHERE u.id_usuario = v_id_usuario;

    -- Retorna os dados do excluído
    RETURN QUERY SELECT p_id_terapeuta, v_nome;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_anexos_plano(p_id_plano integer)
 RETURNS TABLE(id_anexo integer, nome_arquivo character varying, tipo_mime character varying, data_upload timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.listar_checklists_por_paciente(p_id_paciente integer)
 RETURNS TABLE(id_checklist integer, titulo_checklist character varying, data_criacao timestamp without time zone, autor_nome character varying, itens json)
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT 
    c.id_checklist, 
    COALESCE(c.titulo, 'Checklist Sem Título'), 
    c.datacriacao,
    
    -- Busca nome do terapeuta
    t.Nome as autor_nome,

    COALESCE(
        (SELECT json_agg(json_build_object('id', i.id_item, 'text', i.descricao, 'checked', i.is_feito))
         FROM checklist_item i WHERE i.id_checklist = c.id_checklist),
        '[]'::json
    ) AS itens

  FROM checklist c
  JOIN diariocompartilhado d ON c.id_diario = d.id_diario
  LEFT JOIN terapeuta t ON c.id_terapeuta = t.id_terapeuta -- Join para pegar nome
  WHERE d.id_paciente = p_id_paciente
  ORDER BY c.datacriacao DESC;
END;
$function$
;
CREATE OR REPLACE FUNCTION public.listar_diarios_compartilhados()
 RETURNS TABLE(id_diario integer, id_paciente integer, id_terapeuta integer, titulo character varying, conteudo text, dataregistro timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT Id_Diario, Id_Paciente, Id_Terapeuta, Titulo, Conteudo, DataRegistro
    FROM DiarioCompartilhado
    ORDER BY DataRegistro DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_diarios_por_paciente(p_id_paciente integer)
 RETURNS TABLE(id_diario integer, titulo character varying, conteudo text, datacriacao timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    IF p_id_paciente IS NULL THEN
        RAISE EXCEPTION 'Id do paciente é obrigatório';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM paciente WHERE id_paciente = p_id_paciente) THEN
        RAISE EXCEPTION 'Paciente % não existe', p_id_paciente;
    END IF;

    RETURN QUERY
    SELECT 
        d.id_diario,
        d.titulo,
        d.conteudo,
        d.datacriacao
    FROM diariocompartilhado AS d
    WHERE d.id_paciente = p_id_paciente
    ORDER BY d.datacriacao DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_diarios_por_terapeuta(p_id_terapeuta integer)
 RETURNS TABLE(id_diario integer, id_paciente integer, titulo character varying, conteudo text, dataregistro timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;
CREATE OR REPLACE FUNCTION public.listar_feedbacks_por_plano(p_id_plano integer)
 RETURNS TABLE(id_feedback integer, nome_familiar character varying, secao character varying, sentimento character varying, comentario character varying, data_envio date, resposta_terapeuta character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        f.id_feedback,
        fam.nome AS nome_familiar, -- Pega o nome na tabela Familiar
        f.secao,
        f.sentimento,
        f.descricaofeedback AS comentario,
        f.dataenvio,
        f.respostaterapeuta
    FROM public.feedback f
    JOIN public.familiar fam ON f.id_familiar = fam.id_familiar
    WHERE f.id_plano = p_id_plano
    ORDER BY f.dataenvio DESC; -- Mais recentes primeiro
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_mensagens_feed(p_id_paciente integer)
 RETURNS TABLE(id_mensagem integer, id_diario integer, autor_nome character varying, data_envio timestamp without time zone, descricao character varying, id_terapeuta integer, id_familiar integer)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        m.Id_Mensagem, 
        m.Id_Diario,
        -- Busca o nome real fazendo um "truque" com COALESCE
        COALESCE(t.Nome, f.Nome, 'Usuário Desconhecido')::VARCHAR as Autor_Nome,
        m.Data_Envio,
        m.Descricao_Mensagem,
        m.Id_Terapeuta,
        m.Id_Familiar
    FROM Mensagem m
    JOIN DiarioCompartilhado d ON m.Id_Diario = d.Id_Diario
    -- Tenta ligar com Terapeuta
    LEFT JOIN Terapeuta t ON m.Id_Terapeuta = t.Id_Terapeuta
    -- Tenta ligar com Familiar
    LEFT JOIN Familiar f ON m.Id_Familiar = f.Id_Familiar
    WHERE d.Id_Paciente = p_id_paciente
    ORDER BY m.Data_Envio DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_metodos_plano(p_id_plano integer)
 RETURNS TABLE(nome_metodo character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT m.Nome
    FROM PlanoMetodo pm
    JOIN MetodoAcompanhamento m ON pm.Id_Metodo = m.Id_Metodo
    WHERE pm.Id_Plano = p_id_plano;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_midias_por_diario(p_id_diario integer)
 RETURNS TABLE(id_midia integer, tipo character varying, arquivo_base64 text, nomearquivo character varying, mimetype character varying, dataupload timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        m.Id_Midia,
        m.Tipo,
        encode(m.Arquivo, 'base64'),
        m.NomeArquivo,
        m.MimeType,
        m.DataUpload
    FROM Midia m
    WHERE m.Id_Diario = p_id_diario
    ORDER BY m.DataUpload DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_midias_por_mensagem(p_id_mensagem integer)
 RETURNS TABLE(id_midia integer, tipo character varying, arquivo_base64 text, nomearquivo character varying, mimetype character varying, dataupload timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        m.Id_Midia,      -- 'm.' especifica que vem da tabela
        m.Tipo,
        encode(m.Arquivo, 'base64'),
        m.NomeArquivo,
        m.MimeType,
        m.DataUpload
    FROM Midia m         -- Definimos o apelido 'm' aqui
    WHERE m.Id_Mensagem = p_id_mensagem
    ORDER BY m.DataUpload DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_midias_por_observacao(p_id_observacao integer)
 RETURNS TABLE(id_midia integer, tipo character varying, arquivo_base64 text, nomearquivo character varying, mimetype character varying, dataupload timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        m.Id_Midia,
        m.Tipo,
        encode(m.Arquivo, 'base64'),
        m.NomeArquivo,
        m.MimeType,
        m.DataUpload
    FROM Midia m
    WHERE m.Id_Observacao = p_id_observacao
    ORDER BY m.DataUpload DESC;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_neurodivergencias_plano(p_id_plano integer)
 RETURNS TABLE(sigla character varying, nome_completo character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT n.Sigla, n.NomeCompleto
    FROM PlanoNeurodivergencia pn
    JOIN Neurodivergencia n ON pn.Id_Neuro = n.Id_Neuro
    WHERE pn.Id_Plano = p_id_plano;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.listar_planos_familiar(p_id_familiar integer)
 RETURNS TABLE(id_plano integer, paciente_nome character varying, terapeuta_nome character varying, grau_neurodivergencia character varying, objetivos_tratamento character varying, data_criacao timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.listar_planos_paciente(p_id_paciente integer)
 RETURNS TABLE(id_plano integer, terapeuta_nome character varying, familiar_nome character varying, grau_neurodivergencia character varying, objetivos_tratamento character varying, data_criacao timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;
CREATE OR REPLACE FUNCTION public.listar_planos_terapeuta(p_id_terapeuta integer)
 RETURNS TABLE(id_plano integer, paciente_nome character varying, familiar_nome character varying, grau_neurodivergencia character varying, objetivos_tratamento character varying, data_criacao timestamp without time zone)
 LANGUAGE plpgsql
AS $function$
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
$function$
;
CREATE OR REPLACE FUNCTION public.listar_vinculos_por_familiar(p_id_familiar integer)
 RETURNS TABLE(id_paciente integer, nome_paciente character varying, cpf_paciente character varying, data_nascimento date)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT 
        p.id_paciente,
        p.nome,
        p.cpf,
        p.data_nascimento
    FROM public.pacientefamiliar pf
    JOIN public.paciente p ON pf.id_paciente = p.id_paciente
    WHERE pf.id_familiar = p_id_familiar;
END;
$function$
;
CREATE OR REPLACE FUNCTION public.registrar_consentimento(p_id_usuario integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE usuario
    SET ConsentimentoLGDP = TRUE
    WHERE Id_Usuario = p_id_usuario;
END;
$function$
;
CREATE OR REPLACE FUNCTION public.validar_login(p_email character varying, p_senha character varying)
 RETURNS TABLE(id_usuario integer, email character varying, consentimento boolean, tipo character varying)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT u.Id_Usuario, u.Email, u.ConsentimentoLGDP, u.Tipo
    FROM usuario u
    WHERE u.email = p_email
      AND u.senha = crypt(p_senha, u.Senha);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.vincular_familiar_plano(p_id_plano integer, p_id_familiar integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.vincular_paciente_familiar(p_id_paciente integer, p_id_familiar integer, p_parentesco character varying)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_existe BOOLEAN;
    v_diario_id INT;
BEGIN
    -- Validações
    IF NOT EXISTS (SELECT 1 FROM paciente WHERE Id_Paciente = p_id_paciente) THEN
        RAISE EXCEPTION 'Paciente com ID % não existe.', p_id_paciente;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM familiar WHERE Id_Familiar = p_id_familiar) THEN
        RAISE EXCEPTION 'Familiar com ID % não existe.', p_id_familiar;
    END IF;

    -- Verifica vínculo
    SELECT TRUE INTO v_existe
    FROM pacientefamiliar
    WHERE Id_Paciente = p_id_paciente AND Id_Familiar = p_id_familiar;

    IF v_existe THEN
        -- Se já existe, apenas atualiza o parentesco se foi informado
        IF p_parentesco IS NOT NULL THEN
            UPDATE pacientefamiliar 
            SET parentesco = p_parentesco 
            WHERE Id_Paciente = p_id_paciente AND Id_Familiar = p_id_familiar;
        END IF;
        
        -- Garante acesso ao diário
        SELECT Id_Diario INTO v_diario_id FROM DiarioCompartilhado WHERE Id_Paciente = p_id_paciente LIMIT 1;
        IF v_diario_id IS NOT NULL THEN
            INSERT INTO diariofamiliar (Id_Diario, Id_Familiar) VALUES (v_diario_id, p_id_familiar) ON CONFLICT DO NOTHING;
        END IF;
        
        RETURN 'Vínculo atualizado com sucesso.';
    END IF;

    -- Inserindo o vínculo COM o parentesco
    INSERT INTO pacientefamiliar (Id_Familiar, Id_Paciente, parentesco)
    VALUES (p_id_familiar, p_id_paciente, p_parentesco);

    -- Lógica do Diário (Mantida)
    SELECT Id_Diario INTO v_diario_id
    FROM DiarioCompartilhado
    WHERE Id_Paciente = p_id_paciente
    LIMIT 1;

    IF v_diario_id IS NOT NULL THEN
        INSERT INTO diariofamiliar (Id_Diario, Id_Familiar)
        VALUES (v_diario_id, p_id_familiar)
        ON CONFLICT DO NOTHING;
    END IF;

    RETURN 'Vínculo criado com sucesso.';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.vincular_paciente_familiar(p_id_paciente integer, p_id_familiar integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_existe BOOLEAN;
    v_diario_id INT; -- Variável para armazenar o ID do diário
BEGIN
    -- Verifica se paciente existe
    IF NOT EXISTS (SELECT 1 FROM paciente WHERE Id_Paciente = p_id_paciente) THEN
        RAISE EXCEPTION 'Paciente com ID % não existe.', p_id_paciente;
    END IF;

    -- Verifica se familiar existe
    IF NOT EXISTS (SELECT 1 FROM familiar WHERE Id_Familiar = p_id_familiar) THEN
        RAISE EXCEPTION 'Familiar com ID % não existe.', p_id_familiar;
    END IF;

    -- Verifica se já há vínculo na tabela de relacionamento Paciente-Familiar
    SELECT TRUE INTO v_existe
    FROM pacientefamiliar
    WHERE Id_Paciente = p_id_paciente AND Id_Familiar = p_id_familiar;

    IF v_existe THEN
        -- Se já existe o vínculo de parentesco, verificamos se falta o vínculo do diário
        SELECT Id_Diario INTO v_diario_id FROM DiarioCompartilhado WHERE Id_Paciente = p_id_paciente LIMIT 1;
        
        IF v_diario_id IS NOT NULL THEN
            INSERT INTO diariofamiliar (Id_Diario, Id_Familiar)
            VALUES (v_diario_id, p_id_familiar)
            ON CONFLICT DO NOTHING;
        END IF;

        RETURN 'Vínculo já existente (Acesso ao diário verificado).';
    END IF;

    -- Inserindo o vínculo de parentesco (Paciente - Familiar)
    INSERT INTO pacientefamiliar (Id_Familiar, Id_Paciente)
    VALUES (p_id_familiar, p_id_paciente);

    -- A. Busca o ID do Diário deste paciente
    SELECT Id_Diario INTO v_diario_id
    FROM DiarioCompartilhado
    WHERE Id_Paciente = p_id_paciente
    LIMIT 1;

    
    IF v_diario_id IS NOT NULL THEN
        INSERT INTO diariofamiliar (Id_Diario, Id_Familiar)
        VALUES (v_diario_id, p_id_familiar)
        ON CONFLICT DO NOTHING; -- Evita erro se já estiver lá
    END IF;

    RETURN 'Vínculo paciente-familiar criado e acesso ao diário concedido com sucesso.';
END;
$function$
;

CREATE OR REPLACE FUNCTION public.vincular_paciente_terapeuta(p_id_paciente integer, p_id_terapeuta integer)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_diario_id INT;
BEGIN
   
    IF NOT EXISTS (SELECT 1 FROM paciente WHERE Id_Paciente = p_id_paciente) THEN
        RAISE EXCEPTION 'Paciente % não existe.', p_id_paciente;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM terapeuta WHERE Id_Terapeuta = p_id_terapeuta) THEN
        RAISE EXCEPTION 'Terapeuta % não existe.', p_id_terapeuta;
    END IF;

    
    INSERT INTO pacienteterapeuta (Id_Terapeuta, Id_Paciente)
    VALUES (p_id_terapeuta, p_id_paciente)
    ON CONFLICT DO NOTHING;

    
    SELECT Id_Diario INTO v_diario_id
    FROM DiarioCompartilhado
    WHERE Id_Paciente = p_id_paciente
    LIMIT 1;

    
    
    IF v_diario_id IS NULL THEN
        INSERT INTO DiarioCompartilhado (Id_Paciente, Titulo, Conteudo)
        VALUES (
            p_id_paciente, 
            'Diário do Paciente', 
            'Diário inicial criado automaticamente no vínculo.'
        )
        RETURNING Id_Diario INTO v_diario_id;
    END IF;

    INSERT INTO diarioterapeuta (Id_Diario, Id_Terapeuta)
    VALUES (v_diario_id, p_id_terapeuta)
    ON CONFLICT DO NOTHING;

    RETURN 'Vínculo criado e terapeuta vinculado ao diário com sucesso.';
END;
$function$
;


CREATE OR REPLACE FUNCTION atualizar_dados_plano(
    p_id_plano INT,
    p_grau_neuro_texto VARCHAR, -- O texto descritivo
    p_objetivos VARCHAR,
    p_abordagem VARCHAR,
    p_cronograma VARCHAR,
    p_mensagem VARCHAR
)
RETURNS VOID AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM PlanoTerapeutico WHERE Id_Plano = p_id_plano) THEN
        RAISE EXCEPTION 'Plano % não existe', p_id_plano;
    END IF;

    UPDATE PlanoTerapeutico
    SET 
        GrauNeurodivergencia = p_grau_neuro_texto,
        ObjetivosTratamento = p_objetivos,
        AbordagemFamilia = p_abordagem,
        CronogramaAtividades = p_cronograma,
        MensagemPlano = p_mensagem
    WHERE Id_Plano = p_id_plano;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION limpar_vinculos_plano(p_id_plano INT)
RETURNS VOID AS $$
BEGIN
    -- Remove todos os vínculos atuais para que o Python possa inserir os novos
    DELETE FROM PlanoNeurodivergencia WHERE Id_Plano = p_id_plano;
    DELETE FROM PlanoMetodo WHERE Id_Plano = p_id_plano;
END;
$$ LANGUAGE plpgsql;