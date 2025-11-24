import './acessar-pacientes.estilo.css'
import { ListaPacientes } from '../../componentes/ExibeLista'
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

    const terapeutaAuth = terapeutas?.find(t => String(t.id_usuario) === String(id));

    const pacientesDoTerapeuta = pacientes.filter(p =>
        vinculos.some(v =>
            v.id_terapeuta === terapeutaAuth?.id_terapeuta &&
            v.id_paciente === p.id_paciente
        )
    );
    return (
        <main className='tela-exibe-pacientes'>
            <Navbar userName="Terapeuta" />
            <SidebarTerapeuta terapeuta={terapeutaAuth} />
            <section className='section-exibe-pacientes'>
                <div className='div-titulos'>
                    <h2>Meus Pacientes</h2>
                </div>
                <div>
                    <ListaPacientes lista={pacientesDoTerapeuta} />
                </div>
            </section>

        </main>
    )
}