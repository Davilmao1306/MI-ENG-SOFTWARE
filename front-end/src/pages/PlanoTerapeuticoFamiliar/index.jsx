import { useParams } from 'react-router-dom';
import { PlanoCard } from '../../componentes/CardPlanoTerapeutico';
import './plano-terapeutico-familiar.estilo.css';
import { IconSair } from '../../componentes/IconSair'
import { IconVoltar } from '../../componentes/IconVoltar'
import { useState } from 'react';
import { useExibirListas } from '../../hooks/useExibirListas';
import FeedbackFamiliar from './../../componentes/FeedBackFamiliar/index';


export function PlanosFamiliar() {
  const { id_paciente } = useParams();
  const idUsuarioLogado = localStorage.getItem("id_usuario");
  const [planosTerapeuta, setPlanosTerapeuta] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [listaFamiliares, setListaFamiliares] = useState([]);
  useExibirListas("http://localhost:8000/cadastro/lista-familiares", setListaFamiliares);
  useExibirListas("http://localhost:8000/cadastro/lista-planos", setPlanosTerapeuta);
  useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setPacientes);

  const familiarLogado = listaFamiliares.find(f => String(f.id_usuario) === String(idUsuarioLogado));
  const planosfiltrados = planosTerapeuta?.filter(plano => String(plano.id_paciente) === String(id_paciente));
  const pacienteAtual = pacientes.find(p => String(p.id_paciente) === String(id_paciente));
  
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  const handleOpenModal = (plano) => {
    setPlanoSelecionado(plano);
    setShowFeedbackModal(true);
  };

  const handleCloseModal = () => {
    setShowFeedbackModal(false);
    setPlanoSelecionado(null);
  };

  const handleSubmitFeedback = async (dadosDoFormulario) => {
    
    if (!planoSelecionado || !familiarLogado) {
        alert("Erro: Não foi possível identificar o plano ou o familiar logado.");
        return;
    }
    const payload = {
        id_plano: planoSelecionado.id_plano,
        id_familiar: familiarLogado.id_familiar, 
        section: dadosDoFormulario.section,
        sentiment: dadosDoFormulario.sentiment || "neutro", 
        comment: dadosDoFormulario.comment
    };

    console.log("Enviando feedback:", payload);

    try {
        const response = await fetch("http://localhost:8000/plano/plano/feedback/adicionar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            showToast();      
            handleCloseModal(); 
        } else {
            const erro = await response.json();
            alert("Erro ao enviar feedback: " + (erro.detail || "Erro desconhecido"));
        }
    } catch (error) {
        console.error("Erro de rede:", error);
        alert("Erro de conexão ao enviar feedback.");
    }
  };

  return (
    <main className="planos-terapeuta-container">

      <div className='barra-lateral-planos'>
        <IconVoltar to={`/familiar-paciente/${id_paciente}`} />
        <IconSair to='/login' />
      </div>

      <div className="planos-terapeuta-main">
        <h1 className="titulo-principal">Planos terapêuticos sendo usado</h1>
        <div className="conteudo-dividido">
          <section className="coluna-planos">
            <h2 className="subtitulo-historico">Paciente {pacienteAtual?.nome}</h2>
            <div className="lista-de-planos-terapeuta">
              {planosfiltrados.map(plano => (
                <PlanoCard
                  key={plano.id_plano}
                  data={new Date(plano.datacriacao).toLocaleString()}
                  status={plano.grauneurodivergencia}
                  descricao = {"Abordagem Familiar: " + plano.abordagemfamilia + ". Cronograma de Atividades: " + plano.cronogramaatividades + ". Objetivos: " + plano.objetivostratamento}
                  userRole={"familiar"}
                  plano={plano}
                  onFeedback={() => handleOpenModal(plano)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      <FeedbackFamiliar
        isOpen={showFeedbackModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitFeedback}
        plano={planoSelecionado}
      />
    </main>
  );
}