import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';

// Importamos os componentes que servirão como páginas

import { LandingPage } from './pages/LandingPage/index.jsx';
import {Login} from './pages/Login/index.jsx'; // Sua página de Login
import {RecuperarSenha} from './pages/RecuperarSenha/index.jsx'; // Página de recuperação de senha
import {NovaSenha} from './pages/NovaSenha/index.jsx'; // Página de nova senha
import { CadastrarFamiliar } from './pages/CadastrarFamiliar/index.jsx'; // Página de cadastro de familiar
import {CadastrarPaciente} from './pages/CadastrarPaciente/index.jsx'; // Página de cadastro de paciente
import {CadastrarTerapeuta} from './pages/CadastrarTerapeuta/index.jsx'; // Página de cadastro de terapeuta


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
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
