import { useState } from "react";
import "./feedbackModal.estilo.css";

export default function FeedbackFamiliar({ isOpen, onClose, onSubmit }) {
  const [section, setSection] = useState("Geral");
  const [sentiment, setSentiment] = useState(null);
  const [comment, setComment] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { section, sentiment, comment };
    if (onSubmit) onSubmit(data);

    setSection("Geral");
    setSentiment(null);
    setComment("");
    onClose();
  };

  return (
    <div className="feedback-modal-overlay">
      <div className="feedback-modal">
        <div className="feedback-header">
          <h2>Adicionar Feedback</h2>
          <button type="button" className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="feedback-field">
            <label htmlFor="section">Seção</label>
            <select
              id="section"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="Geral">Geral</option>
              <option value="Neurodivergência">Neurodivergência</option>
              <option value="Metodologia">Metodologia</option>
              <option value="Cronograma">Cronograma</option>
              <option value="Objetivos">Objetivos</option>
            </select>
          </div>

          <div className="feedback-field">
            <label>Sentimento</label>
            <div className="sentiment-group">
              <button
                type="button"
                className={
                  "sentiment-btn" +
                  (sentiment === "ruim" ? " sentiment-selected" : "")
                }
                onClick={() => setSentiment("ruim")}
              >
                😞
              </button>
              <button
                type="button"
                className={
                  "sentiment-btn" +
                  (sentiment === "neutro" ? " sentiment-selected" : "")
                }
                onClick={() => setSentiment("neutro")}
              >
                😐
              </button>
              <button
                type="button"
                className={
                  "sentiment-btn" +
                  (sentiment === "bom" ? " sentiment-selected" : "")
                }
                onClick={() => setSentiment("bom")}
              >
                🙂
              </button>
            </div>
          </div>

          <div className="feedback-field">
            <label htmlFor="comment">Comentário</label>
            <textarea
              id="comment"
              placeholder="Digite seu feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="feedback-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
