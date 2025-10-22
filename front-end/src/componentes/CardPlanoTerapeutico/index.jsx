import { Link } from 'react-router-dom';
import './card-plano-terapeutico.estilo.css';
import { Botao } from '../Botao'
import { IoChevronDownOutline } from 'react-icons/io5';

// Exportação nomeada, seguindo o padrão
export function PlanoCard({ data, status, descricao }) {
  // Adicione aqui a lógica para abrir/fechar se precisar (com useState)
  
  return (
    <div className="plano-card-container">
      <header className="plano-card-header">
        <div className="plano-card-titulo">
            Plano dia {data} - {status}
        </div>
        <button className="plano-card-seta">
          <IoChevronDownOutline size={20} />
        </button>
      </header>
      <section className="plano-card-body">
        <p>{descricao}</p>
      </section>
    </div>
  );
}
