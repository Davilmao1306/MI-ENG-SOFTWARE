// src/componentes/TerapeutaCard/index.jsx
import { Link } from 'react-router-dom';
import { FiEdit, FiAward, FiTrash2, FiUserX } from 'react-icons/fi';
import { RiPsychotherapyLine } from "react-icons/ri";
import './terapeuta-card.estilo.css'; 

export function TerapeutaCard({ terapeuta, onRemoverOuInativar }) { 
    return (
        <div className="terapeuta-card-container">
            <div className="terapeuta-card-header">
                <RiPsychotherapyLine size={30} className="terapeuta-icon" /> 
                <h3 className="terapeuta-nome">{terapeuta.nome}</h3>
            </div>
            <div className="terapeuta-card-info">
                <p><strong>ID:</strong> {terapeuta.id_terapeuta}</p>
                <p><strong>E-mail:</strong> {terapeuta.email}</p>
                <p><strong>Especialidade:</strong> {terapeuta.especialidade}</p>
                <p><strong>CRP:</strong> {terapeuta.crp}</p>
            </div>
            <div className="terapeuta-card-acoes">
                {/* Link para editar o terapeuta */}
                <Link to={`/clinica/editar-terapeuta/${terapeuta.id_terapeuta}`} className="terapeuta-card-botao-acao edit">
                    <FiEdit /> Editar
                </Link>
                {/* Botão para Remover ou Inativar */}
                <button
                    className="terapeuta-card-botao-acao remover-inativar"
                    onClick={() => onRemoverOuInativar(terapeuta)} // Chama a função passada via prop
                >
                    <FiUserX /> Remover/Inativar
                </button>
            </div>
        </div>
    );
}