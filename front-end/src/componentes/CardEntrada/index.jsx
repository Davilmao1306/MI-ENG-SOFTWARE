// src/componentes/CardEntrada/index.jsx
import React, { useEffect } from 'react';
import { BsLink45Deg, BsFileEarmark } from 'react-icons/bs';
import './card-entrada.estilo.css'; // CERTIFIQUE-SE QUE O NOME DO ARQUIVO CSS ESTÁ CORRETO NO DISCO!

export function CardEntrada({ autor, data, texto, attachments = [] }) {
  const horaFormatada = new Date(data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const hasAnexo = attachments && attachments.length > 0;

  useEffect(() => {
    return () => {
      if (attachments) {
        attachments.forEach(att => {
          if (att.url && att.url.startsWith('blob:')) {
            URL.revokeObjectURL(att.url);
          }
        });
      }
    };
  }, [attachments]);

 const renderAttachments = () => {
    if (!hasAnexo) return null;

    return (
      <div className="card-anexo-wrapper">
        {attachments.map((anexo, index) => {
          // 1. Verificar se é uma imagem pelo anexo.url
          const isImageUrl = anexo.type === 'file' && /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(anexo.url);
          // 2. Verificar se é um link
          const isLink = anexo.type === 'link';
          // 3. Verificar se é um arquivo genérico (não é imagem e não é link)
          const isGenericFile = anexo.type === 'file' && !isImageUrl;

          if (isImageUrl) {
            return (
              <a key={index} href={anexo.url} target="_blank" rel="noopener noreferrer" className="combinada-anexo-visualizavel">
                <img src={anexo.url} alt={`Anexo ${index + 1}`} className="combinada-thumbnail" />
              </a>
            );
          } else if (isLink) {
            return (
              <div key={index} className="combinada-anexo-link">
                <BsLink45Deg />
                <a href={anexo.url} target="_blank" rel="noopener noreferrer">{anexo.name || anexo.url}</a>
              </div>
            );
          } else if (isGenericFile) { // Se for um arquivo, mas não uma imagem, trata como arquivo genérico
            return (
              <div key={index} className="combinada-anexo-file">
                <BsFileEarmark />
                <a href={anexo.url} target="_blank" rel="noopener noreferrer">{anexo.name || 'Arquivo'}</a>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className={`card-entrada-combinada ${hasAnexo ? 'has-anexo' : ''}`}>
      <div className="card-header-combinada">
        <span className="card-autor-combinada">{autor}</span>
        <span className="card-data-combinada">({horaFormatada})</span>
      </div>
      {texto && texto.trim() !== '' && <p className="card-texto-combinada">{texto}</p>}
      
      {/* Renderiza os anexos AQUI! */}
      {renderAttachments()}
    </div>
  );
}