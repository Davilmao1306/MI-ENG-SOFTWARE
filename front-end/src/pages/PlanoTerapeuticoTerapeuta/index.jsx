import { Link } from 'react-router-dom';
import { PlanoCard } from '../../componentes/CardPlanoTerapeutico';
import './plano-terapeutico-terapeuta.estilo.css';
import { FiPlusCircle } from 'react-icons/fi';
import { IconVoltar } from '../../componentes/IconVoltar';
import { IconSair } from '../../componentes/IconSair';
import { User } from 'lucide-react';

// Dados fictícios
const planos = [
  { id: 1, data: "25/09/2025", status: "Em uso", descricao: "Plano do paciente X...", UserRole: 'terapeuta' },
  { id: 2, data: "10/09/2025", status: "Finalizado", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas...", UserRole: 'terapeuta' },
  { id: 3, data: "07/07/2025", status: "Em uso", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas...", UserRole: 'terapeuta' },
];


export function PlanosTerapeuta() {
  return (
    <main className="planos-terapeuta-container">
      <div className='sidebar-plano'>
        <IconVoltar to='/terapeuta/pacientes' />
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
                  userRole={plano.UserRole}
                />
              ))}
            </div>
          </section>

          {/* Coluna dos Botões de Ação */}
          <aside className="coluna-acoes">
            <Link to="/pacientes/:idPaciente/criar-plano" className="botao-acao">
              <FiPlusCircle /> Criar plano
            </Link>


          </aside>
        </div>
      </div>
    </main>
  );
}