# 🧠 NeuroLink: Sistema de Gestão Terapêutica

## 📋 Descrição do Projeto

O **NeuroLink** é uma aplicação completa desenvolvida para clínicas e terapeutas que buscam otimizar a gestão de pacientes, planos terapêuticos e o envolvimento familiar no tratamento. O sistema oferece interfaces dedicadas para Clínicas, Terapeutas e Familiares, permitindo o cadastro de usuários, a vinculação de pacientes a seus responsáveis/terapeutas e a criação de um diário de acompanhamento compartilhado.

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
2.  **Crie e Ative o Ambiente Virtual:**
    ```bash
    python -m venv venv
    # No Windows
    .\venv\Scripts\activate
    # No Linux/macOS
    source venv/bin/activate
    ```
3.  **Instale as Dependências Python:**
    ```bash
    # Se você tiver um requirements.txt
    pip install -r requirements.txt
    # Ou instale as dependências conhecidas (Django, djangorestframework, psycopg)
    # pip install django djangorestframework psycopg
    ```
4.  **Configuração do Banco de Dados:**
    * Crie um banco de dados PostgreSQL (ex: `neurolink_db`).
    * Edite o arquivo de configurações do Django (provavelmente `sistema/settings.py`) para apontar para o seu banco de dados local.
    * *Nota: Se o seu projeto usa funções SQL diretas (como o `vincular_paciente_familiar` sugere), você deve garantir que essas funções SQL estão criadas no seu banco de dados PostgreSQL.*

5.  **Rodar o Servidor:**
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
2.  **Instale as Dependências Node:**
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Rodar a Aplicação:**
    ```bash
    npm run dev
    # ou
    yarn dev
    ```
    O frontend será iniciado, geralmente em `http://localhost:5173/` ou similar.

---

## 🗺️ Rotas de API Importantes

Aqui estão alguns *endpoints* inferidos com base na funcionalidade do projeto:

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/cadastro/familiar/` | Cadastra um novo familiar. |
| `POST` | `/cadastro/terapeuta/` | Cadastra um novo terapeuta. |
| `POST` | `/cadastro/paciente/` | Cadastra um novo paciente. |
| `POST` | `/vincular/pacientes/vincular-familiar/` | Vincula um ou mais familiares a um paciente. (Corpo espera `id_paciente` e `id_familiar`: Lista de IDs) |
| `GET` | `/cadastro/lista-pacientes` | Lista todos os pacientes e seus detalhes. |
| `GET` | `/cadastro/lista-vinculos` | Lista todos os vínculos (paciente-familiar, paciente-terapeuta). |
| `POST` | `/login/` | Autenticação do usuário. |

---

## 🤝 Contribuição

Detalhes sobre como contribuir para o projeto (se aplicável).
