import { Link } from 'react-router-dom';
import { PlanoCard } from '../../componentes/CardPlanoTerapeutico';
import './plano-terapeutico-terapeuta.estilo.css';
import { FiPlusCircle } from 'react-icons/fi';
import { IconVoltar } from '../../componentes/IconVoltar';
import { IconSair } from '../../componentes/IconSair';

// Dados fictícios
const planos = [
  { id: 1, data: "25/09/2025", status: "Em uso", descricao: "Plano do paciente X..." },
  { id: 2, data: "10/09/2025", status: "Finalizado", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas..." },
  { id: 3, data: "07/07/2025", status: "Em uso", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas..." }
];


export function PlanosTerapeuta() {
  return (
    <main className="planos-terapeuta-container">
      <div className='sidebar-plano'>
        <IconVoltar to='/terapeuta' />
        <IconSair to='/login' />
      </div>


      <div className="planos-terapeuta-main">
        <h1 className="titulo-principal">Plano terapêutico de terapia ocupacional</h1>
        <div className="conteudo-dividido">
          {/* Coluna da Lista de Planos */}
          <section className="coluna-planos">
            <h2 className="subtitulo-historico">Históricos de Planos Terapeuticos</h2>
            <div className="lista-de-planos-terapeuta">
              {planos.map(plano => (
                <PlanoCard
                  key={plano.id}
                  data={plano.data}
                  status={plano.status}
                  descricao={plano.descricao}
                />
              ))}
            </div>
          </section>

          {/* Coluna dos Botões de Ação */}
          <aside className="coluna-acoes">
            <Link to="/terapeuta/criar-plano" className="botao-acao">
              <FiPlusCircle /> Criar plano
            </Link>
         
         
          </aside>
        </div>
      </div>
    </main>
  );
}