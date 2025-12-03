import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiUser, FiClipboard } from 'react-icons/fi';
import { RiPsychotherapyLine } from "react-icons/ri";
import '../Sidebar/sidebar.estilo.css';

export function SidebarTerapeuta({ terapeuta }) {
  const location = useLocation(); // Obtém o objeto de localização atual


  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar-container">
      <div className="sidebar-header">
        <img src="/neurolink.png" alt="Logo Neurolink" className="sidebar-logo" />
        {/* <p> Dr(a). {terapeuta?.nome}<br></br>
          {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p> */}
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            {/* Aplica 'active' se o pathname for '/dashboard' */}
            <Link to="/terapeuta" className={`sidebar-nav-item ${isActive('/terapeuta') ? 'active' : ''}`}>
              <FiHome /> Dashboard
            </Link>
          </li>
          <li>
            {/* Aplica 'active' se o pathname for '/terapeutas' */}
            <Link to="/terapeuta/pacientes" className={`sidebar-nav-item ${isActive('/terapeuta/pacientes') ? 'active' : ''}`}>
              <RiPsychotherapyLine /> Pacientes
            </Link>
          </li>
          {/* <li>
            
            <Link to="/terapeuta/sessao" className={`sidebar-nav-item ${isActive('/terapeuta/sessao') ? 'active' : ''}`}>
              <FiUser /> Sessão
            </Link>
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}