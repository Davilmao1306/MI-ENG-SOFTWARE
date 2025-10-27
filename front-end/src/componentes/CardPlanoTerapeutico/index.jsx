import { useState } from 'react';
import { IoChevronDownOutline, IoChevronForwardOutline, IoChevronUpOutline } from 'react-icons/io5';
import './card-plano-terapeutico.estilo.css';
import { Link } from 'react-router-dom';

export function PlanoCard({ data, status, descricao }) {
  // Estado para controlar se o card está aberto
  const [isOpen, setIsOpen] = useState(false);
  // Função para alternar o estado
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

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
          <Link to="/acessar-plano" className="botao-acao">
            <IoChevronForwardOutline /> Acessar Plano
          </Link>
          <Link to="/adicionar-feedback-plano" className="botao-acao">
            <IoChevronForwardOutline /> Feedbacks
          </Link>
        </section>
      )}
    </div>
  );
}