// src/componentes/Navbar/index.jsx
import React from 'react';
import { FiUser, FiBell, FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom'; 
import './navbar.estilo.css';

export function Navbar({ userName = "Clínica" }) {
  const handleLogout = () => {
    console.log("Usuário deslogado!");
    alert("Você foi desconectado!");
    // Lógica para redirecionar para a página de login
    // window.location.href = '/login'; 
  };

  const handleNotifications = () => {
    console.log("Abrir notificações!");
    // Lógica para mostrar notificações
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        {/* Você pode deixar vazio ou adicionar algo como um botão de menu em mobile */}
      </div>
      <div className="navbar-right">
        <div className="navbar-profile">
          <FiUser size={20} className="profile-icon" />
          <span>Olá, {userName}</span>
        </div>
        <button className="navbar-icon-button" onClick={handleNotifications}>
          <FiBell size={20} />
        </button>
      <Link to="/login" className="navbar-icon-button" >
          <FiLogOut size={20} />
        </Link>
      </div>
    </nav>
  );
}