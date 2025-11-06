import React from 'react';
import './terapeutas.css';

export function ListaTerapeutas({ terapeutas }) {
    if (!terapeutas || terapeutas.length === 0) {
        return <p className='lista-vazia'>Nenhum terapeuta cadastrado ainda.</p>;
    }

    return (
        <div className='lista-terapeutas'>
            {terapeutas.map((t) => (
                <div key={t.id_terapeuta} className='card-terapeuta'>
                    <h3>{t.nome}</h3>
                    <p><strong>Data de Nascimento:</strong> {t.data_nascimento}</p>
                    <p><strong>Telefone:</strong> {t.telefone}</p>
                    <p><strong>CRP:</strong> {t.crp}</p>
                    <p><strong>Especialidade:</strong> {t.especialidade}</p>
                </div>
            ))}
        </div>
    );
}
