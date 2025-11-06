import { Link } from 'react-router-dom';
import { FiEdit, FiUsers, FiUserPlus } from 'react-icons/fi';
import { LuUser } from 'react-icons/lu'; 
import './paciente-card.estilo.css';

export function PacienteCard({ paciente }) {
  

  return (
    <div className="paciente-card-container">
      <div className="paciente-card-header">
        <LuUser size={30} className="paciente-icon" />
        <h3 className="paciente-nome">{paciente.nome}</h3>
      </div>
      <div className="paciente-card-info">
        <p><strong>ID:</strong> {paciente.num}</p>
        <p><strong>Idade:</strong> {paciente.idade} anos</p>
        <p><strong>Gênero:</strong> {paciente.genero}</p>
        <p><strong>Endereço:</strong> {paciente.endereco}</p>
      
        {paciente.terapeuta && <p><strong>Terapeuta:</strong> {paciente.terapeuta}</p>}
        {paciente.familiar && <p><strong>Familiar:</strong> {paciente.familiar}</p>}
      </div>
      <div className="paciente-card-acoes">
   
        <Link to={`/pacientes/editar/${paciente.id}`} className="paciente-card-botao-acao edit">
          <FiEdit /> Editar
        </Link>

        <Link to={`/pacientes/${paciente.id}/vincular-familiar`} className="paciente-card-botao-acao vincular">
          <FiUsers /> Vincular a um familiar
        </Link>
        <Link to={`/pacientes/${paciente.id}/vincular-terapeuta`} className="paciente-card-botao-acao vincular">
          <FiUserPlus /> Vincular a um terapeuta
        </Link>
      </div>
    </div>
  );
}