import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './vincular-terapeuta.estilo.css';
import { FiX, FiSearch, FiUser, FiBriefcase, FiPlus } from 'react-icons/fi';
import { useExibirListas } from '../../hooks/useExibirListas';





export function VincularTerapeutaModal({ paciente, onClose, onSave }) {

  const [terapeutas, setTerapeutas] = useState([]);
  useExibirListas("http://localhost:8000/cadastro/lista-terapeutas", setTerapeutas)
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerapeutas, setSelectedTerapeutas] = useState([]);
  const [terapeutasAtuais, setTerapeutasAtuais] = useState([]);

  useEffect(() => {
    if (paciente && paciente.terapeutasVinculados) {
      const linkedTerapeutaIds = paciente.terapeutasVinculados.map(t => t.id_terapeuta || t);
      const alreadyLinked = terapeutas.filter(t => linkedTerapeutaIds.includes(t.id_terapeuta));
      setTerapeutasAtuais(alreadyLinked);
      setSelectedTerapeutas(alreadyLinked.map(t => t.id_terapeuta));
    } else {
      setTerapeutasAtuais([]);
      setSelectedTerapeutas([]);
    }
  }, [paciente]);



  const filteredSearchTerapeutas = terapeutas.filter(
    (t) =>
    (t.nome.toLowerCase().includes(searchTerm.toLowerCase()) )
    // ||      t.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  const terapeutasParaExibirNaListaDeSelecao = filteredSearchTerapeutas.filter(
    (t) => !terapeutasAtuais.some(atual => atual.id_terapeuta === t.id_terapeuta)
  );

  const handleCheckboxChange = (terapeutaId) => {
    setSelectedTerapeutas((prevSelected) =>
      prevSelected.includes(terapeutaId)
        ? prevSelected.filter((id_terapeuta) => id_terapeuta !== terapeutaId)
        : [...prevSelected, terapeutaId]
    );
  };

  const handleRemoveTerapeutaAtual = (terapeutaId) => {
    setTerapeutasAtuais((prev) => prev.filter(t => t.id_terapeuta !== terapeutaId));
    setSelectedTerapeutas((prev) => prev.filter(id => id_terapeuta !== terapeutaId));
  }

  const handleSave = () => {
    const finalTerapeutasToLink = selectedTerapeutas
      .map(id_terapeuta => terapeutas.find(t => t.id_terapeuta === id_terapeuta))
      .filter(Boolean);

    onSave(paciente.id_paciente, finalTerapeutasToLink);
    onClose();
  };

  const handleCadastrarNovoTerapeuta = () => {
    onClose();
    navigate('/clinica/cadastrar-terapeuta', { state: { pacienteId: paciente.id_paciente, returnTo: '/pacientes' } });
  };

  if (!paciente) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Vincular Terapeuta ao Paciente: {paciente.nome}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-paciente-info">ID: {paciente.id_paciente} | Idade: {paciente.idade} anos</p>

          <div className="modal-section">
            <h3><FiBriefcase /> Terapeutas Atualmente Vinculados</h3>
            {terapeutasAtuais.length > 0 ? (
              <ul className="terapeutas-list current-terapeutas">
                {terapeutasAtuais.map((t) => (
                  <li key={t.id_terapeuta} className="terapeutas-item">
                    <FiUser /> {t.nome} ({t.especialidade})
                    <button className="remove-button" onClick={() => handleRemoveTerapeutaAtual(t.id_terapeuta)}>
                      <FiX />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-items-message">Nenhum terapeuta vinculado ainda.</p>
            )}
          </div>

          <div className="modal-section">
            <h3>Vincular Terapeuta Existente</h3>
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar terapeuta por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {terapeutasParaExibirNaListaDeSelecao.length > 0 ? (
              <ul className="terapeutas-list available-terapeutas">
                {terapeutasParaExibirNaListaDeSelecao.map((t) => (
                  <li key={t.id_terapeuta} className="terapeutas-item">
                    <FiUser /> {t.nome} ({t.especialidade})
                    <input
                      type="checkbox"
                      checked={selectedTerapeutas.includes(t.id_terapeuta)}
                      onChange={() => handleCheckboxChange(t.id_terapeuta)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              searchTerm && <p className="no-items-message">Nenhum terapeuta encontrado.</p>
            )}
          </div>

          <div className="modal-section new-terapeuta-redirect-section">
            <button
              className="button-cadastrar-novo-terapeuta"
              onClick={handleCadastrarNovoTerapeuta}
            >
              <FiPlus /> Cadastrar Novo Terapeuta
            </button>
          </div>
        </div>

        <div className="modal-footer">
          <button className="save-button" onClick={handleSave}>
            Salvar Vínculos
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}