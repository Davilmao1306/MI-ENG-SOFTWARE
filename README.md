# 🧠 NeuroLink: Sistema de Gestão Terapêutica

## 📋 Descrição do Projeto

O **NeuroLink** é uma aplicação completa desenvolvida para clínicas e terapeutas que buscam otimizar a gestão de pacientes, planos terapêuticos e o envolvimento familiar no tratamento. O sistema oferece interfaces dedicadas para Clínicas, Terapeutas e Familiares, permitindo o cadastro de usuários, a vinculação de pacientes a seus responsáveis/terapeutas e a criação de um diário de acompanhamento compartilhado para que tanto familiares quanto terapeutas possam se comunicar em prol do tratamento do paciente. Nele o usuário poderá mandar fotos, links, documentos que irão auxiliar a comunicação e o tratamento do paciente.

O projeto é dividido em um *frontend* (aplicação web) e um *backend* (API RESTful) que se comunicam para persistir e gerenciar os dados.

---

## ✨ Funcionalidades Principais

* **Múltiplos Perfis de Acesso:** Login e dashboards específicos para:
    * **Clínica:** Gestão de pacientes, terapeutas e familiares.
    * **Terapeuta:** Acesso à lista de pacientes vinculados, criação de planos e diário de acompanhamento.
    * **Familiar:** Acesso a informações e planos dos pacientes vinculados (Filho/Responsável).
* **Gestão de Pacientes:** Cadastro, edição, remoção/inativação e visualização de pacientes.
* **Vinculação de Entidades:** Permite vincular pacientes a múltiplos terapeutas e a familiares/responsáveis.
* **Planos Terapêuticos:** Criação e acesso a planos de tratamento por terapeutas e familiares.
* **Diário Compartilhado:** Funcionalidade de diário para acompanhamento e notas.
* **Autenticação Segura:** Login, recuperação e redefinição de senha.

---

## 💻 Tecnologias Utilizadas

O projeto utiliza uma arquitetura moderna com *frontend* e *backend* separados.

### Frontend
| Tecnologia | Descrição |
| :--- | :--- |
| **React** | Biblioteca JavaScript para construção de interfaces de usuário. |
| **Vite** | Ferramenta de *build* e desenvolvimento rápido. |
| **React Router DOM** | Roteamento e navegação na aplicação. |
| **React Icons** | Coleção de ícones para a interface. |
| **CSS Modules/Estilos** | Estilização da aplicação. |

### Backend
| Tecnologia | Descrição |
| :--- | :--- |
| **Python** | Linguagem de programação principal. |
| **Django** | Framework Web de alto nível (provavelmente com Django REST Framework para API). |
| **psycopg** | Adaptador para conexão com banco de dados PostgreSQL. |
| **PostgreSQL** | Banco de dados relacional para persistência de dados. |

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

* [Python](https://www.python.org/downloads/) (Recomendado 3.10+)
* [Node.js](https://nodejs.org/en/download/) (Recomendado 18+)
* [PostgreSQL](https://www.postgresql.org/download/)

### 1. Configuração do Backend (Django)

1.  **Clone o Repositório:**
    ```bash
    git clone [https://www.youtube.com/watch?v=BEsAXYPulBo](https://www.youtube.com/watch?v=BEsAXYPulBo)
    cd MI-ENG-SOFTWARE
    ```
   
2. **É importante caso esteja rodando no powershel do windows utilizar o código abaixo**
   ```bash
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```
3.   **Crie e Ative o Ambiente Virtual:**
    ```bash
    python -m venv venv
    # No Windows
    .\venv\Scripts\activate
    # No Linux/macOS
    source venv/bin/activate
    ```
4.  **Instale as Dependências Python:**
    ```bash
    # Se você tiver um requirements.txt
    pip install -r requirements.txt
    # Ou instale as dependências conhecidas (Django, djangorestframework, psycopg)
    # pip install django djangorestframework psycopg
    ```
5.  **Configuração do Banco de Dados:**
    * Rode o docker-compose.yml
    

6.  **Rodar o Servidor:**
    ```bash
    # Se aplicável:
    # python manage.py migrate
    # python manage.py runserver
    ```
    O backend deve estar rodando em `http://localhost:8000/`.

### 2. Configuração do Frontend (React)

1.  **Navegue para a pasta do frontend:**
    ```bash
    cd front-end
    ```
2. **É importante caso esteja rodando no powershel do windows utilizar o código abaixo**
   ```bash
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   ```
3.    **Instale as Dependências Node:**
    ```bash
    npm install
    # ou
    yarn install
    ```
4.  **Rodar a Aplicação:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    O frontend será iniciado, geralmente em `http://localhost:5173/` ou similar.

---

## 🗺️ Rotas de API Importantes

Aqui estão alguns *endpoints* inferidos com base na funcionalidade do projeto:
1. **Endpoints /login**
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` |	`/login/api/login/` |	Realiza o login do usuário (retorna tokens). |
| `POST` |	`/login/auth/esqueci-senha` |	Solicita recuperação de senha. |
| `POST` |	`/login/auth/redefinir-senha` |	Confirma a redefinição de senha. |
2. **Endpoints /cadastro**
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` |	`/cadastro/pacientes` | Cadastra um novo paciente. |
| `POST` |	`/cadastro/terapeutas ` |	Cadastra um novo terapeuta. |
| `POST` |	`/cadastro/familiares` |	Cadastra um novo familiar. |
| `POST` |	`/cadastro/clinicas`	|Cadastra uma nova clínica. |
| `GET` |	`/cadastro/lista-pacientes` |	Lista todos os pacientes cadastrados. |
| `GET` |	`/cadastro/lista-terapeutas` |	Lista todos os terapeutas. |
| `GET` |	`/cadastro/lista-usuarios` |	Lista geral de usuários. |
| `PUT` |	`/cadastro/editar-paciente/<id>`	|Atualiza dados de um paciente específico. |
| `DELETE` |	`/cadastro/paciente/excluir/<id>` |	Remove um paciente do sistema. |
3. **Endpoints /vincular**
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/vincular/pacientes/vincular-familiar/` | Cria vínculo entre Paciente e Familiar. |
| `POST` | `/vincular/pacientes/vincular-terapeuta/` | Cria vínculo entre Paciente e Terapeuta. |
4. **Endpoints /plano**
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/plano/criar` | Cria um novo plano terapêutico. |
| `POST` | `/plano/feedback/adicionar` | Adiciona um feedback ao plano. |
| `POST` | `/plano/anexar-arquivo` | Anexa arquivos (PDF/Img) ao plano. |
| `POST` | `/plano/adicionar-neuro` | Adiciona neurodivergência ao plano. |
| `POST` | `/plano/adicionar-metodo` | Adiciona método terapêutico ao plano. |
| `PUT` | `/plano/editar/<id>` | Edita as informações de um plano existente. |
| `GET` | `/plano/<id>` | Busca os detalhes completos de um plano. |
5. **Endpoints /diario**
| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/diario/midia/adicionar` | Adiciona foto/vídeo ao diário. |
| `POST` | `/diario/mensagem/enviar` | Envia uma mensagem no feed. |
| `POST` | `/diario/checklist/criar` | Cria um novo checklist no diário. |
| `GET` | `/diario/listar` | Lista diários (geral). |
| `GET` | `/diario/paciente/<id>` | Lista diários de um paciente específico. |
| `GET` | `/diario/<id>` | Visualiza um diário específico. |
| `GET` | `/diario/feed/<id_paciente>` | Retorna o feed completo do paciente. |

---

## 🤝 Equipe de Desenvolvimento

Detalhes sobre como contribuir para o projeto (se aplicável).
