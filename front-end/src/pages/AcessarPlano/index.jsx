import { useParams } from 'react-router-dom';
import { CampoDetalhes } from '../../componentes/CampoDetalhes';
import './acessar-plano.estilo.css';
import { IconVoltar } from '../../componentes/IconVoltar'
import { IconSair } from '../../componentes/IconSair'
import { useState } from 'react';
import { useExibirListas } from '../../hooks/useExibirListas';

const planoExemplo = {
  pacienteNome: "",
  neurodivergencia_lista: [],
  neurodivergencia_desc: "",
  metodologia: [],
  cronograma: [],
  objetivos: "...",
  abordagemFamilia: "...",
  sobrePlano: "...",
  assinaturas: "...",
  linkExterno: "/",
  anexo: "",
};

export function AcessarPlano() {
  const { id_paciente, id_plano } = useParams();
  const [paciente, setpaciente] = useState([]);
  const [plano, setPlano] = useState(null);
  useExibirListas(`http://localhost:8000/plano/plano/${id_plano}`, setPlano);
  useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setpaciente);
  console.log(plano);
  if (!plano) {
    return <div className="loading">Carregando dados do plano...</div>;
  }
  const planoExibido = plano;
  const pacienteExibido = paciente?.find(p => String(p.id_paciente) === String(id_paciente));
  //console.log(planoExibido);
  if (pacienteExibido) {
    planoExemplo.pacienteNome = pacienteExibido.nome;
  }
  if (planoExibido) {
    planoExemplo.neurodivergencia_lista = planoExibido.lista_neurodivergencias;
    planoExemplo.neurodivergencia_desc = planoExibido.grauneurodivergencia;
    planoExemplo.metodologia = planoExibido.lista_metodos;
    planoExemplo.objetivos = planoExibido.objetivostratamento;
    planoExemplo.abordagemFamilia = planoExibido.abordagemfamilia;
    planoExemplo.sobrePlano = planoExibido.mensagemplano;
    planoExemplo.cronograma = [planoExibido.cronogramaatividades];
    planoExemplo.anexo = planoExibido.lista_anexos;
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
            <h1>Plano terapeutico paciente {plano.paciente_nome}</h1>
          </header>


          <main className="acessar-plano-content">

            <CampoDetalhes titulo="Neurodivergência">
              {/* Verifica se a lista existe antes de fazer o map */}
              <ul>
                {plano.lista_neurodivergencias?.map((item, index) => (
                  // O backend manda um objeto {sigla: "TEA", ...}, então acessamos item.sigla
                  <li key={index}>
                    {typeof item === 'object' ? item.nome_completo + `(${item.sigla})` : item}
                  </li>
                ))}
              </ul>
              {/* Texto descritivo do grau */}
              <p style={{ marginTop: '10px' }}>
                Descrição: {plano.grau_neurodivergencia_descricao || plano.grau_neurodivergencia}
              </p>
            </CampoDetalhes>

            <CampoDetalhes titulo="Metodologia de acompanhamento">
              <ul>
                {plano.lista_metodos?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CampoDetalhes>
            <CampoDetalhes titulo="Objetivos do tratamento">
              <p>{plano.objetivos_tratamento || "Nenhum objetivo definido."}</p>
            </CampoDetalhes>

            <CampoDetalhes titulo="Abordagem para família/cuidadores/responsáveis:">
              <p>{plano.abordagem_familia || "Nenhuma abordagem definida."}</p>
            </CampoDetalhes>

            <CampoDetalhes titulo="Instruções Gerais:">
              <p>{plano.mensagem_plano || "Sem mensagem adicional."}</p>
            </CampoDetalhes>

            <CampoDetalhes titulo="Cronograma das atividades">
              <p>{plano.cronograma_atividades || "Sem cronograma."}</p>
            </CampoDetalhes>
            {plano.lista_anexos?.length > 0 && (
              <div className="link-imagem-section">
                <h3>Anexos:</h3>
                {plano.lista_anexos.map((anexo, idx) => (
                  <div key={idx}>
                    <a href={`http://localhost:8000/plano/download/${anexo.id_anexo}`} target="_blank" rel="noopener noreferrer">
                      📄 {anexo.nome_arquivo}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}