import  { useState } from 'react';
import './card-checklist.estilo.css';

export function CardChecklist({ autor, data, titulo, itens, onSaveResponse, isTerapeutaView  }) {
  const horaFormatada = new Date(data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  

  const [respostas, setRespostas] = useState(() =>
    itens.map(item => ({ ...item, checked: item.checked || false })) 
  );

  const handleCheckboxChange = (index) => {
    if (isTerapeutaView) return; 

    setRespostas(prevRespostas =>
      prevRespostas.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleSaveResponse = () => {
    if (onSaveResponse) {
      onSaveResponse(respostas); 
      alert('Respostas salvas!'); 
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
              disabled={isTerapeutaView} 
            />
            <span className="checklist-item-text">{item.text}</span>
          </label>
        ))}
      </div>
      {!isTerapeutaView && ( 
        <button className="btn-salvar-respostas" onClick={handleSaveResponse}>
          Salvar Resposta
        </button>
      )}
  
      {isTerapeutaView && (
        <div className="checklist-tera-summary">
            <p>Status: {respostas.filter(i => i.checked).length} de {respostas.length} itens completos.</p>
        
        </div>
      )}
    </div>
  );
}