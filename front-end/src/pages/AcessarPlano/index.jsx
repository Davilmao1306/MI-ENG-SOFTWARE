
import { Link } from 'react-router-dom'; 
import { CampoDetalhes } from '../../componentes/CampoDetalhes'; // Importamos nosso bloco
import { IoArrowBack } from 'react-icons/io5'; 
import { PiSignOutBold } from 'react-icons/pi';
import './acessar-plano.estilo.css';

const planoExemplo = {
  pacienteNome: "Matheus",
  neurodivergencia: ["Transtorno do Espectro Autista (TEA)"], // Coloquei em array para usar lista
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
    
    <div className="plano-detalhe-container"> 
      
     
      <header className="plano-detalhe-header">
        <Link to="/plano-terapeutico-familiar" className="back-button"> 
          <IoArrowBack size={28} /> 
        </Link>
        <h1>Plano terapeutico paciente {planoExemplo.pacienteNome}</h1>
      </header>

     
      <main className="plano-detalhe-content">
        
       
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
            {/* Linha para assinatura */}
            <div className="linha-assinatura"></div> 
        </div>

       
         <div className="link-imagem-section">
            <a href={planoExemplo.linkExterno} target="_blank" rel="noopener noreferrer">{planoExemplo.linkExterno}</a>
            <img src={planoExemplo.imagemGrafico} alt="Imagem Exemplo" />
         </div>

      </main>
    </div>
  );
}