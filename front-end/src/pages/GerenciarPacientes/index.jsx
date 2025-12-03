import { useState } from 'react';
import { PacienteCard } from '../../componentes/PacienteCard';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { VincularFamiliarModal } from '../../componentes/VincularFamiliarModal';
import { VincularTerapeutaModal } from '../../componentes/VincularTerapeutaModal';
import './gerenciar-pacientes.estilo.css';
import { useExibirListas } from '../../hooks/useExibirListas';

function fetchLista(url, set) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => set(data))
    .catch((err) => console.error("Erro ao buscar pacientes:", err));
}
export function GerenciarPacientes() {
  const urlGetPacientes = "http://localhost:8000/cadastro/lista-pacientes";
  const urlVinculosPf = "http://localhost:8000/cadastro/lista-vinculos-pf";
  const urlVinculosPt = "http://localhost:8000/cadastro/lista-vinculos-pt";
  const [pacientes, setPacientes] = useState([]);
  const [vinculosPf, setVinculosPf] = useState([]);
  const [vinculosPt, setVinculosPt] = useState([]);
  const [familiares, setFamiliares] = useState([]);
  const [terapeutas, setTerapeutas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setPacientes)
  useExibirListas("http://localhost:8000/cadastro/lista-familiares", setFamiliares)
  useExibirListas("http://localhost:8000/cadastro/lista-terapeutas", setTerapeutas)
  useExibirListas("http://localhost:8000/cadastro/lista-vinculos-pf", setVinculosPf)
  useExibirListas("http://localhost:8000/cadastro/lista-vinculos-pt", setVinculosPt)
  




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
      `Deseja realmente remover o paciente ${paciente.nome}?\nIsso apagará o diário, planos e todos os vínculos dele.`
    );

    if (confirmAction) {

      fetch(`http://localhost:8000/cadastro/paciente/excluir/${paciente.id_paciente}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(async (res) => {
        if (res.ok) {
          alert('Paciente removido com sucesso!');

          fetchLista(urlGetPacientes, setPacientes); 
          fetchLista(urlVinculosPf, setVinculosPf);
          fetchLista(urlVinculosPt, setVinculosPt);
        } else {
          const errorData = await res.json();
          alert(`Erro ao remover: ${errorData.detail}`);
        }
      })
      .catch((error) => {
        console.error('Erro na requisição:', error);
        alert('Erro de conexão ao tentar remover.');
      });
    }
  };


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
      fetchLista("http://localhost:8000/cadastro/lista-pacientes", setPacientes);
      fetchLista("http://localhost:8000/cadastro/lista-vinculos-pf", setVinculosPf);
    } catch (error) {
      console.error('Erro na requisição de vínculo:', error);
      alert(`Falha ao vincular: ${error.message}`);
    }
  };

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
      fetchLista("http://localhost:8000/cadastro/lista-pacientes", setPacientes);
      fetchLista("http://localhost:8000/cadastro/lista-vinculos-pt", setVinculosPt);
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
                .filter(Boolean); 
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
                  onRemoverOuInativar={handleRemoverOuInativarPaciente}
                />
              );
            })
          ) : (
            <p className="no-itens-found">Nenhum terapeuta encontrado com os critérios de busca.</p>
          )}

        </div>

      
        {showVincularFamiliarModal && selectedPacienteForVincularFamiliar && (
          <VincularFamiliarModal
            paciente={selectedPacienteForVincularFamiliar}
            onClose={handleCloseVincularFamiliarModal}
            onSave={handleSaveFamiliarVincular}
          />
        )}

       
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