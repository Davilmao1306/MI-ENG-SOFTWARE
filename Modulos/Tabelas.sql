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
    Id_Plano INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Id_Paciente INT NOT NULL,
    Id_Terapeuta INT NOT NULL,
    Id_Familiar INT NULL, -- Pode ser NULL se não houver um familiar/responsável principal associado no momento da criação
    
    GrauNeurodivergencia VARCHAR(500) NOT NULL,
    ObjetivosTratamento VARCHAR(2000) NOT NULL,
    AbordagemFamilia VARCHAR(2000) NOT NULL,
    CronogramaAtividades VARCHAR(2000) NOT NULL,
    MensagemPlano VARCHAR(2000) NULL,
    
    DataCriacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    DataAssinaturaTerapeuta DATETIME NULL,
    DataAssinaturaFamilia DATETIME NULL,

    -- Chaves Estrangeiras
    FOREIGN KEY (Id_Paciente) REFERENCES Paciente(Id_Paciente),
    FOREIGN KEY (Id_Terapeuta) REFERENCES Terapeuta(Id_Terapeuta),
    FOREIGN KEY (Id_Familiar) REFERENCES Familiar(Id_Familiar)
);


-- Tabela para armazenar o conteúdo do arquivo binário (em BYTEA); perguntar se deseja armazenar diretamente no banco ou apenas o caminho do arquivo.
CREATE TABLE Anexos (
    Id_Anexo SERIAL PRIMARY KEY,
    Id_Plano INT NOT NULL,
    
    NomeArquivo VARCHAR(255) NOT NULL,
    TipoMime VARCHAR(100) NOT NULL,
    DadosArquivo BYTEA NOT NULL, -- Estudar o impacto de performance e tamanho do banco ao armazenar arquivos diretamente e como fazer o SELECT posteriormente.
    DataUpload TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),

    -- Chave Estrangeira
    FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano)
);

-- Tabela com a lista pré-definida de neurodivergências (TEA, TDAH, Dislexia, etc.)
CREATE TABLE Neurodivergencia (
    Id_Neuro INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Sigla VARCHAR(10) UNIQUE NOT NULL, -- Ex: 'TEA', 'TDAH', 'TOC'
    NomeCompleto VARCHAR(100) NULL -- Ex: 'Transtorno do Espectro Autista'
);

-- Tabela que liga um Plano a Múltiplas Neurodivergências
CREATE TABLE PlanoNeurodivergencia (
    Id_Plano INT NOT NULL,
    Id_Neuro INT NOT NULL,
    
    -- Chave Primária Composta para evitar duplicatas e garantir a relação
    PRIMARY KEY (Id_Plano, Id_Neuro),

    -- Chaves Estrangeiras
    FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano),
    FOREIGN KEY (Id_Neuro) REFERENCES Neurodivergencia(Id_Neuro)
);


-- Tabela que liga um Plano a Múltiplos Métodos de Acompanhamento
CREATE TABLE PlanoMetodo (
    Id_Plano INT NOT NULL,
    Id_Metodo INT NOT NULL,
    
    -- Chave Primária Composta
    PRIMARY KEY (Id_Plano, Id_Metodo),

    -- Chaves Estrangeiras
    FOREIGN KEY (Id_Plano) REFERENCES PlanoTerapeutico(Id_Plano),
    FOREIGN KEY (Id_Metodo) REFERENCES MetodoAcompanhamento(Id_Metodo)
);

INSERT INTO MetodoAcompanhamento (Nome) VALUES
('Treinamento Parental'),
('Comunicação Assistiva'),
('Terapia Ocupacional'),
('Fonoaudiologia'),
('Terapia Comportamental Cognitiva'),
('Análise do Comportamento Aplicada (ABA)'), -- Adicionado como um método comum
('Psicomotricidade'), -- Adicionado como um método comum
('Intervenção Nutricional'); -- Adicionado como um método comum

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
-- fim da atualização do plano terapêutico


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