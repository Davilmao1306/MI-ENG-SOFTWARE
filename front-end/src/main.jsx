import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';

// Importamos os componentes que servirão como páginas
import App from './App.jsx'; // Sua Homepage
import Login from './Login.jsx'; // Sua página de Login

// Criamos o nosso "mapa" de rotas
const router = createBrowserRouter([
  {
    path: "/",        // Quando a URL for a raiz do site ("/")
    element: <App />, // Renderize o componente App (sua Homepage)
  },
  {
    path: "/login",   // Quando a URL for "/login"
    element: <Login />, // Renderize o componente Login
  },
]);

// Ativamos o roteador
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

