import "./feedbacks-plano-terapeuta.estilo.css";

export default function FeedbacksPlanoTerapeutaModal({
  isOpen,
  onClose,
  plano,
  feedbacks = [],
}) {
  if (!isOpen || !plano) return null;

  return (
    <div className="feedback-modal-overlay">
      <div className="feedback-modal feedback-terapeuta-modal">

        {/* TÍTULO DO MODAL */}
        <div className="feedback-header">
          <div>
            <h2>Feedbacks recebidos</h2>
            <p className="subtitulo-plano-feedback">
              Plano dia {plano.data} • {feedbacks.length} registro{feedbacks.length !== 1 ? "s" : ""}
            </p>
          </div>

          <button className="close-button" type="button" onClick={onClose}>
            ×
          </button>
        </div>

        {/*  LISTA DE FEEDBACKS */}
        {feedbacks.length === 0 ? (
          <p>Nenhum feedback enviado para este plano ainda.</p>
        ) : (
          <div className="lista-feedbacks-terapeuta">
            {feedbacks.map((fb, index) => (
              <div key={index} className="item-feedback-terapeuta">
                
                {/* Ícone e seção */}
                <div className="feedback-top-row">
                  <div className="feedback-icon-round">
                    {fb.sentiment === "bom" && "🙂"}
                    {fb.sentiment === "neutro" && "😐"}
                    {fb.sentiment === "ruim" && "😞"}
                  </div>

                  <span className="feedback-section-tag">
                    {fb.section.toUpperCase()}
                  </span>

                  <span className="feedback-date">{fb.dataEnvio}</span>
                </div>

                {/* Quem enviou */}
                <p className="feedback-enviado-por">
                  Enviado por: <strong>{fb.autor || "Responsável"}</strong>
                </p>

                {/* Comentário */}
                <div className="feedback-comment-box">
                  "{fb.comment}"
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Botão fechar */}
        <div className="feedback-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
