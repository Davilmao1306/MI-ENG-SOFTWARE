import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProtectedRoute } from "./routes/ProtectedRoute";
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
import { TelaInicioTerapeuta } from './pages/TelaInicioTerapeuta/index.jsx';
import { TelaNovaSessao } from './pages/TelaNovaSessao/index.jsx';
import { AcessarPacientes } from './pages/AcessarPacientes/index.jsx';
import { CriarPlanoPage } from './pages/CriarPlano/index.jsx';
import Consent from './componentes/Consentimento/index.jsx';
import { DiarioCompartilhadoPage } from './pages/DiarioCompartilhado/index.jsx';
import { DashboardInicial } from './pages/InicialClinica/index.jsx';
import { GerenciarPacientes } from './pages/GerenciarPacientes';
import { GerenciarTerapeutas } from './pages/GerenciarTerapeutas/index.jsx';
import { GerenciarFamiliares } from './pages/GerenciarFamiliares/index.jsx';
import { EditarPaciente } from './pages/EditarPaciente/index.jsx';
import { EditarFamiliar } from './pages/EditarFamiliar/index.jsx';
import { EditarTerapeuta } from './pages/EditarTerapeuta/index.jsx';


// Ativamos o roteador
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/login/recuperar-senha/nova-senha" element={<NovaSenha />} />

        {/* rotas da clinica */}

        <Route path='/clinica' element={<ProtectedRoute tipoPermitido="C"><DashboardInicial /></ProtectedRoute>} />
        <Route path="/clinica/cadastrar-familiar" element={<ProtectedRoute tipoPermitido="C"> <CadastrarFamiliar /></ProtectedRoute>} />
        <Route path="/clinica/cadastrar-paciente" element={<ProtectedRoute tipoPermitido="C"> <CadastrarPaciente /></ProtectedRoute>} />
        <Route path="/clinica/cadastrar-terapeuta" element={<ProtectedRoute tipoPermitido="C"><CadastrarTerapeuta /></ProtectedRoute>} />
        <Route path="/clinica/lista-de-terapeutas" element={<ProtectedRoute tipoPermitido="C"> <GerenciarTerapeutas /></ProtectedRoute>} />
        <Route path="/clinica/lista-de-pacientes" element={<ProtectedRoute tipoPermitido="C"> <GerenciarPacientes /></ProtectedRoute>} />
        <Route path="/clinica/lista-de-familiares" element={<ProtectedRoute tipoPermitido="C"> <GerenciarFamiliares /></ProtectedRoute>} />
        <Route path="/clinica/editar-paciente/:id_paciente" element={<ProtectedRoute tipoPermitido="C"> <EditarPaciente /></ProtectedRoute>} />
        <Route path="/clinica/editar-familiar/:id_familiar" element={<ProtectedRoute tipoPermitido="C"> <EditarFamiliar /></ProtectedRoute>} />
        <Route path="/clinica/editar-terapeuta/:id_terapeuta" element={<ProtectedRoute tipoPermitido="C"> <EditarTerapeuta /></ProtectedRoute>} />

        {/* rotas do terapeuta */}
        <Route path="/terapeuta" element={<ProtectedRoute tipoPermitido="T"> <TelaInicioTerapeuta /></ProtectedRoute>} />
        <Route path="/terapeuta/sessao" element={<ProtectedRoute tipoPermitido="T"><TelaNovaSessao /></ProtectedRoute>} />
        <Route path="/terapeuta/pacientes" element={<ProtectedRoute tipoPermitido="T"> <AcessarPacientes /></ProtectedRoute>} />
        <Route path="/terapeuta/pacientes/:id_paciente/criar-plano" element={<ProtectedRoute tipoPermitido="T"> <CriarPlanoPage /></ProtectedRoute>} />
        <Route path="/terapeuta/paciente/:id_paciente/plano-terapeutico-terapeuta" element={<ProtectedRoute tipoPermitido="T"><PlanosTerapeuta /></ProtectedRoute>} />
        <Route path='/terapeuta/pacientes/:id_paciente/diario' element={<ProtectedRoute tipoPermitido={"T" || "F"}><DiarioCompartilhadoPage /></ProtectedRoute>} />
        <Route path="/paciente/:id_paciente/acessar-plano/:id_plano" element={<ProtectedRoute tipoPermitido="T" ><AcessarPlano /></ProtectedRoute>} />

        {/* rotas do familiar */}
        <Route path="/:id_paciente/plano-terapeutico-familiar" element={<PlanosFamiliar />} />
        <Route path="/familiar-paciente/:id_paciente" element={<TelaInicioFamiliar />} />
        <Route path="/familiar-perfil" element={<TelaPerfilPaciente />} />
        <Route path='/consentimento' element={<Consent />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
