import React, { useEffect, useState } from 'react';
import './lista-terapeutas.estilo.css';
import { ArrowLeft, Search, UserRound, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from './../../componentes/Sidebar/index';
import { Botao } from '../../componentes/Botao';
import { FiPlusCircle } from 'react-icons/fi';

export function ListaTerapeutas() {
    const [terapeutas, setTerapeutas] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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

    const filteredTerapeutas = terapeutas.filter(terapeuta => {
        const termo = searchTerm.toLowerCase();
        return (
            terapeuta.nome.toLowerCase().includes(termo)
        );
    });

    return (
        <div className="terapeutas-container">
            <Sidebar />
            <main className='main-listar-terapeutas'>
                <header className="header-lista-terapeutas">
                    <h1 >Gerenciamento de Terapeutas</h1>
                </header>

                <section className="terapeutas-content">
                    <div className="search-bar-container">
                        <div className="search-input-wrapper">
                            <Search size={20} className="search-icon" />
                            <input
                                type="search"
                                placeholder="Buscar por nome, crp, crm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <Link to='/clinica/cadastrar-terapeuta'>
                            <FiPlusCircle /> Cadastrar Terapeuta
                        </Link>
                    </div>

                    <div className="terapeutas-layout">
                        {/* <aside className="filtros-sidebar">
                            <h3>Filtros</h3>

                            <div className="filtro-section">
                                <p>Especialidade</p>
                                <label className="label-checkbox">
                                    <input type="checkbox" /> DISLEXIA
                                </label>
                                <label className="label-checkbox">
                                    <input type="checkbox" /> TOC
                                </label>
                                <label className="label-checkbox">
                                    <input type="checkbox" /> TDHA
                                </label>
                                <label className="label-checkbox">
                                    <input type="checkbox" /> TEA
                                </label>
                            </div>

                            <div className="filtro-section">
                                <p>Métodos de tratamento</p>
                                <label className="label-checkbox">
                                    <input type="checkbox" /> ABA
                                </label>
                                <label className="label-checkbox">
                                    <input type="checkbox" /> TCC
                                </label>
                                <label className="label-checkbox">
                                    <input type="checkbox" /> TDHA
                                </label>
                                <label className="label-checkbox">
                                    <input type="checkbox" /> TEA
                                </label>
                            </div>
                        </aside> */}
                        <div className="terapeutas-grid-container">
                            <div className="terapeutas-grid">
                                {filteredTerapeutas.map((terapeuta) => (
                                    <div key={terapeuta.id_terapeuta} className="terapeuta-card">
                                        <UserRound size={48} className="terapeuta-avatar" />
                                        <strong>{terapeuta.nome}</strong>
                                        <span>{terapeuta.especialidade}</span>
                                        <Botao className="ver-perfil-btn">Ver perfil</Botao>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}