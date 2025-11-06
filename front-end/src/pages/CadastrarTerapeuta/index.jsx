
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { FormCadastrarTerapeuta } from '../../componentes/FormCadastrarTerapeuta'
import { ListaTerapeutas } from '../../componentes/ListaTerapeutas';
import './cadastrar-terapeuta.estilo.css';

export function CadastrarTerapeuta() {
    const [terapeutas, setTerapeutas] = useState([]);
    const urlGetTerapeutas = "http://localhost:8000/cadastro/lista-terapeutas";

    const fetchTerapeutas = () => {
        fetch(urlGetTerapeutas)
            .then((res) => res.json())
            .then((data) => setTerapeutas(data))
            .catch((err) => console.error("Erro ao buscar terapeutas:", err));
    };

    useEffect(() => {
        fetchTerapeutas();
    }, []);

    return (
        <main className='cadastrar-terapeuta'>
            <header className="cadastrar-terapeuta-cabecalho">
                <h1>Olá Clínica,<br />Cadastre o terapeuta!</h1>
            </header>

            <section className='form-cadastrar-terapeuta'>
                <FormCadastrarTerapeuta onSucessoCadastro={fetchTerapeutas} />
            </section>

            <section className='lista-terapeutas-section'>
                <h2>Terapeutas Cadastrados</h2>
                <ListaTerapeutas terapeutas={terapeutas} />
            </section>

            <section className='imagem-neurolink'>
                <img src="/neurolink-cadastro.png" alt="Neurolink" />
            </section>
        </main>
    );
}
