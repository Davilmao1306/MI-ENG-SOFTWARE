import React from 'react';

import './cadastrar-paciente.estilo.css'
import { FormCadastrarPaciente } from '../../componentes/FormCadastrarPaciente'
import { Link } from 'react-router-dom'
import { ListaPacientes } from '../../componentes/ListaPacientes';
import { useState, useEffect } from 'react';
export function CadastrarPaciente() {
    const [pacientes, setPacientes] = useState([]);
    const urlGetPacientes = "http://localhost:8000/cadastro/lista-pacientes";

    const fetchPacientes = () => {
        fetch(urlGetPacientes)
            .then((res) => res.json())
            .then((data) => setPacientes(data))
            .catch((err) => console.error("Erro ao buscar pacientes:", err));
    };

    useEffect(() => {
        fetchPacientes();
    }, []);

    return (
        <main className='cadastrar-paciente'>
            <header className="cadastrar-paciente-cabecalho">
                <h1>Olá Clínica,<br />Cadastre o paciente!</h1>
            </header>

            <section className='form-cadastrar-paciente'>
                <FormCadastrarPaciente onSucessoCadastro={fetchPacientes} />
            </section>

            <section className='lista-pacientes-section'>
                <h2>Pacientes Cadastrados</h2>
                <ListaPacientes pacientes={pacientes} />
            </section>

            <section className='imagem-neurolink'>
                <img src="/neurolink-cadastro.png" alt="Neurolink" />
            </section>
        </main>
    );
}