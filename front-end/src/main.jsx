import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';

// Importamos os componentes que servirão como páginas

import { LandingPage } from './pages/LandingPage/index.jsx';
import { Login } from './pages/Login/index.jsx'; // Sua página de Login
import { RecuperarSenha } from './pages/RecuperarSenha/index.jsx'; // Página de recuperação de senha
import { NovaSenha } from './pages/NovaSenha/index.jsx'; // Página de nova senha
import { CadastrarFamiliar } from './pages/CadastrarFamiliar/index.jsx'; // Página de cadastro de familiar
import { CadastrarPaciente } from './pages/CadastrarPaciente/index.jsx'; // Página de cadastro de paciente
import { CadastrarTerapeuta } from './pages/CadastrarTerapeuta/index.jsx'; // Página de cadastro de terapeuta
import { TelaPerfilPaciente } from './pages/TelaPerfisPaciente/index.jsx'; // Página de cadastro de terapeuta
import { TelaInicioFamiliar } from './pages/TelaInicioFamiliar/index.jsx'; // Página de cadastro de terapeuta
import { PlanosFamiliar } from './pages/PlanoTerapeuticoFamiliar/index.jsx';
import { PlanosTerapeuta } from './pages/PlanoTerapeuticoTerapeuta/index.jsx';
import { AcessarPlano } from './pages/AcessarPlano/index.jsx';
import { TelaInicioClinica } from './pages/TelaInicioClinica/index.jsx';
import { TelaInicioTerapeuta } from './pages/TelaInicioTerapeuta/index.jsx';
import { ListaTerapeutas } from './pages/ListaTerapeutas/index.jsx';
import { TelaNovaSessao } from './pages/TelaNovaSessao/index.jsx';
import { AcessarPacientes } from './pages/AcessarPacientes/index.jsx';
import { DiarioTerapeuta } from './pages/DiarioTerapeuta/index';
import { CriarPlanoPage } from './pages/CriarPlano/index.jsx';
import Consent from './componentes/Consentimento/index.jsx';
import { DiarioCompartilhadoPage } from './pages/DiarioCompartilhado/index.jsx';
import { DashboardInicial } from './pages/InicialClinica/index.jsx';
import { GerenciarPacientes } from './pages/GerenciarPacientes';


// Ativamos o roteador
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/login/recuperar-senha/nova-senha" element={<NovaSenha />} />
        <Route path="/clinica/cadastrar-familiar" element={<CadastrarFamiliar />} />
        <Route path="/clinica/cadastrar-paciente" element={<CadastrarPaciente />} />
        <Route path="/clinica/cadastrar-terapeuta" element={<CadastrarTerapeuta />} />
        <Route path="/plano-terapeutico-familiar" element={<PlanosFamiliar />} />
        <Route path="/plano-terapeutico-terapeuta" element={<PlanosTerapeuta />} />
        <Route path="/acessar-plano" element={<AcessarPlano />} />
        <Route path="/login/familiar-paciente" element={<TelaInicioFamiliar />} />
        <Route path="/login/familiar-perfis" element={<TelaPerfilPaciente />} />
        <Route path="/terapeuta" element={<TelaInicioTerapeuta />} />
        <Route path="/terapeuta/sessao" element={<TelaNovaSessao />} />
        <Route path="/terapeuta/pacientes" element={<AcessarPacientes />} />
        <Route path="/clinica/lista-de-terapeutas" element={<ListaTerapeutas />} />
        <Route path='/terapeuta/diario' element={<DiarioTerapeuta />} />
        <Route path="/pacientes/:idPaciente/criar-plano" element={<CriarPlanoPage />} />
        <Route path='/consentimento' element={<Consent />} />
        <Route path='/diario-compartilhado' element={<DiarioCompartilhadoPage />} />
        <Route path='/clinica' element={<DashboardInicial />} />
        <Route path="/pacientes" element={<GerenciarPacientes />} /> {/* Rota para a lista de pacientes */}
        <Route path="/pacientes/novo" element={<div>Tela de Adicionar Paciente</div>} /> {/* Rota para o formulário de adição */}
        <Route path="/pacientes/editar/:id" element={<div>Tela de Editar Paciente</div>} /> {/* Rota para editar */}
        <Route path="/pacientes/:id/vincular-familiar" element={<div>Tela de Vincular Familiar</div>} /> {/* Rota para vincular familiar */}
        <Route path="/pacientes/:id/vincular-terapeuta" element={<div>Tela de Vincular Terapeuta</div>} /> {/* Rota para vincular terapeuta */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
