import React, { useState } from 'react';
import { Modal } from '../Modal'; // Importa o Modal genérico

export function AdicionarLinkModal({ isOpen, onClose, onAddLink }) {
  const [link, setLink] = useState('');

  const handleAddLink = () => {
    if (link.trim()) { // Apenas adiciona se o link não estiver vazio
      onAddLink(link);
      setLink(''); // Limpa o input
      onClose(); // Fecha o modal
    }
  };

  const handleCancel = () => {
    setLink(''); // Limpa o input
    onClose(); // Fecha o modal
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Adicionar link">
      <input
        type="text"
        className="modal-link-input" // Usaremos um estilo para isso no modal.estilo.css
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        onKeyPress={(e) => { // MUDANÇA: Permite adicionar link com Enter
          if (e.key === 'Enter') {
            handleAddLink();
          }
        }}
      />
      <div className="modal-button-group">
        <button type="button" className="modal-button cancel" onClick={handleCancel}>
          Cancelar
        </button>
        <button type="button" className="modal-button primary" onClick={handleAddLink}>
          Adicionar link
        </button>
      </div>
    </Modal>
  );
}