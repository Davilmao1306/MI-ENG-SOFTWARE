import React from "react";
import "./familiares.css";

export function ListaFamiliares({ familiares }) {
    return (
        <div className="lista-familiares">
            {familiares.length === 0 ? (
                <p className="sem-familiares">Nenhum familiar cadastrado.</p>
            ) : (
                familiares.map((familiar) => (
                    <div key={familiar.id_familiar} className="card-familiar">
                        <h2 className="nome-familiar">{familiar.nome}</h2>
                        <p><strong>Data de nascimento:</strong> {familiar.data_nascimento}</p>
                        <p><strong>Telefone:</strong> {familiar.telefone}</p>
                        <p><strong>CPF:</strong> {familiar.cpf}</p>
                        <p><strong>ID Usuário:</strong> {familiar.id_usuario}</p>
                    </div>
                ))
            )}
        </div>
    );
}
