import './tela-perfis.estilo.css'
import { Link } from 'react-router-dom';
import { PiSignOutBold } from 'react-icons/pi';
import { BsPersonCircle } from "react-icons/bs";
import { useExibirListas } from '../../hooks/useExibirListas';
import { useState } from 'react';


export function TelaPerfilPaciente() {
    const [familiares, setPacientesDoFamiliar] = useState([]);
    const [vinculos, setVinculos] = useState([]);
    const [pacientesLista, setPacientes] = useState([])

    useExibirListas("http://localhost:8000/cadastro/lista-familiares", setPacientesDoFamiliar);
    useExibirListas("http://localhost:8000/cadastro/lista-vinculos-pf", setVinculos);
    useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setPacientes)

    const id = localStorage.getItem("id_usuario");
    const familiarAuth = familiares.find(f => String(f.id_usuario) === String(id));
    const pacientes = familiarAuth
        ? pacientesLista.filter(p =>
            vinculos.some(v =>
                v.id_familiar === familiarAuth.id_familiar &&
                v.id_paciente === p.id_paciente
            )
        )
        : [];

    return (
        <main className='main-tela-perfis-paciente'>
            <header className="header-tela-perfis">
                <h1>Perfis dos pacientes</h1>
            </header>f
            <section className="section-tela-perfis">
                {pacientes.map((paciente) => (
                    <div key={paciente.id_paciente} className="div-perfil">
                        <Link to={`/familiar-paciente/${paciente.id_paciente}`}>
                            <BsPersonCircle />
                        </Link>
                        <p>{paciente.nome}</p>
                    </div>
                ))}
            </section>
            <section className="logout-section-tela-perfis">
                <Link to='/login' className='link-sair'>
                    <PiSignOutBold /> Sair
                </Link>
            </section>
            <img src="/neurolink-cadastrar-svg.svg" className="logo-canto-tela-de-perfil" alt="" />
        </main>
    )
}