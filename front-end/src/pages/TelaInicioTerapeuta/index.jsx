import './tela-inicio-terapeuta.estilo.css'
import { IconSair } from '../../componentes/IconSair'
import { Link } from 'react-router-dom';
import { useExibirListas } from '../../hooks/useExibirListas';
import { useState } from 'react';
import { Navbar } from '../../componentes/Navbar';
import { SidebarTerapeuta } from './../../componentes/SidebarTerapeuta/index';

export function TelaInicioTerapeuta() {
    const [terapeutas, setTerapeutas] = useState([])
    useExibirListas("http://localhost:8000/cadastro/lista-terapeutas", setTerapeutas)
    const id = localStorage.getItem("id_usuario");

    const terapeutaAuth = terapeutas.find(t => String(t.id_usuario) === String(id));

    return (
        <main className='main-tela-inicio-terapeuta'>
            <SidebarTerapeuta terapeuta = {terapeutaAuth}/>
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
                        <p className='numero-pacientes-total'>0</p>
                    </div>
                </div>
                {/* <div className='acoes-terapeuta'>
                    <Link to="/terapeuta/sessao">
                        <div>
                            <h3>Sessões</h3>
                            <p>Visualise e gerencie suas sessões</p>
                        </div>
                    </Link>
                    <Link to="/terapeuta/pacientes">
                        <div>
                            <h3>Ver pacientes</h3>
                            <p>Gerencie e acompanhe o progresso</p>
                        </div>
                    </Link>

                </div> */}
            </section>
        </main>
    )
}