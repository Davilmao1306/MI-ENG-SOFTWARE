// src/componentes/PacienteCard/index.jsx
import { Link } from 'react-router-dom';
import { FiEdit, FiUsers, FiUserPlus, FiUser, FiUserX } from 'react-icons/fi'; // << AQUI: Adicionado FiTrash2

import './paciente-card.estilo.css';

export function PacienteCard({ paciente, onVincularFamiliar, onVincularTerapeuta, onRemoverOuInativar }) { 
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
                <FiUser size={30} className="paciente-icon" />
                <h3 className="paciente-nome">{paciente.nome}</h3>
            </div>
            <div className="paciente-card-info">
                <p><strong>ID:</strong> {paciente.id_paciente}</p>
                <p><strong>Data de Nascimento:</strong> {paciente.data_nascimento}</p>
                <p><strong>Gênero:</strong> {paciente.genero}</p>
                <p><strong>Telefone:</strong> {paciente.telefone}</p>

                {/* Exibindo os terapeutas vinculados */}
                <p><strong>Terapeuta:</strong> {getTerapeutasNomes(paciente.terapeutasVinculados)}</p>
                {/* Exibindo os familiares vinculados */}
                <p><strong>Familiar:</strong> {getFamiliaresNomes(paciente.familiaresVinculados)}</p>
            </div>
            <div className="paciente-card-acoes">
        
                <button
                    className="paciente-card-botao-acao vincular familiar"
                    onClick={() => onVincularFamiliar(paciente)}
                >
                    <FiUsers /> Vincular a um familiar
                </button>
                <button
                    className="paciente-card-botao-acao vincular terapeuta"
                    onClick={() => onVincularTerapeuta(paciente)}
                >
                    <FiUserPlus /> Vincular a um terapeuta
                </button>

      
                <div className="paciente-card-acoes-inferior">
                    <Link to={`/clinica/editar-paciente/${paciente.id_paciente}`} className="paciente-card-botao-acao edit"> 
                        <FiEdit /> Editar
                    </Link>

                    <button
                        className="paciente-card-botao-acao remover-inativar"
                        onClick={() => onRemoverOuInativar(paciente)} 
                    >
                        <FiUserX /> Remover/Inativar
                    </button>
                </div>
            </div>
        </div>
    );
}