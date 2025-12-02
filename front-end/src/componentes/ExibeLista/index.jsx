import './lista-pacientes.estilo.css'
import { useState } from "react";
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
        <div className="exibe-pacientes">
            <input
                className="input-pesquisar-paciente"
                type="text"
                placeholder="Buscar por nome, responsável ou ..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />
            <ul className="ul-paciente">
                {pacientesFiltrados.map((paciente) => (
                    <li key={paciente.id_paciente} className="li-paciente">
                        <div>
                            <UserRound />
                            <strong>{paciente.nome}</strong>
                        </div>
                        Data nascimento:  {paciente.data_nascimento}<br></br>
                        Gênero: {paciente.genero} <br></br>
                        Status: {paciente.status} <br></br>
                        CPF: {paciente.cpf}
                        <Link to={`/terapeuta/pacientes/${paciente.id_paciente}/diario`}> <Botao className='botao-acessar'>Acessar Diario</Botao></Link>
                        <Link to={`/terapeuta/paciente/${paciente.id_paciente}/plano-terapeutico-terapeuta`}> <Botao className='botao-acessar'>Acessar Plano</Botao></Link>

                    </li>
                ))} 
            </ul>
        </div>
    );
}