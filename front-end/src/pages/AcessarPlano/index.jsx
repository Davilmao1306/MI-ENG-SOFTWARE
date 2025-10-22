import { Link, useParams } from 'react-router-dom'; 
import { CampoDetalhes } from '../../componentes/CampoDetalhes'; 
import { IoArrowBack } from 'react-icons/io5'; 
import { PiSignOutBold } from 'react-icons/pi';
import './acessar-plano.estilo.css';

const planoExemplo = {
  pacienteNome: "Matheus",
  neurodivergencia: ["Transtorno do Espectro Autista (TEA)"], 
  metodologia: ["Treinamento Parental", "Análise do Comportamento Aplicada (ABA)", "Terapia cognitivo-comportamental (TCC)"],
  cronograma: ["Semana 1 Treinamento com os familiares", "Semana 2 ...."],
  objetivos: "...",
  abordagemFamilia: "...",
  sobrePlano: "...",
  assinaturas: "...",
  linkExterno: "/", 
  imagemGrafico: "/neurolink.png" 
};

export function AcessarPlano() {
 
  return (
   
    <div className="acessar-plano-page-wrapper"> 
      

      <div className='sidebar-acessar-plano'>
        <Link to="/plano-terapeutico-familiar" className='link-voltar-sidebar'> 
          <IoArrowBack /> 
        </Link>
    
        <Link to='/login' className='link-sair-sidebar'>
          <PiSignOutBold /> Sair 
        </Link>
      </div>

      <div className="acessar-plano-main-container"> 
  
        <div className="acessar-plano-bordered-content"> 

          <header className="acessar-plano-header">
            <h1>Plano terapeutico paciente {planoExemplo.pacienteNome}</h1>
          </header>

    
          <main className="acessar-plano-content">
            
            <CampoDetalhes titulo="Neurodivergência">
              <ul>
                {planoExemplo.neurodivergencia.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </CampoDetalhes>

            <CampoDetalhes titulo="Metodologia de acompanhamento">
              <ul>
                {planoExemplo.metodologia.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </CampoDetalhes>

            <CampoDetalhes titulo="Cronograma das atividades">
               <ul>
                {planoExemplo.cronograma.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </CampoDetalhes>

            <CampoDetalhes titulo="Objetivos do tratamento">
              <p>{planoExemplo.objetivos || "Nenhum objetivo definido."}</p> 
            </CampoDetalhes>
            
            <CampoDetalhes titulo="Abordagem para família/cuidadores/responsáveis:">
               <p>{planoExemplo.abordagemFamilia || "Nenhuma abordagem definida."}</p>
            </CampoDetalhes>

            <CampoDetalhes titulo="Sobre o plano:">
               <p>{planoExemplo.sobrePlano || "Nenhuma informação adicional."}</p>
            </CampoDetalhes>

          
            <div className="assinatura-section">
                <h3>Assinatura dos envolvidos</h3>
                <hr /> 
                <div className="linha-assinatura"></div> 
            </div>

      
             <div className="link-imagem-section">
                <a href={planoExemplo.linkExterno} target="_blank" rel="noopener noreferrer">{planoExemplo.linkExterno}</a>
                <img src={planoExemplo.imagemGrafico} alt="Imagem Exemplo" />
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}