import './campo-detalhes.estilo.css';

export function CampoDetalhes({ titulo, children }) {
  return (
    <div className="campo-detalhes-container"> 
  
      {titulo && <h3 className="campo-detalhes-titulo">{titulo}</h3>}
      <div className="campo-detalhes-conteudo">
        {children} 
      </div>
    </div>
  );
}