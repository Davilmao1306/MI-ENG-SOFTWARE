// src/componentes/CardChecklist/index.jsx
import React, { useState } from 'react';
import './card-checklist.estilo.css';

export function CardChecklist({ autor, data, titulo, itens, onSaveResponse, isTerapeutaView = false }) {
  const horaFormatada = new Date(data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
  // Estado para gerenciar as respostas do checklist (se não for visualização do terapeuta)
  const [respostas, setRespostas] = useState(() =>
    itens.map(item => ({ ...item, checked: item.checked || false })) // Usa o estado inicial se já tiver
  );

  const handleCheckboxChange = (index) => {
    if (isTerapeutaView) return; // Terapeuta não interage diretamente aqui

    setRespostas(prevRespostas =>
      prevRespostas.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSaveResponse = () => {
    if (onSaveResponse) {
      onSaveResponse(respostas); // Envia as respostas para a função pai
      alert('Respostas salvas!'); // Feedback simples
      // Em um app real, aqui você faria uma chamada API para salvar as respostas
    }
  };

  return (
    <div className="card-checklist">
      <div className="card-header-checklist">
        <span className="card-autor-checklist">{autor}</span>
        <span className="card-data-checklist">({horaFormatada})</span>
      </div>
      <h4 className="card-titulo-checklist">{titulo}</h4>
      <div className="checklist-itens">
        {respostas.map((item, index) => (
          <label key={index} className="checklist-item">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(index)}
              disabled={isTerapeutaView} // Desabilita se for visão do terapeuta
            />
            <span className="checklist-item-text">{item.text}</span>
          </label>
        ))}
      </div>
      {!isTerapeutaView && ( // Botão de salvar apenas para quem pode responder
        <button className="btn-salvar-respostas" onClick={handleSaveResponse}>
          Salvar Resposta
        </button>
      )}
      {/* Se for visão do terapeuta, pode adicionar uma seção para respostas dos familiares */}
      {isTerapeutaView && (
        <div className="checklist-tera-summary">
            <p>Status: {respostas.filter(i => i.checked).length} de {respostas.length} itens completos.</p>
            {/* Aqui poderia haver um link para ver as respostas detalhadas do familiar */}
        </div>
      )}
    </div>
  );
}