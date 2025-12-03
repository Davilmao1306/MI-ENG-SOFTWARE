import { useState } from 'react';
import { IoChevronDownOutline, IoChevronForwardOutline, IoChevronUpOutline } from 'react-icons/io5';
import { PiChatCircleDots } from 'react-icons/pi';
import { FiEdit } from 'react-icons/fi';
import './card-plano-terapeutico.estilo.css';
import { Link, useParams } from 'react-router-dom';


export function PlanoCard({ data, status, descricao, userRole, plano,onFeedback, onViewFeedbacks,  }) {
  const [isOpen, setIsOpen] = useState(false);
  const { id_paciente } = useParams();
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Determina se o usuário é um terapeuta
  let linkPlano = useState();
  const isTerapeuta = userRole === 'terapeuta';
  if (isTerapeuta) {
    linkPlano = `/paciente/${id_paciente}/acessar-plano/${plano.id_plano}`;
  } else {
    linkPlano = `/familiar-paciente/${id_paciente}/acessar-plano/${plano.id_plano}`;
  }

  return (
    <div className={`plano-card-container ${isOpen ? 'is-open' : ''}`}>
      <header className="plano-card-header" onClick={toggleOpen}>
        <div className="plano-card-titulo">
          Plano dia {data} - {status}
        </div>
        <span className="plano-card-toggle-icon">
          {isOpen ? <IoChevronUpOutline size={20} /> : <IoChevronDownOutline size={20} />}
        </span>
      </header>
      {isOpen && (
        <section className="plano-card-body">
          <p>{descricao}</p>

          <div className="plano-card-acoes">

            <Link to={linkPlano} className="plano-card-botao-acao">
              <IoChevronForwardOutline /> Acessar Plano
            </Link>

            {isTerapeuta && (
              <Link to="/terapeuta/criar-plano" className="plano-card-botao-acao">
                <FiEdit /> Editar Plano
              </Link>
            )}


            {isTerapeuta ? (
              <button
                type="button"
                className="plano-card-botao-acao"
                onClick={onViewFeedbacks}
              >
                <PiChatCircleDots /> Feedbacks
              </button>
            ) : (
              <button
                type="button"
                className="plano-card-botao-acao"
                onClick={onFeedback}
              >
                <PiChatCircleDots /> Dar Feedback
              </button>
            )}


          </div>
        </section>
      )}
    </div>
  );
}