import { Link, useParams } from 'react-router-dom';
import { PlanoCard } from '../../componentes/CardPlanoTerapeutico';
import './plano-terapeutico-familiar.estilo.css';
import { IconSair } from '../../componentes/IconSair'
import { IconVoltar } from '../../componentes/IconVoltar'
import { use, useState } from 'react';
import { useExibirListas } from '../../hooks/useExibirListas';


// Dados fictícios
const planos = [
  { id: 1, data: "25/09/2025", status: "Em uso", descricao: "Plano feito pela terapeuta Ana Clara...", UserRole: 'familiar' },
  { id: 2, data: "10/09/2025", status: "Em uso", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas...", UserRole: 'familiar' },
  { id: 3, data: "07/07/2025", status: "Em uso", descricao: "Plano feito pelo terapeuta Paulo Mascarenhas...", UserRole: 'familiar' },
];


export function PlanosFamiliar() {
  const { id_paciente } = useParams();
  const [planosTerapeuta, setPlanosTerapeuta] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  useExibirListas("http://localhost:8000/cadastro/lista-planos", setPlanosTerapeuta);
  useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setPacientes);
  const planosfiltrados = planosTerapeuta?.filter(plano => String(plano.id_paciente) === String(id_paciente));
  const pacienteAtual = pacientes.find(p => String(p.id_paciente) === String(id_paciente));


  return (
    <main className="planos-terapeuta-container">

      <div className='barra-lateral-planos'>
        <IconVoltar to={`/familiar-paciente/${id_paciente}`} />
        <IconSair to='/login' />
      </div>

      <div className="planos-terapeuta-main">
        <h1 className="titulo-principal">Planos terapêuticos sendo usado</h1>
        <div className="conteudo-dividido">
          {/* Coluna da Lista de Planos */}
          <section className="coluna-planos">
            <h2 className="subtitulo-historico">Paciente {pacienteAtual?.nome}</h2>
            <div className="lista-de-planos-terapeuta">
              {planosfiltrados.map(plano => (
                <PlanoCard
                  key={plano.id_plano}
                  data={new Date(plano.datacriacao).toLocaleString()}
                  status={plano.grauneurodivergencia}
                  // descricao={plano.mensagemplano + " Objetivos: " + plano.objetivostratamento}
                  descricao = {"Abordagem Familiar: " + plano.abordagemfamilia + ". Cronograma de Atividades: " + plano.cronogramaatividades + ". Objetivos: " + plano.objetivostratamento}
                  userRole={"familiar"}
                  plano={plano}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

