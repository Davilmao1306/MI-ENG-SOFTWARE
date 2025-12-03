import { useParams } from 'react-router-dom';
import { CampoDetalhes } from '../../componentes/CampoDetalhes';
import './acessar-plano.estilo.css';
import { IconVoltar } from '../../componentes/IconVoltar'
import { IconSair } from '../../componentes/IconSair'
import { useState } from 'react';
import { useExibirListas } from '../../hooks/useExibirListas';


export function AcessarPlano() {
  const { id_paciente, id_plano } = useParams();
  const [plano, setPlano] = useState(null);
  useExibirListas(`http://localhost:8000/plano/plano/${id_plano}`, setPlano);
  
  const origem = localStorage.getItem('tipo')
  const voltarPara =
    origem === "T"
      ? `/terapeuta/paciente/${id_paciente}/plano-terapeutico-terapeuta` : `/${id_paciente}/plano-terapeutico-familiar`;
  if (!plano) {
    return <div className="loading">Carregando dados do plano...</div>;
  }


  return (

    <div className="acessar-plano-page-wrapper">
      <div className='sidebar-acessar-plano'>
        <IconVoltar to={voltarPara} />
        <IconSair to='/login' />
      </div>
      <div className="acessar-plano-main-container">
        <div className="acessar-plano-bordered-content">
          <header className="acessar-plano-header">
            <h1>Plano terapeutico paciente {plano.paciente_nome}</h1>
          </header>
          <main className="acessar-plano-content">
            <CampoDetalhes titulo="Neurodivergência">
              <ul>
                {plano.lista_neurodivergencias?.map((item, index) => (
                  <li key={index}>
                    {typeof item === 'object' ? item.nome_completo + `(${item.sigla})` : item}
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: '10px' }}>
                Descrição: {plano.grau_neurodivergencia}
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
            {plano.lista_links?.length > 0 && (
              <div className="link-imagem-section">
                <h3>Links:</h3>
                {plano.lista_links.map((link, idx) => (
                  <div key={idx}>
                    <a href={`${link.url}`} target="_blank" rel="noopener noreferrer">
                      📄 {link.url}
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