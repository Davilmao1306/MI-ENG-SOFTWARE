import { useEffect, useState } from 'react';
import { BsLink45Deg } from 'react-icons/bs';
import './card-entrada.estilo.css'; 
import { ImageModal } from '../ImageModal'; 

export function CardEntrada({ autor, data, texto, attachments = [] }) {
  const horaFormatada = new Date(data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const hasAnexo = attachments && attachments.length > 0;

  // Estados para controlar o Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: '', name: '' });

  // Função para abrir o modal com a imagem clicada
  const handleImageClick = (url, name) => {
    setSelectedImage({ url, name });
    setIsModalOpen(true);
  };

  
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
          // Lógica de verificação atualizada para Base64
          const isImageUrl = 
            anexo.type === 'foto' || 
            (anexo.url && anexo.url.startsWith('data:image')) ||
            (anexo.type === 'file' && /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(anexo.url));

          const isLink = anexo.type === 'link';

          if (isImageUrl) {
            return (
              // AQUI: Ao clicar na div, abrimos o modal em vez de abrir link nova aba
              <div 
                key={index} 
                className="combinada-anexo-visualizavel" 
                onClick={() => handleImageClick(anexo.url, anexo.name)}
                style={{ cursor: 'pointer' }} // Mostra a mãozinha
              >
                <img 
                    src={anexo.url} 
                    alt={anexo.name || `Anexo ${index + 1}`} 
                    className="combinada-thumbnail" 
                    // Estilo inline ou no CSS para limitar tamanho da miniatura
                    style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px' }}
                />
              </div>
            );
          } else if (isLink) {
            return (
              <div key={index} className="combinada-anexo-link">
                <BsLink45Deg />
                <a href={anexo.url} target="_blank" rel="noopener noreferrer">{anexo.name || anexo.url}</a>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <>
      <div className={`card-entrada-combinada ${hasAnexo ? 'has-anexo' : ''}`}>
        <div className="card-header-combinada">
          <span className="card-autor-combinada">{autor}</span>
          <span className="card-data-combinada">({horaFormatada})</span>
        </div>
        {texto && texto.trim() !== '' && <p className="card-texto-combinada">{texto}</p>}
      
        {renderAttachments()}
      </div>

      {/* Renderiza o Modal aqui fora da estrutura visual do card, mas dentro do componente */}
      <ImageModal 
        isOpen={isModalOpen}
        imageUrl={selectedImage.url}
        imageName={selectedImage.name}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}