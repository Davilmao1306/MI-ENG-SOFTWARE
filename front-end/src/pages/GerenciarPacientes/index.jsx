import  { useState, useEffect } from 'react';
import { PacienteCard } from '../../componentes/PacienteCard';
import { Sidebar } from '../../componentes/Sidebar';
import { FiPlusCircle, FiSearch } from 'react-icons/fi'; 
import { Link } from 'react-router-dom';
import './gerenciar-pacientes.estilo.css'; 

// Dados fictícios de exemplo
const mockPacientes = [
  { id: 'p001', nome: "Maria Silva", num: "12345", idade: 25, genero: "Feminino", endereco: "Rua A, 123", terapeuta: "Dr. João", familiar: "Ana Silva" },
  { id: 'p002', nome: "João Pedro", num: "67890", idade: 30, genero: "Masculino", endereco: "Av. B, 456", terapeuta: "Dra. Paula", familiar: "Pedro Santos" },
  { id: 'p003', nome: "Ana Clara", num: "11223", idade: 18, genero: "Não Binário", endereco: "Travessa C, 789", terapeuta: "Dr. João", familiar: null },
  { id: 'p004', nome: "Carlos Henrique", num: "44556", idade: 40, genero: "Masculino", endereco: "Praça D, 10", terapeuta: "Dra. Paula", familiar: "Julia Henrique" },
  { id: 'p005', nome: "Sofia Costa", num: "77889", idade: 12, genero: "Feminino", endereco: "Alameda E, 20", terapeuta: null, familiar: "Mariana Costa" },
];

export function GerenciarPacientes() {
  const [pacientes, setPacientes] = useState(mockPacientes);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerapeuta, setFilterTerapeuta] = useState(''); 


  const filteredPacientes = pacientes.filter(paciente =>
    (paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
     paciente.num.includes(searchTerm)) &&
    (filterTerapeuta === '' || (paciente.terapeuta && paciente.terapeuta.toLowerCase().includes(filterTerapeuta.toLowerCase())))
  );

  
  const uniqueTerapeutas = [...new Set(pacientes.map(p => p.terapeuta).filter(Boolean))];

  return (
    <div className="gerenciar-pacientes-layout">
      <Sidebar />
      <main className="gerenciar-pacientes-main-content">
        <h1 className="gerenciar-pacientes-title">Gerenciamento de Pacientes</h1>

        <div className="acoes-gerenciamento">
          <div className="search-filter-group">
            <div className="search-input-wrapper">
                <FiSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Buscar por nome ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
            </div>
           
          </div>

          <Link to="/clinica/cadastrar-paciente" className="add-button">
            <FiPlusCircle /> Cadastrar Paciente
          </Link>
        </div>

        <div className="pacientes-grid">
          {filteredPacientes.length > 0 ? (
            filteredPacientes.map(paciente => (
              <PacienteCard key={paciente.id} paciente={paciente} />
            ))
          ) : (
            <p className="no-pacientes-found">Nenhum paciente encontrado com os critérios de busca.</p>
          )}
        </div>
      </main>
    </div>
  );
}