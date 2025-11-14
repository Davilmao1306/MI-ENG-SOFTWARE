import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './vincular-familiar.estilo.css';
import { FiX, FiSearch, FiUser, FiPlus } from 'react-icons/fi';



export function VincularFamiliarModal({ paciente, onClose, onSave }) {
  const mockAllFamiliares = "http://localhost:8000/cadastro/lista-familiares"; 
  const [familiares, setFamiliares] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamiliares, setSelectedFamiliares] = useState([]);
  const [familiaresAtuais, setFamiliaresAtuais] = useState([]);

  const fetchFamiliares = () => {
    fetch(mockAllFamiliares)
      .then((res) => res.json())
      .then((data) => setFamiliares(data))
      .catch((err) => console.error("Erro ao buscar familiares:", err));
  };

  useEffect(() => {
    fetchFamiliares();
  }, []);
  
  useEffect(() => {
    if (paciente && paciente.familiarVinculado) {
      setFamiliaresAtuais(paciente.familiarVinculado);
      setSelectedFamiliares(paciente.familiarVinculado.map(f => f.id_familiar));
    } else {
      setFamiliaresAtuais([]);
      setSelectedFamiliares([]);
    }
  }, [paciente]);


  const filteredSearchFamiliares = familiares.filter(
    (f) =>
    (f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const familiareaParaExibirNaListaDeSelecao = filteredSearchFamiliares.filter(
    (f) => !familiaresAtuais.some(atual => atual.id_familiar === f.id_familiar)
  );


  const handleCheckboxChange = (familiarId) => {
    setSelectedFamiliares((prevSelected) =>
      prevSelected.includes(familiarId)
        ? prevSelected.filter((id_familiar) => id_familiar !== familiarId)
        : [...prevSelected, familiarId]
    );
  };

  const handleRemoveFamiliarAtual = (familiarId) => {
    setFamiliaresAtuais((prev) => prev.filter(f => f.id_familiar !== familiarId));
    setSelectedFamiliares((prev) => prev.filter(id_familiar => id_familiar !== familiarId));
  }

  const handleSave = () => {
    const combinedFamiliaresIds = [
      ...familiaresAtuais.map(f => f.id_familiar),
      ...selectedFamiliares.filter(id_familiar => !familiaresAtuais.some(f => f.id_familiar === id_familiar))
    ];

    const finalFamiliaresToLink = familiares.filter(f => combinedFamiliaresIds.includes(f.id_familiar));

    onSave(paciente.id_paciente, finalFamiliaresToLink);
    onClose();
  };

  const handleCadastrarNovoFamiliar = () => {
    onClose();
    navigate('/clinica/cadastrar-familiar', { state: { pacienteId: paciente.id_paciente, returnTo: '/pacientes' } });
  };

  if (!paciente) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Vincular Familiar ao Paciente: {paciente.nome}</h2>
          <button className="modal-close-button" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-paciente-info">ID: {paciente.id_paciente} | Idade: {paciente.idade} anos</p>

          <div className="modal-section">
            <h3>Familiares Atualmente Vinculados</h3>
            {familiaresAtuais.length > 0 ? (
              <ul className="familiares-list current-familiares">
                {familiaresAtuais.map((f) => (
                  <li key={f.id_familiar} className="familiares-item">
                    <FiUser /> {f.nome} ({f.parentesco})
                    <button className="remove-button" onClick={() => handleRemoveFamiliarAtual(f.id_familiar)}>
                      <FiX />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-items-message">Nenhum familiar vinculado ainda.</p>
            )}
          </div>

          <div className="modal-section">
            <h3>Vincular Familiar Existente</h3>
            <div className="search-input-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar familiar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {familiareaParaExibirNaListaDeSelecao.length > 0 ? (
              <ul className="familiares-list available-familiares">
                {familiareaParaExibirNaListaDeSelecao.map((f) => (
                  <li key={f.id_familiar} className="familiares-item">
                    <FiUser /> {f.nome} ({f.parentesco})
                    <input
                      type="checkbox"
                      checked={selectedFamiliares.includes(f.id_familiar)}
                      onChange={() => handleCheckboxChange(f.id_familiar)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              searchTerm && <p className="no-items-message">Nenhum familiar encontrado.</p>
            )}
          </div>

          <div className="modal-section new-familiar-redirect-section">
            <button
              className="button-cadastrar-novo-familiar"
              onClick={handleCadastrarNovoFamiliar}
            >
              <FiPlus /> Cadastrar Novo Familiar
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