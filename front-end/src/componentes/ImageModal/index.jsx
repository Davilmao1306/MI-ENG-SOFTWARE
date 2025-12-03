import React from 'react';
import { FiX, FiDownload } from 'react-icons/fi';
import './image-modal.estilo.css';

export function ImageModal({ isOpen, imageUrl, imageName, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Botão Fechar */}
        <button className="image-modal-close" onClick={onClose}>
          <FiX size={24} />
        </button>

        {/* A Imagem Grande */}
        <img src={imageUrl} alt={imageName} className="image-modal-img" />

        {/* Barra de Ações (Download) */}
        <div className="image-modal-actions">
          <span className="image-name">{imageName}</span>
          <a 
            href={imageUrl} 
            download={imageName || 'imagem_download.png'} 
            className="image-modal-download-btn"
          >
            <FiDownload /> Baixar Imagem
          </a>
        </div>

      </div>
    </div>
  );
}