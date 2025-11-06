import React, { useState } from "react";
import './lista-pacientes.estilo.css'
import { UserRound } from 'lucide-react';

export function ListaPacientes({ lista }) { 

    const [pacientes, setPacientes] = useState([
        { id: 1, nome: "Luis Guilherme", genero: "Masculino", idade: 22, status: "Ativo", responsavel: "Ronivon" },
        { id: 2, nome: "Maria Eduarda", genero: "Feminino", idade: 28, status: "Ativo", responsavel: "Carla" },
        { id: 3, nome: "Carlos Henrique", genero: "Masculino", idade: 35, status: "Desativado", responsavel: "Fernanda" },
        { id: 4, nome: "Ana Beatriz", genero: "Feminino", idade: 19, status: "Ativo", responsavel: "Ricardo" },
        { id: 5, nome: "João Pedro", genero: "Masculino", idade: 25, status: "Ativo", responsavel: "Amanda" },
        { id: 6, nome: "Mariana Souza", genero: "Feminino", idade: 31, status: "Ativo", responsavel: "Lucas" },
        { id: 7, nome: "Pedro Henrique", genero: "Masculino", idade: 27, status: "Desativado", responsavel: "Camila" },
        { id: 8, nome: "Ana Clara", genero: "Feminino", idade: 23, status: "Ativo", responsavel: "João Paulo" },
        { id: 9, nome: "João Vitor", genero: "Masculino", idade: 29, status: "Ativo", responsavel: "Renata" },
        { id: 10, nome: "Fernanda Lima", genero: "Feminino", idade: 34, status: "Ativo", responsavel: "Marcos" },
        { id: 11, nome: "Maria Clara", genero: "Feminino", idade: 21, status: "Desativado", responsavel: "Carla" },
        { id: 12, nome: "Paulo Sérgio", genero: "Masculino", idade: 41, status: "Ativo", responsavel: "Rodrigo" },
        { id: 13, nome: "Gabriel Silva", genero: "Masculino", idade: 24, status: "Ativo", responsavel: "Patrícia" },
        { id: 14, nome: "Juliana Alves", genero: "Feminino", idade: 32, status: "Desativado", responsavel: "Rafaela" },
        { id: 15, nome: "Lucas Pereira", genero: "Masculino", idade: 26, status: "Ativo", responsavel: "André" },
        { id: 16, nome: "Marcos Vinicius", genero: "Masculino", idade: 33, status: "Ativo", responsavel: "Daniela" },
        { id: 17, nome: "Ana Júlia", genero: "Feminino", idade: 20, status: "Ativo", responsavel: "Ricardo" },
        { id: 18, nome: "João Gabriel", genero: "Masculino", idade: 30, status: "Desativado", responsavel: "Sabrina" },
        { id: 19, nome: "Beatriz Santos", genero: "Feminino", idade: 27, status: "Ativo", responsavel: "Mariana" },
        { id: 20, nome: "Pedro Lucas", genero: "Masculino", idade: 22, status: "Ativo", responsavel: "Camila" },
        { id: 21, nome: "Maria Fernanda", genero: "Feminino", idade: 26, status: "Ativo", responsavel: "Anderson" },
        { id: 22, nome: "Felipe Costa", genero: "Masculino", idade: 38, status: "Desativado", responsavel: "Vanessa" },
        { id: 23, nome: "Rafaela Gomes", genero: "Feminino", idade: 29, status: "Ativo", responsavel: "Rodrigo" },
        { id: 24, nome: "Thiago Rocha", genero: "Masculino", idade: 35, status: "Ativo", responsavel: "Luciana" },
        { id: 25, nome: "Carla Menezes", genero: "Feminino", idade: 33, status: "Desativado", responsavel: "Felipe" },
        { id: 26, nome: "João Paulo", genero: "Masculino", idade: 40, status: "Ativo", responsavel: "Marcos" },
        { id: 27, nome: "Ana Luiza", genero: "Feminino", idade: 24, status: "Ativo", responsavel: "Patrícia" },
        { id: 28, nome: "Pedro Augusto", genero: "Masculino", idade: 28, status: "Ativo", responsavel: "Fernanda" },
        { id: 29, nome: "Maria Alice", genero: "Feminino", idade: 19, status: "Ativo", responsavel: "Andréa" },
        { id: 30, nome: "Ricardo Lima", genero: "Masculino", idade: 36, status: "Desativado", responsavel: "Renata" },
    ]);


    const [busca, setBusca] = useState("");

    // Filtra pacientes dinamicamente conforme o texto digitado
    const pacientesFiltrados = pacientes.filter((paciente) =>
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
                    <li key={paciente.id} className="li-paciente">
                        <div>
                            <UserRound />
                            <strong>{paciente.nome}</strong>
                        </div>
                        idade:  {paciente.idade}<br></br>
                        gênero: {paciente.genero} <br></br>
                        status: {paciente.status} <br></br>
                        responsavel: {paciente.responsavel}
                        <button>Acessar Diario</button>
                        <button>Acessar Plano</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}