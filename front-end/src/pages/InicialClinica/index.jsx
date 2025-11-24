import { useState, useEffect, use } from 'react';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import './dashboard-clinica.estilo.css';
import { RiPsychotherapyLine } from "react-icons/ri";
import { FiUser, FiActivity, FiArrowUpCircle } from 'react-icons/fi';
import { FiLink, FiUsers, FiUserMinus } from 'react-icons/fi';
import { useExibirListas } from "../../hooks/useExibirListas";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';


// Dados fictícios para simular a API
const mockData = {
  terapeutasMes: 0,
  pacientesMes: 0,
  familiaresMes: 0,
  pacientesSemTerapeuta: 0,
  pacientesSemFamiliar: 0,
  distribuicaoPacientesTerapeuta: [],
  atividadeRecente: []
};
function fetchDashboardData(terapeutas, familiares, pacientes, vinculospt, vinculospf) {
  mockData.terapeutasMes = terapeutas.length;
  mockData.pacientesMes = pacientes.length;
  mockData.familiaresMes = familiares.length;
  // Pacientes sem terapeuta
  const pacientesComTerapeuta = new Set(vinculospt.map(v => v.id_paciente));
  mockData.pacientesSemTerapeuta = pacientes.filter(p => !pacientesComTerapeuta.has(p.id_paciente)).length;
  // Pacientes sem familiar
  const pacientesComFamiliar = new Set(vinculospf.map(v => v.id_paciente));
  mockData.pacientesSemFamiliar = pacientes.filter(p => !pacientesComFamiliar.has(p.id_paciente)).length;
  // Distribuição de pacientes por terapeuta
  const distribuicao = terapeutas.map(t => {
    const count = vinculospt.filter(v => v.id_terapeuta === t.id_terapeuta).length;
    return { nome: t.nome, pacientes: count };
  });
  mockData.distribuicaoPacientesTerapeuta = distribuicao;
}
export function DashboardInicial() {

  const [listTerapeutas, setListTerapeutas] = useState([])
  const [listFamiliares, setListFamiliares] = useState([])
  const [listPacientes, setListPacientes] = useState([])
  const [listVinculospt, setListVinculospt] = useState([])
  const [listVinculospf, setListVinculospf] = useState([])
  useExibirListas("http://localhost:8000/cadastro/lista-terapeutas", setListTerapeutas)
  useExibirListas("http://localhost:8000/cadastro/lista-familiares", setListFamiliares);
  useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setListPacientes);
  useExibirListas("http://localhost:8000/cadastro/lista-vinculos-pt", setListVinculospt);
  useExibirListas("http://localhost:8000/cadastro/lista-vinculos-pf", setListVinculospf);
  const [data, setData] = useState(mockData);
  const navigate = useNavigate();

  fetchDashboardData(listTerapeutas, listFamiliares, listPacientes, listVinculospt, listVinculospf);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expired = decoded.exp * 1000 < Date.now();

      if (expired) {
        console.log("Token expirado!");
        localStorage.removeItem("token");
        localStorage.removeItem("tipo");
        localStorage.removeItem("id_usuario");
        navigate("/login");
      } else {
        console.log("Token válido.");
      }

    } catch (e) {
      console.log("Token inválido!");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <Navbar userName="Clínica" />
      <main className="dashboard-main-content">
        <h1 className="dashboard-title">Dashboard</h1>

        <section className="dashboard-summary-cards">
          <div className="summary-card">
            <div className="card-icon-wrapper users"><RiPsychotherapyLine size={30} /></div>
            <div className="card-info">
              <span className="card-label">Total de Terapeutas</span>
              <span className="card-value">{listTerapeutas.length}</span>
              <span className="card-trend"><FiArrowUpCircle /> +{data.terapeutasMes} este mês</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon-wrapper user"><FiUser size={30} /></div>
            <div className="card-info">
              <span className="card-label">Total de Pacientes</span>
              <span className="card-value">{listPacientes.length}</span>
              <span className="card-trend"><FiArrowUpCircle /> +{data.pacientesMes} este mês</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon-wrapper home"><FiUsers size={30} /></div>
            <div className="card-info">
              <span className="card-label">Total de Familiares</span>
              <span className="card-value">{listFamiliares.length}</span>
              <span className="card-trend"><FiArrowUpCircle /> +{data.familiaresMes} este mês</span>
            </div>
          </div>
        </section>

        <section className="dashboard-details-section">

          <div className="vinculos-card">
            <h2 className="section-subtitle">Vínculos e Distribuição</h2>
            <ul>
              <li className="vinculo-item">
                <FiUserMinus size={20} color="#E53935" />
                <span className="vinculo-label">Pacientes sem Terapeuta:</span>
                <span className="vinculo-value">{data.pacientesSemTerapeuta}</span>
              </li>
              <li className="vinculo-item">
                <FiUsers size={20} color="#E53935" />
                <span className="vinculo-label">Pacientes sem Familiar:</span>
                <span className="vinculo-value">{data.pacientesSemFamiliar}</span>
              </li>
              <li className="vinculo-item-distribuicao">
                <FiLink size={20} color="#42A5F5" />
                <span className="vinculo-label"> Distribuição por Terapeuta:</span>
                <ul className="sub-list">
                  {data.distribuicaoPacientesTerapeuta.map((item, index) => (
                    <li key={index}>{item.nome}: {item.pacientes} pacientes</li>
                  ))}
                </ul>
              </li>

            </ul>
            {data.pacientesSemTerapeuta === 0 && data.pacientesSemFamiliar === 0 && (
              <p className="no-items">Todos os pacientes estão vinculados.</p>
            )}
          </div>

          {/* Atividade Recente */}
          <div className="activity-card">
            <h2 className="section-subtitle">Atividade Recente</h2>
            {data.atividadeRecente.length > 0 ? (
              <ul>
                {data.atividadeRecente.map(activity => (
                  <li key={activity.id} className="activity-item">
                    <span className={`activity-icon ${activity.tipo}`}><FiActivity /></span>
                    <div>
                      <span className="activity-action">{activity.acao}</span>
                      <span className="activity-user"> por {activity.usuario}</span>
                    </div>
                    <span className="activity-time">{activity.hora}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-items">Nenhuma atividade recente.</p>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}