// src/componentes/PacienteCard/index.jsx
import { Link } from 'react-router-dom';
import { FiEdit, FiUsers, FiUserPlus, FiUser } from 'react-icons/fi'; // Adicionado FiUser aqui
// import { LuUser } from 'react-icons/lu'; // Se quiser manter, certifique-se de que está instalado
import './paciente-card.estilo.css';

export function PacienteCard({ paciente, onVincularFamiliar, onVincularTerapeuta }) {
  // Funções para formatar os nomes para exibição
  const getTerapeutasNomes = (terapeutas) => {
    return terapeutas && terapeutas.length > 0
      ? terapeutas.map(t => t.nome).join(', ')
      : 'N/A';
  };

  const getFamiliaresNomes = (familiares) => {
    return familiares && familiares.length > 0
      ? familiares.map(f => f.nome).join(', ')
      : 'N/A';
  };

  return (
    <div className="paciente-card-container">
      <div className="paciente-card-header">
        <FiUser size={30} className="paciente-icon" /> {/* Alterado para FiUser para consistência */}
        <h3 className="paciente-nome">{paciente.nome}</h3>
      </div>
      <div className="paciente-card-info">
        <p><strong>ID:</strong> {paciente.num}</p>
        <p><strong>Idade:</strong> {paciente.idade} anos</p>
        <p><strong>Gênero:</strong> {paciente.genero}</p>
        <p><strong>Endereço:</strong> {paciente.endereco}</p>
      
        {/* Exibindo os terapeutas vinculados */}
        <p><strong>Terapeuta:</strong> {getTerapeutasNomes(paciente.terapeutasVinculados)}</p>
        {/* Exibindo os familiares vinculados */}
        <p><strong>Familiar:</strong> {getFamiliaresNomes(paciente.familiarVinculado)}</p>
      </div>
      <div className="paciente-card-acoes">
        <Link to={`/pacientes/editar/${paciente.id}`} className="paciente-card-botao-acao edit">
          <FiEdit /> Editar
        </Link>
        <button
          className="paciente-card-botao-acao vincular familiar" // Adicione uma classe específica se quiser estilo diferente
          onClick={() => onVincularFamiliar(paciente)} 
        >
          <FiUsers /> Vincular a um familiar
        </button>
        <button
          className="paciente-card-botao-acao vincular terapeuta" // Adicione uma classe específica se quiser estilo diferente
          onClick={() => onVincularTerapeuta(paciente)} 
        >
          <FiUserPlus /> Vincular a um terapeuta
        </button>
      </div>
    </div>
  );
}