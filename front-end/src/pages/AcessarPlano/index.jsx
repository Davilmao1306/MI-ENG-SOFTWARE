import { Link, useParams } from 'react-router-dom';
import { CampoDetalhes } from '../../componentes/CampoDetalhes';
import { IoArrowBack } from 'react-icons/io5';
import { PiSignOutBold } from 'react-icons/pi';
import './acessar-plano.estilo.css';
import { IconVoltar } from '../../componentes/IconVoltar'
import { IconSair } from '../../componentes/IconSair'
import { use, useState } from 'react';
import { useExibirListas } from '../../hooks/useExibirListas';

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

// [
//     {
//         "id_plano": 2,
//         "id_paciente": 1,
//         "id_terapeuta": 14,
//         "id_familiar": null,
//         "grauneurodivergencia": "Diagnóstico: TEA, TAB, TDAH, TPN. Descrição: Paciente apresenta neurodivergências de grau 3.",
//         "objetivostratamento": "Melhora cognitiva",
//         "abordagemfamilia": "Ter paciência com o processo do paciente",
//         "cronogramaatividades": "Todos os dias o paciente será exposto a atividades comunicativas e relacionais com outras pessoas",
//         "mensagemplano": "Sei lá",
//         "datacriacao": "2025-11-20T15:39:48.146379",
//         "dataassinaturaterapeuta": null,
//         "dataassinaturafamilia": null
//     }
// ]

export function AcessarPlano() {
  const { id_paciente, id_plano } = useParams();
  const [planos, setplanos] = useState([]);
  const [paciente, setpaciente] = useState([]);
  useExibirListas("http://localhost:8000/cadastro/lista-planos", setplanos);
  useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setpaciente);

  const planoExibido = planos.find(plano => String(plano.id_plano) === String(id_plano) && String(plano.id_paciente) === String(id_paciente));
  const pacienteExibido = paciente?.find(p => String(p.id_paciente) === String(id_paciente));
  
  if (pacienteExibido) {
    planoExemplo.pacienteNome = pacienteExibido.nome;
  }
  if (planoExibido) {
    planoExemplo.neurodivergencia = [planoExibido.grauneurodivergencia];
    planoExemplo.metodologia = ["Metodologia padrão 1", "Metodologia padrão 2"]; // Substitua por dados reais se disponíveis
    planoExemplo.objetivos = planoExibido.objetivostratamento;
    planoExemplo.abordagemFamilia = planoExibido.abordagemfamilia;
    planoExemplo.sobrePlano = planoExibido.mensagemplano;
    planoExemplo.cronograma = [planoExibido.cronogramaatividades];
  }

  return (

    <div className="acessar-plano-page-wrapper">
      <div className='sidebar-acessar-plano'>
        <IconVoltar to={`/terapeuta/paciente/${id_paciente}/plano-terapeutico-terapeuta`} />
        <IconSair to='/login' />
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
            <CampoDetalhes titulo="Objetivos do tratamento">
              <p>{planoExemplo.objetivos || "Nenhum objetivo definido."}</p>
            </CampoDetalhes>

            <CampoDetalhes titulo="Abordagem para família/cuidadores/responsáveis:">
              <p>{planoExemplo.abordagemFamilia || "Nenhuma abordagem definida."}</p>
            </CampoDetalhes>

            <CampoDetalhes titulo="Instruções Gerais:">
              <p>{planoExemplo.sobrePlano || "Nenhuma informação adicional."}</p>
            </CampoDetalhes>

            <CampoDetalhes titulo="Cronograma das atividades">
              <ul>
                {planoExemplo.cronograma.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
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