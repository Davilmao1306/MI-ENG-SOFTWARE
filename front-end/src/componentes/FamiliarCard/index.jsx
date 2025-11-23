// src/componentes/FamiliarCard/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiUsers, FiEdit, FiUserX } from 'react-icons/fi';
import './familiar-card.estilo.css';

export function FamiliarCard({ familiar, onRemoverOuInativar }) {
    // Função para formatar os nomes dos pacientes vinculados
    const getPacientesNomes = (pacientes) => {
        return pacientes && pacientes.length > 0
            ? pacientes.map(p => p.nome).join(', ')
            : 'N/A';
    };

    return (
        <div className="familiar-card-container">
            <div className="familiar-card-header">
                <FiUsers size={30} className="familiar-icon" />
                <h3 className="familiar-nome">{familiar.nome}</h3>
            </div>

            <div className="familiar-card-info">
                <p><strong>ID:</strong> {familiar.id_familiar}</p>
                <p><FiMail /> <strong>Email:</strong> {familiar.email}</p>
                {familiar.telefone && <p><FiPhone /> <strong>Telefone:</strong> {familiar.telefone}</p>}
                <p><FiUser /> <strong>Pacientes:</strong> {getPacientesNomes(familiar.pacientesVinculados)}</p>
            </div>

            <div className="familiar-card-acoes">
                <Link to={`/clinica/editar-familiar/${String(familiar.id_familiar)}`} className="familiar-card-botao-acao edit">
                    <FiEdit /> Editar
                </Link>
                <button
                    className="familiar-card-botao-acao remover-inativar"
                    onClick={() => onRemoverOuInativar(familiar)}
                >
                    <FiUserX /> Remover/Inativar
                </button>
            </div>
        </div>
    );
}