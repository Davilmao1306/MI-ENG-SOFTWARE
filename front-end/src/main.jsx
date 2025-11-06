import React from 'react';
import { createRoot } from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importamos os componentes que servirão como páginas

import { LandingPage } from './pages/LandingPage/index.jsx';
import {Login} from './pages/Login/index.jsx'; // Sua página de Login
import { CadastrarFamiliar } from './pages/CadastrarFamiliar/index.jsx'; // Página de cadastro de familiar
import {CadastrarPaciente} from './pages/CadastrarPaciente/index.jsx'; // Página de cadastro de paciente
import {CadastrarTerapeuta} from './pages/CadastrarTerapeuta/index.jsx'; // Página de cadastro de terapeuta
import { Clinica } from './pages/Clinica/index.jsx';

// Ativamos o roteador
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/clinica" element={<Clinica />}/>
        <Route path="/clinica/cadastrar-familiar" element={<CadastrarFamiliar />} />
        <Route path="/clinica/cadastrar-paciente" element={<CadastrarPaciente />} />
        <Route path="/clinica/cadastrar-terapeuta" element={<CadastrarTerapeuta />} />
      </Routes>
    </BrowserRouter>
);
