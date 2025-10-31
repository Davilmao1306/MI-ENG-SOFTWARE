import React, { useState, useCallback } from 'react';
import { Modal } from '../Modal';
import { useDropzone } from 'react-dropzone'; // Importa o hook do react-dropzone

export function UploadModal({ isOpen, onClose, onUploadFile }) {
  const [fileToUpload, setFileToUpload] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFileToUpload(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Permite apenas um arquivo por vez
   
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const handleUpload = () => {
    if (fileToUpload) {
      onUploadFile(fileToUpload); 
      setFileToUpload(null);     
      onClose();                 
    } else {
      alert("Por favor, selecione um arquivo para upload.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fazer Upload">
      <div className="modal-body-content">
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          {fileToUpload ? (
            <p>Arquivo selecionado: <strong>{fileToUpload.name}</strong></p>
          ) : (
            isDragActive ?
              <p>Solte o arquivo aqui...</p> :
              <p>Clique para procurar ou arraste o arquivo até aqui</p>
          )}
        </div>
        <div className="modal-actions">
          <button type="button" className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button type="button" className="btn-confirmar" onClick={handleUpload} disabled={!fileToUpload}>Fazer Upload</button>
        </div>
      </div>
    </Modal>
  );
}