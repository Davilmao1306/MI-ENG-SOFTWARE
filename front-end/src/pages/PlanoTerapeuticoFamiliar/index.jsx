import { Link } from 'react-router-dom'; 
import { PlanoCard } from '../../componentes/CardPlanoTerapeutico'; 
import './plano-terapeutico-familiar.estilo.css'; 
import { IoChevronForwardOutline } from 'react-icons/io5';
import { PiSignOutBold } from 'react-icons/pi';
import { IoArrowBack } from 'react-icons/io5';


// Dados fictícios
const planos = [
  { id: 1, data: "25/09/2025", status: "Em uso", descricao: "Plano feito pela terapeuta Ana Clara..." },
  { id: 2, data: "10/09/2025", status: "Em uso", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas..." },
  { id: 3, data: "07/07/2025", status: "Em uso", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas..." }
];


export function PlanosPacientePage() {
  return (
    <main className="planos-page-container">
      <div className='barra-lateral-planos'>
        <Link to="/escolher-perfil" className='link-voltar'> 
          <IoArrowBack /> 
        </Link>
        <Link to='/login' className='link-sair'>
          <PiSignOutBold /> Sair
        </Link>
      </div>

      <div className="planos-main-content">
        <header className="planos-header">
          <div className="planos-titulos">
            <h1>Planos Terapêuticos </h1>
            <h2>Paciente Matheus</h2> 
          </div>
          <button className="acessar-plano-btn">
            <IoChevronForwardOutline size={24}/> Acessar Plano
          </button>
        </header>

        <section className="lista-de-planos">
          {planos.map(plano => (
            <PlanoCard 
              key={plano.id}
              data={plano.data}
              status={plano.status}
              descricao={plano.descricao}
            />
          ))}
        </section>
      </div>
      
    </main>
  );
}

