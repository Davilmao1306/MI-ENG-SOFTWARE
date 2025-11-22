import { ListaPacientes } from '../../componentes/ExibeLista'
import './acessar-pacientes.estilo.css'

import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router";
import { useExibirListas } from '../../hooks/useExibirListas';
import { Navbar } from './../../componentes/Navbar/index';
import { useState } from 'react';
import { SidebarTerapeuta } from '../../componentes/SidebarTerapeuta';

export function AcessarPacientes() {
    const id = localStorage.getItem("id_usuario");

    const [terapeutas, setTerapeutas] = useState([])
    const [pacientes, setPacientes] = useState([])
    const [vinculos, setVinculos] = useState([])

    useExibirListas("http://localhost:8000/cadastro/lista-terapeutas", setTerapeutas)
    useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setPacientes)
    useExibirListas("http://localhost:8000/cadastro/lista-vinculos-pt", setVinculos)

    // Tem que fazer isso para dar tempo dos dados chegarem a lista de terapeutas
    if (!Array.isArray(terapeutas) || terapeutas.length === 0) {
        return;
    }

    const terapeutaAuth = terapeutas.find(t => String(t.id_usuario) === String(id));

    const pacientesDoTerapeuta = pacientes.filter(p =>
        vinculos.some(v =>
            v.id_terapeuta === terapeutaAuth.id_terapeuta &&
            v.id_paciente === p.id_paciente
        )
    );
    return (
        <main className='tela-exibe-pacientes'>
            <SidebarTerapeuta terapeuta={terapeutaAuth} />
            <Navbar userName="Terapeuta" />
            <section className='section-exibe-pacientes'>
                <div className='div-titulos'>
                    <Link to='/terapeuta' className='voltar-tela'>
                        <ArrowLeft className='voltar-tela-pacientes' />
                    </Link>
                    <h2>Meus Pacientes</h2>
                </div>
                <div>
                    <ListaPacientes lista={pacientesDoTerapeuta} />
                </div>
            </section>

        </main>
    )
}