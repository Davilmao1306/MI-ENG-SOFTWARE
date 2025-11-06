import ReactDOM from 'react-dom';
import './modal.estilo.css';

export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null; // Não renderiza nada se o modal não estiver aberto
  }

  // Tenta obter o elemento modal-root a cada renderização do modal
  const portalRoot = document.getElementById('modal-root');

  // Se o elemento não for encontrado, loga um aviso e não tenta criar o portal
  if (!portalRoot) {
    console.warn("Elemento #modal-root não encontrado no DOM. O modal não será renderizado.");
    return null; // Evita o erro "Target container is not a DOM element"
  }

 return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p className="modal-title">{title}</p>
          <button className="modal-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    portalRoot
  );
}