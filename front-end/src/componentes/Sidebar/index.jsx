import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiUser, FiClipboard } from 'react-icons/fi';
import { RiPsychotherapyLine } from "react-icons/ri";
import './sidebar.estilo.css';

export function Sidebar() {
  const location = useLocation(); // Obtém o objeto de localização atual


  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <img src="/neurolink.png" alt="Logo Neurolink" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            {/* Aplica 'active' se o pathname for '/dashboard' */}
            <Link to="/clinica" className={`sidebar-nav-item ${isActive('/clinica') ? 'active' : ''}`}>
              <FiHome /> Dashboard
            </Link>
          </li>
          <li>
            {/* Aplica 'active' se o pathname for '/terapeutas' */}
            <Link to="/clinica/lista-de-terapeutas" className={`sidebar-nav-item ${isActive('/clinica/lista-de-terapeutas') ? 'active' : ''}`}>
              <RiPsychotherapyLine /> Terapeutas
            </Link>
          </li>
          <li>
            {/* Aplica 'active' se o pathname for '/pacientes' */}
            <Link to="/pacientes" className={`sidebar-nav-item ${isActive('/pacientes') ? 'active' : ''}`}>
              <FiUser /> Pacientes
            </Link>
          </li>
          <li>
            {/* Aplica 'active' se o pathname for '/familiares' */}
            <Link to="/familiares" className={`sidebar-nav-item ${isActive('/familiares') ? 'active' : ''}`}>
              <FiUsers /> Familiares
            </Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
}