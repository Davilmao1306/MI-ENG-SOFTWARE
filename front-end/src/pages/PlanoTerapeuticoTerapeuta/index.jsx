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
  useExibirListas("http://localhost:8000/cadastro/lista-planos", setPlanosTerapeuta);
  const { id_paciente } = useParams(); //usado para pegar o id do paciente na url

  const planosfiltrados = planosTerapeuta?.filter(plano => String(plano.id_paciente) === String(id_paciente));
  const [showFeedbacksModal, setShowFeedbacksModal] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState(null);

  const handleOpenFeedbacks = async (plano) => {
    setPlanoSelecionado(plano);
    setShowFeedbacksModal(true);
    setFeedbacks([]);
    try {
      // Supondo que você crie uma rota assim no Django
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

  // const feedbacksDoPlano =
  //   planoSelecionado ? feedbacks[planoSelecionado.id] || [] : [];
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
              {planosfiltrados.map(plano => (
                <PlanoCard
                  key={plano.id_plano}
                  data={new Date(plano.datacriacao).toLocaleString()}
                  status={plano.grauneurodivergencia}
                  // descricao={plano.mensagemplano + " Objetivos: " + plano.objetivostratamento}
                  descricao={"Abordagem Familiar: " + plano.abordagemfamilia + ". Cronograma de Atividades: " + plano.cronogramaatividades + ". Objetivos: " + plano.objetivostratamento}
                  userRole={"terapeuta"}
                  plano={plano}
                  onViewFeedbacks={() => handleOpenFeedbacks(plano)}
                />
              ))}
            </div>
          </section>
          {/* Coluna dos Botões de Ação */}
          <aside className="coluna-acoes">
            {/* /terapeuta/pacientes/:id_paciente/criar-plano */}
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