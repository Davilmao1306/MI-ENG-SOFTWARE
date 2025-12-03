import './tela-inicio-terapeuta.estilo.css'
import { useExibirListas } from '../../hooks/useExibirListas';
import { useState } from 'react';
import { Navbar } from '../../componentes/Navbar';
import { SidebarTerapeuta } from './../../componentes/SidebarTerapeuta/index';

export function TelaInicioTerapeuta() {
    const [terapeutas, setTerapeutas] = useState([])
    const [vinculos, setVinculos] = useState([])
    const [pacientes, setPacientes] = useState([]);
    useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setPacientes);
    useExibirListas("http://localhost:8000/cadastro/lista-vinculos-pt", setVinculos)
    useExibirListas("http://localhost:8000/cadastro/lista-terapeutas", setTerapeutas)
    const id = localStorage.getItem("id_usuario");

    const terapeutaAuth = terapeutas.find(t => String(t.id_usuario) === String(id));
    
    const meusVinculos = vinculos.filter(v =>
        String(v.id_terapeuta) === String(terapeutaAuth?.id_terapeuta)
    );

    
    const meusPacientes = pacientes.filter(p =>
        meusVinculos.some(v => v.id_paciente === p.id_paciente)
    );
    return (
        <main className='main-tela-inicio-terapeuta'>
            <SidebarTerapeuta terapeuta={terapeutaAuth} />
            <Navbar userName="Terapeuta" />
            <section className='sec-tela-inicio-terapeuta'>
                <h3>Dashboard</h3>
                <p>visão geral das suas atividades</p>
                <div className='dashboard-terapeuta'>
                    <div>
                        <p>Sessões hoje</p>
                        <p className='numero-sessoes' >0</p>
                    </div>
                    <div>
                        <p>Pacientes Ativos</p>
                        <p className='numero-pacientes'>0</p>
                    </div>
                    <div>
                        <p>Realizadas hoje</p>
                        <p className='numero-sessoes-realizadas'>0</p>
                    </div>
                    <div>
                        <p>Total pacientes</p>
                        <p className='numero-pacientes-total'>{meusPacientes.length}</p>
                    </div>
                </div>
            </section>
        </main>
    )
}