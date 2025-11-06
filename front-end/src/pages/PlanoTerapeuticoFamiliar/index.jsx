import { Link } from 'react-router-dom';
import { PlanoCard } from '../../componentes/CardPlanoTerapeutico';
import './plano-terapeutico-familiar.estilo.css';
import { IconSair } from '../../componentes/IconSair'
import { IconVoltar } from '../../componentes/IconVoltar'


// Dados fictícios
const planos = [
  { id: 1, data: "25/09/2025", status: "Em uso", descricao: "Plano feito pela terapeuta Ana Clara...", UserRole: 'familiar' },
  { id: 2, data: "10/09/2025", status: "Em uso", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas...", UserRole: 'familiar' },
  { id: 3, data: "07/07/2025", status: "Em uso", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas...", UserRole: 'familiar' },
];


export function PlanosFamiliar() {
  return (
    <main className="planos-terapeuta-container">

      <div className='barra-lateral-planos'>
        <IconVoltar to='/login/familiar-paciente' />
        <IconSair to='/login' />
      </div>

      <div className="planos-terapeuta-main">
        <h1 className="titulo-principal">Planos terapêuticos sendo usado</h1>
        <div className="conteudo-dividido">
          {/* Coluna da Lista de Planos */}
          <section className="coluna-planos">
            <h2 className="subtitulo-historico">Paciente Matheus</h2>
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
        </div>
      </div>
    </main>
  );
}

