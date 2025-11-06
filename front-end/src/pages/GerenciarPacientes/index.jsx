// src/paginas/GerenciarPacientes/index.jsx
import React, { useState, useEffect } from 'react';
import { PacienteCard } from '../../componentes/PacienteCard';
import { Sidebar } from '../../componentes/Sidebar';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { VincularFamiliarModal } from '../../componentes/VincularFamiliarModal';
import { VincularTerapeutaModal } from '../../componentes/VincularTerapeutaModal';
import './gerenciar-pacientes.estilo.css';

// Dados fictícios para Familiares e Terapeutas (precisam estar disponíveis para o mockPacientes)
const mockAllFamiliares = [
    { id: 'f001', nome: 'João Silva', parentesco: 'Pai', email: 'joao@email.com' },
    { id: 'f002', nome: 'Maria Souza', parentesco: 'Mãe', email: 'maria@email.com' },
    { id: 'f003', nome: 'Pedro Santos', parentesco: 'Irmão', email: 'pedro@email.com' },
    { id: 'f004', nome: 'Ana Costa', parentesco: 'Tia', email: 'ana@email.com' },
];

const mockAllTerapeutas = [
  { id: 't001', nome: 'Dr. Lucas Ribeiro', especialidade: 'Psicólogo', email: 'lucas@terapeuta.com' },
  { id: 't002', nome: 'Dra. Sofia Mendes', especialidade: 'Neuropsicóloga', email: 'sofia@terapeuta.com' },
  { id: 't003', nome: 'Dr. Carlos Lima', especialidade: 'Psiquiatra', email: 'carlos@terapeuta.com' },
  { id: 't004', nome: 'Dra. Patrícia Gomes', especialidade: 'Fisioterapeuta', email: 'patricia@terapeuta.com' },
];

// O MOCK DE PACIENTES DEVE USAR OS OBJETOS COMPLETOS PARA FAMILIARES/TERAPEUTAS
const mockPacientes = [
    {
        id: 'p001',
        nome: "Maria Silva",
        num: "12185",
        idade: 5,
        genero: "Feminino",
        endereco: "Rua A, 123",
        terapeutasVinculados: [mockAllTerapeutas[0]], // Array de objetos
        familiarVinculado: [mockAllFamiliares[0]], // Array de objetos
    },
    {
        id: 'p002',
        nome: "João Pedro",
        num: "67890",
        idade: 3,
        genero: "Masculino",
        endereco: "Av. B, 456",
        terapeutasVinculados: [mockAllTerapeutas[1]],
        familiarVinculado: [mockAllFamiliares[2]],
    },
    {
        id: 'p003',
        nome: "Ana Clara",
        num: "11223",
        idade: 8,
        genero: "Não Binário",
        endereco: "Travessa C, 789",
        terapeutasVinculados: [mockAllTerapeutas[0], mockAllTerapeutas[2]],
        familiarVinculado: [],
    },
    {
        id: 'p004',
        nome: "Carlos Henrique",
        num: "44556",
        idade: 4,
        genero: "Masculino",
        endereco: "Praça D, 10",
        terapeutasVinculados: [mockAllTerapeutas[1]],
        familiarVinculado: [mockAllFamiliares[3]],
    },
    {
        id: 'p005',
        nome: "Sofia Costa",
        num: "77889",
        idade: 12,
        genero: "Feminino",
        endereco: "Alameda E, 20",
        terapeutasVinculados: [],
        familiarVinculado: [mockAllFamiliares[1]],
    },
];

