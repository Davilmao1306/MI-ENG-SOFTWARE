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

const TIPO_CLINICA = 'C'

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
        <Route path="/clinica/cadastrar-familiar" element={<CadastrarFamiliar />} />
        <Route path="/clinica/cadastrar-paciente" element={<CadastrarPaciente />} />
        <Route path="/clinica/cadastrar-terapeuta" element={<CadastrarTerapeuta />} />
        <Route path="/clinica/lista-de-terapeutas" element={<GerenciarTerapeutas />} />
        <Route path="/clinica/lista-de-pacientes" element={<GerenciarPacientes />} />
        <Route path="/clinica/lista-de-familiares" element={<GerenciarFamiliares />} />

        {/* rotas do terapeuta */}
        <Route path="/terapeuta" element={<TelaInicioTerapeuta />} />
        <Route path="/terapeuta/sessao" element={<TelaNovaSessao />} />
        <Route path="/terapeuta/pacientes" element={<AcessarPacientes />} />
        <Route path="/terapeuta/pacientes/:id_paciente/criar-plano" element={<CriarPlanoPage />} />
        <Route path="/terapeuta/paciente/:id_paciente/plano-terapeutico-terapeuta" element={<PlanosTerapeuta />} />
        <Route path='/terapeuta/pacientes/:id_paciente/diario' element={<DiarioCompartilhadoPage />} />
        <Route path="/paciente/:id_paciente/acessar-plano/:id_plano" element={<AcessarPlano />} />

        {/* rotas do familiar */}
        <Route path="/:id_paciente/plano-terapeutico-familiar" element={<PlanosFamiliar />} />
        
        <Route path="/familiar-paciente/:id_paciente" element={<TelaInicioFamiliar />} />
        <Route path="/familiar-perfil" element={<TelaPerfilPaciente />} />

        <Route path='/consentimento' element={<Consent />} />



      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
