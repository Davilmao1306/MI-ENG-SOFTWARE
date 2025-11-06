import React from 'react';
import './lista-terapeutas.estilo.css';
import { ArrowLeft, Search, UserRound, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

// Dados de exemplo baseados na imagem
const terapeutasData = [
    { id: 1, nome: "Dr. Cláudio", formacao: "Psicólogo" },
    { id: 2, nome: "Dra. Maria", formacao: "Psicóloga" },
    { id: 3, nome: "Dr. Henrique", formacao: "Psicólogo" },
    { id: 4, nome: "Dra. Lucia", formacao: "Psicóloga" },
    { id: 5, nome: "Dra. Ana", formacao: "Psicóloga" },
    { id: 6, nome: "Dr. Lucas", formacao: "Psiquiatra" },
    { id: 7, nome: "Dr. Pedro", formacao: "Psicólogo" },
    { id: 8, nome: "Dr. Bento", formacao: "Psicólogo" },
    { id: 9, nome: "Dr. Martin", formacao: "Psicólogo" },
];

export function ListaTerapeutas() {
    return (
        <div className="terapeutas-container">
            <header className="header-lista-terapeutas">

                <Link to="/clinica">
                    <ArrowLeft size={24} className="icone-voltar" />
                </Link>
                <h1>Terapeutas</h1>
            </header>

            <section className="terapeutas-content">
                <div className="search-bar-container">
                    <div className="search-input-wrapper">
                        <Search size={20} className="search-icon" />
                        <input type="search" placeholder="Buscar por nome, crp,crm" />
                    </div>
                    <button className="ordenar-btn">Ordenar por ...</button>
                </div>

                <div className="terapeutas-layout">
                    {/* Coluna de Filtros */}
                    <aside className="filtros-sidebar">
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
                    </aside>

                    {/* Coluna do Grid de Terapeutas */}
                    <main className="terapeutas-grid-container">
                        <div className="terapeutas-grid">
                            {terapeutasData.map((terapeuta) => (
                                <div key={terapeuta.id} className="terapeuta-card">
                                    <UserRound size={48} className="terapeuta-avatar" />
                                    <strong>{terapeuta.nome}</strong>
                                    <span>{terapeuta.formacao}</span>
                                    <button className="ver-perfil-btn">Ver perfil</button>
                                </div>
                            ))}
                        </div>

                        <nav className="pagination">
                            <span>&lt;&lt; Anterior</span>
                            <a href="#" className="active">1</a>
                            <a href="#">2</a>
                            <a href="#">3</a>
                            <span>...</span>
                            <a href="#">8</a>
                            <span>Próxima &gt;&gt;</span>
                        </nav>
                    </main>
                </div>
            </section>

            <footer className="footer-sair">
                <Link to="/login">
                    <LogOut size={24} />
                    <span>Sair</span>
                </Link>

            </footer>
        </div>
    );
}