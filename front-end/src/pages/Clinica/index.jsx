import React from "react";
import { useNavigate } from "react-router-dom";
import "./clinica.css";

export function Clinica() {
  const navigate = useNavigate();

  return (
    <div className="clinica-container">
      <h1 className="clinica-titulo">Bem-vindo, clínica!</h1>
      <p className="clinica-subtitulo">Selecione uma ação abaixo:</p>

      <div className="clinica-botoes">
        <button onClick={() => navigate("/clinica/cadastrar-familiar")}>
          Cadastrar Familiar
        </button>
        <button onClick={() => navigate("/clinica/cadastrar-paciente")}>
          Cadastrar Paciente
        </button>
        <button onClick={() => navigate("/clinica/cadastrar-terapeuta")}>
          Cadastrar Terapeuta
        </button>
      </div>
    </div>
  );
}
