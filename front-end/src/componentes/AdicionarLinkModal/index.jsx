import React, { useState } from 'react';
import { Modal } from '../Modal'; 

export function AdicionarLinkModal({ isOpen, onClose, onAddLink }) {
  const [link, setLink] = useState('');

  const handleAdd = () => {
    if (link.trim()) {
      onAddLink(link);
      setLink(''); 
      onClose();   
    } else {
      alert("Por favor, insira um link válido.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adicionar link">
      <div className="modal-body-content">
        <label htmlFor="linkInput">Link</label>
        <input
          id="linkInput"
          type="url" // Tipo url para validação básica
          placeholder="https://exemplo.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="modal-input"
        />
        <div className="modal-actions">
          <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button type="button" className="btn-confirmar" onClick={handleAdd}>Adicionar link</button>
        </div>
      </div>
    </Modal>
  );
}