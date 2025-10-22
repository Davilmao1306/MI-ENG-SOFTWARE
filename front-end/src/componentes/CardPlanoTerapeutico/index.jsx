import React, { useState } from 'react'; 
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'; 
import './card-plano-terapeutico.estilo.css';

export function PlanoCard({ data, status, descricao }) {
  // 3. Criamos um estado para controlar se o card está aberto
  const [isOpen, setIsOpen] = useState(false);

  // 4. Função para alternar o estado aberto/fechado ao clicar
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    // 5. Adicionamos uma classe condicional 'is-open' ao container
    <div className={`plano-card-container ${isOpen ? 'is-open' : ''}`}>
      {/* 6. O header inteiro agora é clicável para abrir/fechar */}
      <header className="plano-card-header" onClick={toggleOpen}>
        <div className="plano-card-titulo">
          Plano dia {data} - {status}
        </div>
        {/* Usamos um span em vez de button para o ícone, pois o header já é clicável */}
        <span className="plano-card-toggle-icon">
          {/* 7. Mostramos o ícone correto (seta para cima ou para baixo) */}
          {isOpen ? <IoChevronUpOutline size={20} /> : <IoChevronDownOutline size={20} />}
        </span>
      </header>
      {/* 8. A seção do corpo só é renderizada se isOpen for true */}
      {isOpen && (
        <section className="plano-card-body">
          <p>{descricao}</p>
        </section>
      )}
    </div>
  );
}