// src/componentes/FamiliarCard/index.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiUsers, FiEdit, FiUserX } from 'react-icons/fi';
import './familiar-card.estilo.css';
import { useExibirListas } from '../../hooks/useExibirListas';

export function FamiliarCard({ familiar, onRemoverOuInativar }) {
    
    const [pacientesVinculados, setPacientesVinculados] = useState([]);

    useExibirListas(
        `http://localhost:8000/cadastro/vinculos/familiar/${familiar.id_familiar}`,
        setPacientesVinculados
    );
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
                <p> <strong>CPF:</strong> {familiar.cpf}</p>
                {familiar.telefone && <p><FiPhone /> <strong>Telefone:</strong> {familiar.telefone}</p>}
                <p><FiUser /> <strong>Pacientes:</strong> {getPacientesNomes(pacientesVinculados)}</p>
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