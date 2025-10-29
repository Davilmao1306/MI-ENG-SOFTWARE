import React, { useState, useEffect, useRef } from 'react';
import { BsSearch, BsXCircle, BsListUl } from 'react-icons/bs';
import './campo-busca.estilo.css';

const todosOsPacientes = [
  { id: 'p01', nome: 'Matheus Silva' },
  { id: 'p02', nome: 'Ana Costa' },
  { id: 'p03', nome: 'João Pereira' },
  { id: 'p04', nome: 'Maria Almeida' },
  { id: 'p05', nome: 'Pedro Gonçalves' },
  { id: 'p06', nome: 'Carla Santos' },
  { id: 'p07', nome: 'Rafaela Oliveira' },
  { id: 'p08', nome: 'Lucas Ribeiro' },
];

export function CampoBuscaPaciente({ label, onSelectPaciente }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    // Se há um termo de busca, filtra.
    if (searchTerm.length > 0) {
      const results = todosOsPacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPatients(results);
      setShowResults(true);
    } else {
      // Se o campo de busca está vazio:
      // Só limpamos os resultados filtrados, mas mantemos showResults se a lista foi explicitamente aberta
      if (filteredPatients.length > 0 && filteredPatients !== todosOsPacientes) {
          setFilteredPatients([]);
      }
      // Se showResults for false (significa que o campo está vazio e a lista não foi aberta), então esconde.
      // Mas se showResults for true (porque a lista foi aberta pelo ícone), deve continuar mostrando todosOsPacientes.
    }
  }, [searchTerm]); // showResults removido das dependências para evitar loop

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false); // Fecha a lista ao clicar fora
        if (searchTerm === '' && selectedPatient === null) {
            setFilteredPatients([]); // Também limpa a lista de todos se não houver seleção/busca
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, searchTerm, selectedPatient]);


  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedPatient(null);
    onSelectPaciente(null);

    if (value.length > 0) {
        setShowResults(true); // Se começar a digitar, mostra resultados da busca
    } else {
        // Se o campo ficou vazio, e a lista não estava explicitamente aberta para 'todosOsPacientes'
        // ela deve fechar. Se estava aberta para todos, deve continuar mostrando todos.
        if (filteredPatients !== todosOsPacientes) {
            setShowResults(false);
        }
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setFilteredPatients([]);
    setSelectedPatient(null);
    onSelectPaciente(null);
    setShowResults(false);
  };

  const handleSelectPatient = (paciente) => {
    setSelectedPatient(paciente);
    setSearchTerm(paciente.nome);
    setFilteredPatients([]); // Limpa a lista filtrada
    setShowResults(false);
    onSelectPaciente(paciente);
  };

  // Função para alternar a exibição da lista de TODOS os pacientes
  const handleToggleAllPatientsList = () => {
      if (showResults && filteredPatients === todosOsPacientes) {
          // Se a lista de TODOS já está aberta, fecha
          setShowResults(false);
          setFilteredPatients([]);
      } else {
          // Se a lista de TODOS não está aberta, abre
          setFilteredPatients(todosOsPacientes);
          setSearchTerm(''); // Garante que o campo de busca está vazio ao mostrar todos
          setShowResults(true);
      }
  };

  return (
    <div className="campo-busca-paciente-wrapper" ref={wrapperRef}>
      <label className="campo-label">{label}</label>
      <div className="input-container-busca">
        <BsSearch className="search-icon" />
        <input
          type="text"
          className="paciente-input"
          placeholder="Paciente"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => {
            // Ao focar no input, se não houver termo de busca e a lista não estiver aberta,
            // abre a lista de todos os pacientes.
            if (searchTerm.length === 0 && !showResults) {
              handleToggleAllPatientsList();
            } else if (searchTerm.length > 0 && !showResults) {
              setShowResults(true); // Se já tiver texto, mostra resultados da busca
            }
          }}
        />
        {searchTerm ? (
          <BsXCircle className="clear-icon" onClick={handleClearSearch} />
        ) : (
          <BsListUl className="list-icon" onClick={handleToggleAllPatientsList} /> 
        )}
      </div>

      {showResults && filteredPatients.length > 0 && (
        <ul className="paciente-results-list">
          {filteredPatients.map(paciente => (
            <li
              key={paciente.id}
              className="paciente-list-item"
              onClick={() => handleSelectPatient(paciente)}
            >
              {paciente.nome}
            </li>
          ))}
        </ul>
      )}

      {showResults && searchTerm.length > 0 && filteredPatients.length === 0 && (
        <div className="no-results">Nenhum paciente encontrado.</div>
      )}
    </div>
  );
}