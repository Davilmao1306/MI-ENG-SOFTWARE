import { useState, useRef } from 'react';
import { PiFolderOpenBold } from 'react-icons/pi';
import { Modal } from '../Modal';

export function UploadModal({ isOpen, onClose, onUploadFile }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Tamanho máximo permitido (ex: 5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  // Tipos permitidos
  const allowedTypes = [
    "application/pdf",
    "image/png",
    "image/jpeg"
  ];

  const validateFile = (file) => {
    // Verifica tipo (se está na lista)
    if (!allowedTypes.includes(file.type)) {
      alert("Envie apenas PDF, PNG ou JPEG.");
      return false;
    }

    // Verifica tamanho
    if (file.size > MAX_FILE_SIZE) {
      alert("O arquivo é maior que 5MB.");
      return false;
    }

    return true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (!validateFile(file)) return;

    onUploadFile(file);
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!validateFile(file)) {
      e.target.value = "";
      return;
    }

    onUploadFile(file);
    onClose();
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fazer Upload">
      <div
        className={`upload-drop-area ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <PiFolderOpenBold className="upload-icon" />
        <button type="button" className="upload-browse-button">Procurar</button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".jpeg,.png,.pdf,application/pdf"
          onChange={handleFileChange}
        />

        ou arraste o arquivo até aqui
      </div>
    </Modal>
  );
}