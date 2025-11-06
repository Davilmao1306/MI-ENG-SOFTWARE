import React, { useState, useEffect } from 'react';
import { BsChatText, BsUpload, BsListCheck, BsLink45Deg, BsX } from 'react-icons/bs';
import './input-diario.estilo.css';

export function InputDiario({ isOpen, onClose, onPost, isTerapeuta }) {
  const [activeTab, setActiveTab] = useState('entrada'); 
  const [textoEntrada, setTextoEntrada] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null); 
  const [uploadedFileUrl, setUploadedFileUrl] = useState(''); 
  const [linkAnexoUrl, setLinkAnexoUrl] = useState(''); 
  const [linkAnexoName, setLinkAnexoName] = useState(''); 
  const [checklistTitle, setChecklistTitle] = useState('');
  const [checklistItems, setChecklistItems] = useState([{ id: 1, text: '' }]);


  useEffect(() => {
    if (uploadedFile) {
      const objectUrl = URL.createObjectURL(uploadedFile);
      setUploadedFileUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl); 
    } else {
      setUploadedFileUrl(''); 
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (!isOpen) {
      setTextoEntrada('');
      setUploadedFile(null);
      setUploadedFileUrl('');
      setLinkAnexoUrl('');
      setLinkAnexoName('');
      setChecklistTitle('');
      setChecklistItems([{ id: 1, text: '' }]);
      setActiveTab('entrada');
    }
  }, [isOpen]);

  const handlePost = () => {
    let entryData = {};
    let isValid = false;

    if (activeTab === 'entrada') {
      const attachments = [];

      if (uploadedFileUrl && uploadedFile) { 
        attachments.push({
          type: 'file',
          url: uploadedFileUrl,
          name: uploadedFile.name
        });
      }

      if (linkAnexoUrl.trim()) {
        attachments.push({
          type: 'link',
          url: linkAnexoUrl.trim(),
          name: linkAnexoName.trim() || linkAnexoUrl.trim() 
        });
      }

      if (textoEntrada.trim() || attachments.length > 0) {
        entryData = {
          type: 'entrada',
          texto: textoEntrada.trim(),
          attachments: attachments, 
          autor: 'Nome do Usuário Logado' 
        };
        isValid = true;
      }
    } else if (activeTab === 'checklist' && checklistTitle.trim() && checklistItems.some(item => item.text.trim())) {
      entryData = {
        type: 'checklist',
        titulo: checklistTitle.trim(),
        itens: checklistItems.filter(item => item.text.trim()).map(item => ({ text: item.text.trim(), checked: false })),
        autor: 'Nome do Usuário Logado', 
      };
      isValid = true;
    }

    if (isValid) {
      onPost(entryData);
    } else {
      alert('Por favor, preencha o texto ou adicione um anexo para a entrada, ou o título/itens para o checklist.');
    }
  };

  const handleAddChecklistItem = () => {
    setChecklistItems(prev => [...prev, { id: prev.length + 1, text: '' }]);
  };

  const handleChecklistItemChange = (id, newText) => {
    setChecklistItems(prev =>
      prev.map(item => (item.id === id ? { ...item, text: newText } : item))
    );
  };

  const handleRemoveChecklistItem = (idToRemove) => {
    setChecklistItems(prev => prev.filter(item => item.id !== idToRemove));
  };

 
  const handleRemoveFileAttachment = () => {
    setUploadedFile(null);
 
  };

  const handleRemoveLinkAttachment = () => {
    setLinkAnexoUrl('');
    setLinkAnexoName('');
  };


  if (!isOpen) return null;

  return (
    <div className={`input-diario-compositor ${isOpen ? 'open' : ''}`}>
      <div className="compositor-header">
        <h3>Criar Nova Entrada</h3>
        <button className="compositor-close-btn" onClick={onClose}><BsX /></button>
      </div>

      <nav className="compositor-tabs">
        <button
          className={`compositor-tab-btn ${activeTab === 'entrada' ? 'active' : ''}`}
          onClick={() => setActiveTab('entrada')}
        >
          <BsChatText /> Entrada
        </button>
        {isTerapeuta && ( 
          <button
            className={`compositor-tab-btn ${activeTab === 'checklist' ? 'active' : ''}`}
            onClick={() => setActiveTab('checklist')}
          >
            <BsListCheck /> Checklist
          </button>
        )}
      </nav>

      <div className="compositor-content">
        {activeTab === 'entrada' && (
          <div className="compositor-entrada-combined">
            <textarea
              className="compositor-textarea"
              placeholder="Escreva sua observação aqui..."
              rows={5}
              value={textoEntrada}
              onChange={(e) => setTextoEntrada(e.target.value)}
            />

        
            <div className="compositor-anexo-inline">
                <label htmlFor="file-upload" className="btn-anexo-upload">
                  <BsUpload /> Enviar Foto/Arquivo
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(e) => setUploadedFile(e.target.files[0])}
                    onClick={(e) => e.target.value = null} 
                  />
                </label>
                {uploadedFile && ( 
                  <span className="anexo-preview-item">
                      {uploadedFile.name}
                      <button type="button" onClick={handleRemoveFileAttachment}><BsX /></button>
                  </span>
                )}

                <div className="anexo-url-group">
                    <BsLink45Deg />
                    <input
                        type="url"
                        className="compositor-input"
                        placeholder="Adicione um link (ex: https://exemplo.com)"
                        value={linkAnexoUrl}
                        onChange={(e) => setLinkAnexoUrl(e.target.value)}
                    />
                   
                    {linkAnexoUrl && (
                      <button type="button" onClick={handleRemoveLinkAttachment} className="btn-remove-link"><BsX /></button>
                    )}
                </div>
            </div>
          </div>
        )}

        {activeTab === 'checklist' && isTerapeuta && (
          <div className="compositor-checklist">
            <input
              type="text"
              className="compositor-input"
              placeholder="Título do Checklist"
              value={checklistTitle}
              onChange={(e) => setChecklistTitle(e.target.value)}
            />
            {checklistItems.map(item => (
              <div key={item.id} className="checklist-item-row">
                <input
                  type="text"
                  className="compositor-input"
                  placeholder={`Item ${item.id}`}
                  value={item.text}
                  onChange={(e) => handleChecklistItemChange(item.id, e.target.value)}
                />
                {checklistItems.length > 1 && (
                  <button type="button" className="btn-remove-item" onClick={() => handleRemoveChecklistItem(item.id)}>
                    <BsX />
                  </button>
                )}
              </div>
            ))}
            <button type="button" className="btn-add-item" onClick={handleAddChecklistItem}>
              + Adicionar Item
            </button>
          </div>
        )}
      </div>

      <div className="compositor-footer">
        <button className="compositor-post-btn" onClick={handlePost}>
          Postar {activeTab === 'entrada' ? 'Entrada' : 'Checklist'}
        </button>
      </div>
    </div>
  );
}