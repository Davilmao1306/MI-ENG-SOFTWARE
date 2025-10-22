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


export function PlanosFamiliar() {
  return (
    <main className="planos-terapeuta-container">
         
         {/* 1. Barra Lateral Fixa */}
         <div className='barra-lateral-planos'>
           <Link to="/escolher-perfil" className='link-voltar'> 
             <IoArrowBack /> {/* Ícone Voltar */}
           </Link>
           <Link to='/login' className='link-sair'>
             <PiSignOutBold /> Sair {/* Ícone Sair */}
           </Link>
         </div>
   
         {/* 2. Conteúdo Principal */}
         <div className="planos-terapeuta-main">
           
           <h1 className="titulo-principal">Planos terapêuticos sendo usado</h1>
   
           {/* Layout dividido: Lista à esquerda, Botões à direita */}
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
                   />
                 ))}
               </div>
             </section>
   
             {/* Coluna dos Botões de Ação */}
             <aside className="coluna-acoes">
              
               {/* O botão "Acessar Plano" que você tinha no header agora vai aqui */}
               <button className="botao-acao"> 
                 <IoChevronForwardOutline /> Acessar Plano 
               </button>
              
             </aside>
           </div>
         </div>
       </main>
     );
}

