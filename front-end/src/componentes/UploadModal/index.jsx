import React, { useState, useRef } from 'react';
import { PiFolderOpenBold } from 'react-icons/pi'; // Ícone de pasta para upload
import { Modal } from '../Modal';

export function UploadModal({ isOpen, onClose, onUploadFile }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault(); // Necessário para permitir o drop
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onUploadFile(files[0]); // Apenas o primeiro arquivo para simplificar
      onClose();
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      onUploadFile(files[0]);
      onClose();
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click(); // Abre o seletor de arquivos
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fazer Upload">
      <div
        className={`upload-drop-area ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick} // Clica na área para abrir o seletor
      >
        <PiFolderOpenBold className="upload-icon" />
        <button type="button" className="upload-browse-button">Procurar</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }} // Esconde o input de arquivo padrão
          onChange={handleFileChange}
        />
        ou arraste o arquivo até aqui
      </div>
    </Modal>
  );
}