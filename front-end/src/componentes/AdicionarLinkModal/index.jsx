import React, { useState } from 'react';
import { Modal } from '../Modal'; // Importa o Modal genérico

export function AdicionarLinkModal({ isOpen, onClose, onAddLink }) {
  const [link, setLink] = useState('');

  const handleAddLink = () => {
    if (link.trim()) { 
      onAddLink(link);
      setLink(''); 
      onClose(); 
    }
  };

  const handleCancel = () => {
    setLink(''); 
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} title="Adicionar link">
      <input
        type="text"
        className="modal-link-input" 
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        onKeyPress={(e) => {
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