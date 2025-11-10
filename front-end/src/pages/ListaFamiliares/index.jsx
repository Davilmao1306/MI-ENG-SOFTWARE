import "./lista-familiares.estilo.css"
import { useEffect, useState } from "react";
import { Sidebar } from './../../componentes/Sidebar/index';
import { ArrowLeft, Search, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Botao } from "../../componentes/Botao";
import { FiPlusCircle } from "react-icons/fi";

export function ListaFamiliares() {
    const [familiares, setFamiliares] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const urlGetFamiliares = "http://localhost:8000/cadastro/lista-familiares";

    const fetchFamiliares = () => {
        fetch(urlGetFamiliares)
            .then((res) => res.json())
            .then((data) => setFamiliares(data))
            .catch((err) => console.error("Erro ao buscar familiares:", err));
    };

    useEffect(() => {
        fetchFamiliares();
    }, []);
    const filteredFamiliares = familiares.filter(familiar => {
        const termo = searchTerm.toLowerCase();
        return (
            familiar.nome.toLowerCase().includes(termo)
        );
    });

    return (
        <main className="tela-listar-familiares">
            <Sidebar />
            <div className="main-listar-familiares">
                <header className="header-listar-familiares">
                    <h1>Familiares</h1>
                </header>
                <section className="familiares-content">
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

                        <Link to='/clinica/cadastrar-familiar'>
                            <FiPlusCircle /> Cadastrar Familiar
                        </Link>
                    </div>

                    <div className="familiares-layout">
                        <div className="familiares-grid">
                            {filteredFamiliares.map((familiar) => (
                                <div key={familiar.id_familiar} className="familiar-card">
                                    <UserRound size={48} className="familiar-avatar" />
                                    <strong>{familiar.nome}</strong>
                                    <p>{familiar.datanascimento}</p>
                                    <p>{familiar.cpf}</p>
                                    <Botao className="ver-perfil-btn">Ver perfil</Botao>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}