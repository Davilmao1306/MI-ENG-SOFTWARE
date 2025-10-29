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