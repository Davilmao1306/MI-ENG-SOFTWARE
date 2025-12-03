import { Link, useParams } from 'react-router-dom';
import { PlanoCard } from '../../componentes/CardPlanoTerapeutico';
import './plano-terapeutico-terapeuta.estilo.css';
import { FiPlusCircle } from 'react-icons/fi';
import { IconVoltar } from '../../componentes/IconVoltar';
import { IconSair } from '../../componentes/IconSair';
import { useExibirListas } from '../../hooks/useExibirListas';
import { useState } from 'react';
import FeedbacksPlanoTerapeutaModal from './../../componentes/FeedbacksPlanoTerapeuta/index';




export function PlanosTerapeuta() {
  const [planosTerapeuta, setPlanosTerapeuta] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const { id_paciente } = useParams();
  const planosfiltrados = planosTerapeuta?.filter(plano => String(plano.id_paciente) === String(id_paciente));
  const [showFeedbacksModal, setShowFeedbacksModal] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState(null);

  useExibirListas("http://localhost:8000/cadastro/lista-planos", setPlanosTerapeuta);
  
  const handleOpenFeedbacks = async (plano) => {
    setPlanoSelecionado(plano);
    setShowFeedbacksModal(true);
    setFeedbacks([]);
    try {
      const response = await fetch(`http://localhost:8000/plano/plano/${plano.id_plano}/feedbacks`);
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data);
      }
    } catch (error) {
      console.error("Erro ao buscar feedbacks:", error);
      setFeedbacks([]);
    }
  };

  const handleCloseFeedbacks = () => {
    setPlanoSelecionado(null);
    setShowFeedbacksModal(false);
    setFeedbacks([]);
  };
  return (
    <main className="planos-terapeuta-container">
      <div className='sidebar-plano'>
        <IconVoltar to='/terapeuta/pacientes' />
        <IconSair to='/login' />
      </div>
      <div className="planos-terapeuta-main">
        <h1 className="titulo-principal">Plano terapêutico de terapia ocupacional</h1>
        <div className="conteudo-dividido">
          <section className="coluna-planos">
            <h2 className="subtitulo-historico">Históricos de Planos Terapeuticos</h2>
            <div className="lista-de-planos-terapeuta">
              {planosfiltrados.map(plano => (
                <PlanoCard
                  key={plano.id_plano}
                  data={new Date(plano.datacriacao).toLocaleString()}
                  status={plano.grauneurodivergencia}
                  descricao={"Abordagem Familiar: " + plano.abordagemfamilia + ". Cronograma de Atividades: " + plano.cronogramaatividades + ". Objetivos: " + plano.objetivostratamento}
                  userRole={"terapeuta"}
                  plano={plano}
                  idPaciente = {id_paciente}
                  onViewFeedbacks={() => handleOpenFeedbacks(plano)}
                />
              ))}
            </div>
          </section>

          <aside className="coluna-acoes">
            <Link to={`/terapeuta/pacientes/${id_paciente}/criar-plano`} className="botao-acao">
              <FiPlusCircle /> Criar plano
            </Link>
          </aside>
        </div>
      </div>
      <FeedbacksPlanoTerapeutaModal
        isOpen={showFeedbacksModal}
        onClose={handleCloseFeedbacks}
        plano={planoSelecionado}
        feedbacks={feedbacks}
      />
    </main>
  );
}