export function GerenciarPacientes() {
  const [pacientes, setPacientes] = useState(mockPacientes);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para o modal de familiar
  const [showVincularFamiliarModal, setShowVincularFamiliarModal] = useState(false);
  const [selectedPacienteForVincularFamiliar, setSelectedPacienteForVincularFamiliar] = useState(null);

  // Estados para o modal de terapeuta
  const [showVincularTerapeutaModal, setShowVincularTerapeutaModal] = useState(false);
  const [selectedPacienteForVincularTerapeuta, setSelectedPacienteForVincularTerapeuta] = useState(null);


  // Lógica de filtro atualizada para incluir busca por nomes de terapeutas e familiares
  const filteredPacientes = pacientes.filter(paciente => {
    const termo = searchTerm.toLowerCase();

    // Concatena nomes de terapeutas em uma string para busca
    const nomeTerapeutas = paciente.terapeutasVinculados
      ? paciente.terapeutasVinculados.map(t => t.nome.toLowerCase()).join(' ')
      : '';
    // Concatena nomes de familiares em uma string para busca
    const nomeFamiliares = paciente.familiarVinculado
      ? paciente.familiarVinculado.map(f => f.nome.toLowerCase()).join(' ')
      : '';

    return (
      paciente.nome.toLowerCase().includes(termo) ||
      paciente.num.includes(termo) ||
      nomeTerapeutas.includes(termo) ||
      nomeFamiliares.includes(termo)
    );
  });

  // Funções para abrir/fechar o modal de FAMILIAR
  const handleOpenVincularFamiliarModal = (paciente) => {
    setSelectedPacienteForVincularFamiliar(paciente);
    setShowVincularFamiliarModal(true);
  };

  const handleCloseVincularFamiliarModal = () => {
    setShowVincularFamiliarModal(false);
    setSelectedPacienteForVincularFamiliar(null);
  };

  const handleSaveFamiliarVincular = (pacienteId, familiaresToLink) => {
    console.log(`Salvando vínculos de familiar para paciente ${pacienteId}:`, familiaresToLink);
    setPacientes(prevPacientes => prevPacientes.map(p => {
      if (p.id === pacienteId) {
        return {
          ...p,
          familiarVinculado: familiaresToLink // Agora salva o array de objetos familiares
        };
      }
      return p;
    }));
  };

  // Funções para abrir/fechar o modal de TERAPEUTA
  const handleOpenVincularTerapeutaModal = (paciente) => {
    setSelectedPacienteForVincularTerapeuta(paciente);
    setShowVincularTerapeutaModal(true);
  };

  const handleCloseVincularTerapeutaModal = () => {
    setShowVincularTerapeutaModal(false);
    setSelectedPacienteForVincularTerapeuta(null);
  };

  const handleSaveTerapeutaVincular = (pacienteId, terapeutasToLink) => {
    console.log(`Salvando vínculos de terapeuta para paciente ${pacienteId}:`, terapeutasToLink);
    setPacientes(prevPacientes => prevPacientes.map(p => {
      if (p.id === pacienteId) {
        return {
          ...p,
          terapeutasVinculados: terapeutasToLink // Agora salva o array de objetos terapeutas
        };
      }
      return p;
    }));
  };


  return (
    <div className="gerenciar-pacientes-layout">
      <Sidebar />
      <main className="gerenciar-pacientes-main-content">
        <h1 className="gerenciar-pacientes-title">Gerenciamento de Pacientes</h1>

        <div className="acoes-gerenciamento">
          <div className="search-input-wrapper expanded">
            <FiSearch className="search-icon" />
            <input
                type="text"
                placeholder="Buscar por nome, ID, terapeuta ou familiar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
          </div>

          <Link to="/pacientes/novo" className="add-button">
            <FiPlusCircle /> Cadastrar Paciente
          </Link>
        </div>

        <div className="pacientes-grid">
          {filteredPacientes.length > 0 ? (
            filteredPacientes.map(paciente => (
              <PacienteCard
                key={paciente.id}
                paciente={paciente}
                onVincularFamiliar={handleOpenVincularFamiliarModal}
                onVincularTerapeuta={handleOpenVincularTerapeutaModal}
              />
            ))
          ) : (
            <p className="no-pacientes-found">Nenhum paciente encontrado com os critérios de busca.</p>
          )}
        </div>

        {/* Modal de Vincular Familiar */}
        {showVincularFamiliarModal && selectedPacienteForVincularFamiliar && (
          <VincularFamiliarModal
            paciente={selectedPacienteForVincularFamiliar}
            onClose={handleCloseVincularFamiliarModal}
            onSave={handleSaveFamiliarVincular}
          />
        )}

        {/* Modal de Vincular Terapeuta */}
        {showVincularTerapeutaModal && selectedPacienteForVincularTerapeuta && (
          <VincularTerapeutaModal
            paciente={selectedPacienteForVincularTerapeuta}
            onClose={handleCloseVincularTerapeutaModal}
            onSave={handleSaveTerapeutaVincular}
          />
        )}
      </main>
    </div>
  );
}