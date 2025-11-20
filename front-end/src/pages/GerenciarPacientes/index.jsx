import React, { useState, useEffect } from 'react';
import { PacienteCard } from '../../componentes/PacienteCard';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { VincularFamiliarModal } from '../../componentes/VincularFamiliarModal';
import { VincularTerapeutaModal } from '../../componentes/VincularTerapeutaModal';
import './gerenciar-pacientes.estilo.css';

function fetchLista(url, set) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => set(data))
    .catch((err) => console.error("Erro ao buscar pacientes:", err));
}
export function GerenciarPacientes() {

  const [pacientes, setPacientes] = useState([]);
  const [vinculosPf, setVinculosPf] = useState([]);
  const [vinculosPt, setVinculosPt] = useState([]);
  const [familiares, setFamiliares] = useState([]);
  const [terapeutas, setTerapeutas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const urlGetPacientes = "http://localhost:8000/cadastro/lista-pacientes";
  const urlVinculosPf = 'http://localhost:8000/cadastro/lista-vinculos-pf';
  const urlVinculosPt = 'http://localhost:8000/cadastro/lista-vinculos-pt';
  const urlFamiliar = 'http://localhost:8000/cadastro/lista-familiares';
  const urlTerapeuta = 'http://localhost:8000/cadastro/lista-terapeutas';



  useEffect(() => {
    fetchLista(urlGetPacientes, setPacientes);
    fetchLista(urlVinculosPf, setVinculosPf);
    fetchLista(urlFamiliar, setFamiliares);
    fetchLista(urlTerapeuta, setTerapeutas);
    fetchLista(urlVinculosPt, setVinculosPt);
  }, []);
  // Isso é um teste fim
  // console.log(vinculosPt, vinculosPf)

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
      fetchLista(urlGetPacientes, setPacientes);
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

  const handleSaveFamiliarVincular = async (pacienteId, familiaresToLink) => {
    console.log(`Salvando vínculos de familiar para paciente ${pacienteId}:`, familiaresToLink);
    const familiarIds = familiaresToLink.map(f => f.id_familiar);
    const urlVincular = 'http://localhost:8000/vincular/pacientes/vincular-familiar/';

    const dados = {
      id_paciente: pacienteId,
      id_familiar: familiarIds[0],
    }
    try {
      const response = await fetch(urlVincular, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao vincular o familiar.');
      }
      alert('Familiar(es) vinculado(s) com sucesso!');
      handleCloseVincularFamiliarModal();
      fetchLista(urlGetPacientes, setPacientes);
      fetchLista(urlVinculosPt, setVinculosPf);
    } catch (error) {
      console.error('Erro na requisição de vínculo:', error);
      alert(`Falha ao vincular: ${error.message}`);
    }
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

  const handleSaveTerapeutaVincular = async (pacienteId, terapeutasToLink) => {
    console.log(`Salvando vínculos de terapeuta para paciente ${pacienteId}:`, terapeutasToLink);
    const terapeutasIds = terapeutasToLink.map(f => f.id_terapeuta);
    const urlVincular = 'http://localhost:8000/vincular/pacientes/vincular-terapeuta/';

    const dados = {
      id_paciente: pacienteId,
      id_terapeuta: terapeutasIds[0],
    }
    try {
      const response = await fetch(urlVincular, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Erro ao vincular o terapeuta.');
      }

      alert('Terapeuta vinculado(s) com sucesso!');
      handleCloseVincularTerapeutaModal();
      fetchLista(urlGetPacientes, setPacientes);
      fetchLista(urlVinculosPt, setVinculosPt);
    } catch (error) {
      console.error('Erro na requisição de vínculo:', error);
      alert(`Falha ao vincular: ${error.message}`);
    }
  };


  return (
    <div className="gerenciar-pacientes-layout">
      <Sidebar />
      <Navbar userName="Clínica" />
      <main className="gerenciar-pacientes-main-content">
        <h1 className="gerenciar-pacientes-title">Gerenciamento de Pacientes</h1>

        <div className="acoes-gerenciamento">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              className="search-input"
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
            filteredPacientes.map((paciente) => {
              const vinculosDoPaciente = vinculosPf.filter(v => v.id_paciente === paciente.id_paciente);
              const vinculosDoPacientePt = vinculosPt.filter(v => v.id_paciente === paciente.id_paciente);
              const familiaresDoPaciente = vinculosDoPaciente
                .map(v => familiares.find(f => f.id_familiar === v.id_familiar))
                .filter(Boolean); // remove undefined caso algum id não exista
              const terapeutasDoPaciente = vinculosDoPacientePt
                .map(v => terapeutas.find(f => f.id_terapeuta === v.id_terapeuta))
                .filter(Boolean);
              return (
                <PacienteCard
                  key={paciente.id_paciente}
                  paciente={{
                    ...paciente,
                    familiaresVinculados: familiaresDoPaciente,
                    terapeutasVinculados: terapeutasDoPaciente,
                  }}
                  onVincularFamiliar={handleOpenVincularFamiliarModal}
                  onVincularTerapeuta={handleOpenVincularTerapeutaModal}
                />
              );
            })
          ) : (
            <p className="no-itens-found">Nenhum terapeuta encontrado com os critérios de busca.</p>
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