import "./consent.css";
import { useState, useEffect } from "react";

function Consent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("consent");
    const declined = sessionStorage.getItem("consentDeclined");

    if (!consent && !declined) {
      setShowConsent(true);
    }
  }, []);

  const onAccept = () => {
    localStorage.setItem("consent", "true");
    setShowConsent(false);
  };

  const onDecline = () => {
    sessionStorage.setItem("consentDeclined", "true");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="modal-overlay">
      <div className="consent-container">
        <img
          src="/Icon.png"
          alt="Smartphone com check"
          className="consent-icon"
        />

        <h1>Uso de dados</h1>

        <p>
          Ao continuar, declaro que li e aceito os{" "}
          <a
            href="/Termos-LGPD.pdf"
            className="consent-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Termos e Condições
          </a>.
        </p>

        <div className="buttons">
          <button type="button" onClick={onDecline} className="btn-decline">
            Recusar
          </button>
          <button type="button" onClick={onAccept} className="btn-accept">
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Consent;
