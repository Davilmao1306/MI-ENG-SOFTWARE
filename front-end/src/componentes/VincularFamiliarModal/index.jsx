import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './vincular-familiar.estilo.css';
import { FiX, FiSearch, FiUser, FiPlus } from 'react-icons/fi';

const mockAllFamiliares = [
  { id: 'f001', nome: 'João Silva', parentesco: 'Pai', email: 'joao@email.com' },
  { id: 'f002', nome: 'Maria Souza', parentesco: 'Mãe', email: 'maria@email.com' },
  { id: 'f003', nome: 'Pedro Santos', parentesco: 'Irmão', email: 'pedro@email.com' },
  { id: 'f004', nome: 'Ana Costa', parentesco: 'Tia', email: 'ana@email.com' },
];

export function VincularFamiliarModal({ paciente, onClose, onSave }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamiliares, setSelectedFamiliares] = useState([]);
  const [familiaresAtuais, setFamiliaresAtuais] = useState([]);

  useEffect(() => {
    if (paciente && paciente.familiarVinculado) {
      setFamiliaresAtuais(paciente.familiarVinculado); 
      setSelectedFamiliares(paciente.familiarVinculado.map(f => f.id));
    } else {
      setFamiliaresAtuais([]);
      setSelectedFamiliares([]);
    }
  }, [paciente]);


  const filteredSearchFamiliares = mockAllFamiliares.filter(
    (f) =>
      (f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
       f.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const familiareaParaExibirNaListaDeSelecao = filteredSearchFamiliares.filter(
      (f) => !familiaresAtuais.some(atual => atual.id === f.id)
  );


  const handleCheckboxChange = (familiarId) => {
    setSelectedFamiliares((prevSelected) =>
      prevSelected.includes(familiarId)
        ? prevSelected.filter((id) => id !== familiarId)
        : [...prevSelected, familiarId]
    );
  };

  const handleRemoveFamiliarAtual = (familiarId) => {
    setFamiliaresAtuais((prev) => prev.filter(f => f.id !== familiarId));
    setSelectedFamiliares((prev) => prev.filter(id => id !== familiarId));
  }

  const handleSave = () => {
    const combinedFamiliaresIds = [
      ...familiaresAtuais.map(f => f.id), 
      ...selectedFamiliares.filter(id => !familiaresAtuais.some(f => f.id === id)) 
    ];

    const finalFamiliaresToLink = mockAllFamiliares.filter(f => combinedFamiliaresIds.includes(f.id));

    onSave(paciente.id, finalFamiliaresToLink);
    onClose();
  };

  const handleCadastrarNovoFamiliar = () => {
      onClose();
      navigate('/clinica/cadastrar-familiar', { state: { pacienteId: paciente.id, returnTo: '/pacientes' } });
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
            <p className="modal-paciente-info">ID: {paciente.num} | Idade: {paciente.idade} anos</p>

            <div className="modal-section">
                <h3>Familiares Atualmente Vinculados</h3>
                {familiaresAtuais.length > 0 ? (
                    <ul className="familiares-list current-familiares">
                        {familiaresAtuais.map((f) => (
                            <li key={f.id} className="familiares-item">
                                <FiUser /> {f.nome} ({f.parentesco})
                                <button className="remove-button" onClick={() => handleRemoveFamiliarAtual(f.id)}>
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
                            <li key={f.id} className="familiares-item">
                                <FiUser /> {f.nome} ({f.parentesco})
                                <input
                                    type="checkbox"
                                    checked={selectedFamiliares.includes(f.id)} 
                                    onChange={() => handleCheckboxChange(f.id)}
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