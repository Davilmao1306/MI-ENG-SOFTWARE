import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './vincular-terapeuta.estilo.css';
import { FiX, FiSearch, FiUser, FiBriefcase, FiPlus } from 'react-icons/fi'; 


const mockAllTerapeutas = [
  { id: 't001', nome: 'Dr. Lucas Ribeiro', especialidade: 'Psicólogo', email: 'lucas@terapeuta.com' },
  { id: 't002', nome: 'Dra. Sofia Mendes', especialidade: 'Neuropsicóloga', email: 'sofia@terapeuta.com' },
  { id: 't003', nome: 'Dr. Carlos Lima', especialidade: 'Psiquiatra', email: 'carlos@terapeuta.com' },
  { id: 't004', nome: 'Dra. Patrícia Gomes', especialidade: 'Fisioterapeuta', email: 'patricia@terapeuta.com' },
];

export function VincularTerapeutaModal({ paciente, onClose, onSave }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTerapeutas, setSelectedTerapeutas] = useState([]); 
  const [terapeutasAtuais, setTerapeutasAtuais] = useState([]); 

  useEffect(() => {
    if (paciente && paciente.terapeutasVinculados) { 
        const linkedTerapeutaIds = paciente.terapeutasVinculados.map(t => t.id || t); 
        const alreadyLinked = mockAllTerapeutas.filter(t => linkedTerapeutaIds.includes(t.id));
        setTerapeutasAtuais(alreadyLinked);
        setSelectedTerapeutas(alreadyLinked.map(t => t.id)); 
    } else {
        setTerapeutasAtuais([]);
        setSelectedTerapeutas([]);
    }
  }, [paciente]);


 
  const filteredSearchTerapeutas = mockAllTerapeutas.filter(
    (t) =>
      (t.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
       t.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  const terapeutasParaExibirNaListaDeSelecao = filteredSearchTerapeutas.filter(
      (t) => !terapeutasAtuais.some(atual => atual.id === t.id)
  );

  const handleCheckboxChange = (terapeutaId) => {
    setSelectedTerapeutas((prevSelected) =>
      prevSelected.includes(terapeutaId)
        ? prevSelected.filter((id) => id !== terapeutaId)
        : [...prevSelected, terapeutaId]
    );
  };

  const handleRemoveTerapeutaAtual = (terapeutaId) => {
    setTerapeutasAtuais((prev) => prev.filter(t => t.id !== terapeutaId));
    setSelectedTerapeutas((prev) => prev.filter(id => id !== terapeutaId));
  }

  const handleSave = () => {
    const finalTerapeutasToLink = selectedTerapeutas
        .map(id => mockAllTerapeutas.find(t => t.id === id))
        .filter(Boolean);

    onSave(paciente.id, finalTerapeutasToLink); 
    onClose(); 
  };

  const handleCadastrarNovoTerapeuta = () => {
      onClose();
      navigate('/clinica/cadastrar-terapeuta', { state: { pacienteId: paciente.id, returnTo: '/pacientes' } });
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
            <p className="modal-paciente-info">ID: {paciente.num} | Idade: {paciente.idade} anos</p>

            <div className="modal-section">
                <h3><FiBriefcase /> Terapeutas Atualmente Vinculados</h3>
                {terapeutasAtuais.length > 0 ? (
                    <ul className="terapeutas-list current-terapeutas">
                        {terapeutasAtuais.map((t) => (
                            <li key={t.id} className="terapeutas-item">
                                <FiUser /> {t.nome} ({t.especialidade})
                                <button className="remove-button" onClick={() => handleRemoveTerapeutaAtual(t.id)}>
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
                            <li key={t.id} className="terapeutas-item">
                                <FiUser /> {t.nome} ({t.especialidade})
                                <input
                                    type="checkbox"
                                    checked={selectedTerapeutas.includes(t.id)}
                                    onChange={() => handleCheckboxChange(t.id)}
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