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
import {PlanosFamiliar} from './pages/PlanoTerapeuticoFamiliar/index.jsx'; 
import { PlanosTerapeuta } from './pages/PlanoTerapeuticoTerapeuta/index.jsx';
import { AcessarPlano } from './pages/AcessarPlano/index.jsx';
import { TelaInicioClinica } from './pages/TelaInicioClinica/index.jsx';
import { TelaInicioTerapeuta } from './pages/TelaInicioTerapeuta/index.jsx'


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
        <Route path="/clinica" element={<TelaInicioClinica />} />
        <Route path="/terapeuta" element={<TelaInicioTerapeuta />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
