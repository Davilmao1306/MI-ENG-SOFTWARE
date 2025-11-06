import React from 'react';
import './pacientes.css';

export function ListaPacientes({ pacientes }) {
    if (!pacientes || pacientes.length === 0) {
        return <p className='lista-vazia'>Nenhum paciente cadastrado ainda.</p>;
    }

    return (
        <div className='lista-pacientes'>
            {pacientes.map((paciente) => (
                <div key={paciente.id_paciente} className='card-paciente'>
                    <h3>{paciente.nome}</h3>
                    <p><strong>Data de Nascimento:</strong> {paciente.data_nascimento}</p>
                    <p><strong>CPF:</strong> {paciente.cpf}</p>
                </div>
            ))}
        </div>
    );
}
