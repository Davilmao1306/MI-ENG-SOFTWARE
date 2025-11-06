import React from 'react';
import { useState, useEffect } from 'react';
import './cadastrar-familiar.estilo.css'
import { FormCadastrarFamiliar } from '../../componentes/FormCadastrarFamiliar'
import { Link } from 'react-router-dom'
import { ListaFamiliares } from '../../componentes/ListaFamiliares';
export function CadastrarFamiliar() {
    const [familiares, setFamiliares] = useState([]);
    const urlGetFamiliares = "http://localhost:8000/cadastro/lista-familiares"

    const fetchFamiliares = () => {
        fetch(urlGetFamiliares)
            .then((res) => res.json())
            .then((data) => setFamiliares(data))
            .catch((err) => console.error("Erro ao buscar familiares:", err));
    }

    useEffect(() => {
        fetchFamiliares()
    }, []);

    return (
        <main className='cadastar-familiar'>
            <header className="cadastrar-familiar-cabecalho">

                <h1>Olá Clínica,<br></br> Cadastre o familiar!</h1>

            </header>
            <section className='form-cadastrar-familiar'>
                <FormCadastrarFamiliar onSucessoCadastro={fetchFamiliares} />
            </section>
            <section>
                
            </section>
            <section className='imagem-neurolink'>
                <img src="/neurolink-cadastro.png" alt="" />
                <h1>Todos os Familiares</h1>
                 <ListaFamiliares familiares={familiares} />
            </section>


        </main>
    )
}