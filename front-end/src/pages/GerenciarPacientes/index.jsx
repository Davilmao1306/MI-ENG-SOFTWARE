import React, { useState, useEffect } from 'react';
import { PacienteCard } from '../../componentes/PacienteCard';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { VincularFamiliarModal } from '../../componentes/VincularFamiliarModal';
import { VincularTerapeutaModal } from '../../componentes/VincularTerapeutaModal';
import './gerenciar-pacientes.estilo.css';


export function GerenciarPacientes() {

  const [pacientes, setPacientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const urlGetPacientes = "http://localhost:8000/cadastro/lista-pacientes";

  const fetchPacientes = () => {
    fetch(urlGetPacientes)
      .then((res) => res.json())
      .then((data) => setPacientes(data))
      .catch((err) => console.error("Erro ao buscar pacientes:", err));
  };

  useEffect(() => {
    fetchPacientes();
  }, []);
  // Isso é um teste fim


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
      paciente.nome.toLowerCase().includes(termo)
    );
  });
  

  const handleRemoverOuInativarPaciente = (paciente) => {
      const confirmAction = window.confirm(
        `Deseja realmente remover/inativar o paciente ${paciente.nome} (ID: ${paciente.id_paciente})?`
      );

      if (confirmAction) {
        console.log(`Ação de remover/inativar para o paciente: ${paciente.nome}`);
        // Lógica para chamar sua API de remoção/inativação aqui (DELETE ou PATCH)
        // Exemplo (AJUSTE PARA SUA API REAL):
        // fetch(`http://localhost:8000/cadastro/pacientes/${paciente.id_paciente}/`, {
        //   method: 'DELETE', // Ou 'PATCH' para inativar
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // })
        // .then(response => {
        //   if (response.ok) {
        //     alert('Paciente removido/inativado com sucesso!');
        //     fetchPacientes(); // Recarrega a lista de pacientes
        //   } else {
        //     alert('Erro ao remover/inativar paciente.');
        //   }
        // })
        // .catch(error => console.error('Erro na requisição:', error));

        // Por enquanto, apenas um console.log e recarregar para simular
        alert(`Paciente ${paciente.nome} (ID: ${paciente.id_paciente}) seria removido/inativado.`);
        fetchPacientes(); // Recarrega a lista para refletir a mudança (se fosse real)
      }
    };
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
      if (p.id_paciente === pacienteId) {
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
      if (p.id_paciente === pacienteId) {
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
      <Navbar userName="Clínica" />
      <main className="gerenciar-pacientes-main-content">
        <h1 className="gerenciar-pacientes-title">Gerenciamento de Pacientes</h1>

        <div className="acoes-gerenciamento">
          <div className="search-input-wrapper expanded">
            <FiSearch className="search-icon" />
            <input
              className="search-input-wrapper"
              type="text"
              placeholder="Buscar por nome, ID, terapeuta ou familiar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              
            />
          </div>

          <Link to="/clinica/cadastrar-paciente" className="add-button">
            <FiPlusCircle /> Cadastrar Paciente
          </Link>
        </div>

        <div className="pacientes-grid">
          {filteredPacientes.length > 0 ? (
            filteredPacientes.map(paciente => (
              <PacienteCard
                key={paciente.id_paciente}
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
            onRemoverOuInativar={handleRemoverOuInativarPaciente}
          />
        )}
      </main>
    </div>
  );
}