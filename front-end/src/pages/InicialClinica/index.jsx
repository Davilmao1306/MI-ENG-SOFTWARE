import { useState, useEffect } from 'react';
import { Sidebar } from '../../componentes/Sidebar'; 
import './dashboard-clinica.estilo.css'; 
import { RiPsychotherapyLine } from "react-icons/ri";
import { FiUser, FiActivity, FiArrowUpCircle } from 'react-icons/fi';
import {FiLink, FiUsers, FiUserMinus } from 'react-icons/fi'; 

// Dados fictícios para simular a API
const mockData = {
  totalTerapeutas: 15,
  terapeutasMes: 3,
  totalPacientes: 85,
  pacientesMes: 12,
  totalFamiliares: 90,
  familiaresMes: 8,
  pacientesSemTerapeuta: 8,
  pacientesSemFamiliar: 15,
  distribuicaoPacientesTerapeuta: [ // Exemplo simplificado
    { nome: 'Dr. Santos', pacientes: 10 },
    { nome: 'Dra. Ana', pacientes: 8 },
    { nome: 'Dr. Pedro', pacientes: 7 },
  ],
  // Fim dos NOVOS DADOS

  atividadeRecente: [
    { id: 1, usuario: 'Maria Silva', acao: 'Novo paciente cadastrado', hora: '11:20:04', tipo: 'paciente' },
    { id: 2, usuario: 'Dr. Santos', acao: 'Utilizou plano com João P.', hora: '12:11:09', tipo: 'terapeuta' },
    { id: 3, usuario: 'Luana S.', acao: 'Atualizou informações de perfil', hora: '10:05:15', tipo: 'familiar' },
    { id: 4, usuario: 'Dr. Santos', acao: 'Criou novo plano terapêutico', hora: '09:30:00', tipo: 'terapeuta' },
  ]
};

export function DashboardInicial() {
  const [data, setData] = useState(mockData); 

  return (
    <div className="dashboard-layout">
      <Sidebar /> 

      <main className="dashboard-main-content">
        <h1 className="dashboard-title">Dashboard</h1>

        <section className="dashboard-summary-cards">
          <div className="summary-card">
            <div className="card-icon-wrapper users"><RiPsychotherapyLine size={30} /></div>
            <div className="card-info">
              <span className="card-label">Total de Terapeutas</span>
              <span className="card-value">{data.totalTerapeutas}</span>
              <span className="card-trend"><FiArrowUpCircle /> +{data.terapeutasMes} este mês</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon-wrapper user"><FiUser size={30} /></div>
            <div className="card-info">
              <span className="card-label">Total de Pacientes</span>
              <span className="card-value">{data.totalPacientes}</span>
              <span className="card-trend"><FiArrowUpCircle /> +{data.pacientesMes} este mês</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="card-icon-wrapper home"><FiUsers size={30} /></div>
            <div className="card-info">
              <span className="card-label">Total de Familiares</span>
              <span className="card-value">{data.totalFamiliares}</span>
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