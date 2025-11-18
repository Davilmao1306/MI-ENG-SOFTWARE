import React, { useState } from "react";
import './lista-pacientes.estilo.css'
import { UserRound } from 'lucide-react';
import { Botao } from "../Botao";
import { Link } from "react-router-dom";

export function ListaPacientes({ lista }) {

    const [busca, setBusca] = useState("");

    // Filtra pacientes dinamicamente conforme o texto digitado
    const pacientesFiltrados = lista.filter((paciente) =>
        paciente.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            <input
                className="input-pesquisar-paciente"
                type="text"
                placeholder="Buscar por nome, responsável ou ..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{ padding: "5px", marginBottom: "10px" }}
            />
            <ul className="ul-paciente">
                {pacientesFiltrados.map((paciente) => (
                    <li key={paciente.id_paciente} className="li-paciente">
                        <div>
                            <UserRound />
                            <strong>{paciente.nome}</strong>
                        </div>
                        Data nascimento:  {paciente.data_nascimento}<br></br>
                        gênero: {paciente.genero} <br></br>
                        status: {paciente.status} <br></br>
                        cpf: {paciente.cpf}
                        <Link to={`/terapeuta/pacientes/${paciente.id_paciente}/diario`}> <Botao className='botao-acessar'>Acessar Diario</Botao></Link>
                        <Link to={`/terapeuta/paciente/${paciente.id_paciente}/plano-terapeutico-terapeuta`}> <Botao className='botao-acessar'>Acessar Plano</Botao></Link>

                    </li>
                ))} 
            </ul>
        </div>
    );
}