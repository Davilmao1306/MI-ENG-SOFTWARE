import './tela-inicio-terapeuta.estilo.css'
import { BsPersonCircle } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import {IconSair} from '../../componentes/IconSair'

export function TelaInicioTerapeuta() {
    const terapeutas = [
        {
            id: "1",
            nome: "Rodrigo Tripodi",
            data: new Date(),
        }
    ]
    return (
        <main className='main-tela-inicio-terapeuta'>
            <header className='header-tela-inicio-terapeuta'>
                <div className='div-img-nome'>
                    <img src="/logo-terapeuta.png" alt="" />
                    <p>Rodrigo Tripodi</p>
                </div>
                <div>
                    <IoMdNotificationsOutline fontSize={"40px"} color='#055175' />
                    <BsPersonCircle fontSize={"40px"} color='#055175' />
                </div>
            </header>
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
                <div className='acoes-terapeuta'>
                    <div>
                        <h3>Sessões</h3>
                        <p>Visualise e gerencie suas sessões</p>
                    </div>
                    <div>
                        <h3>Ver pacientes</h3>
                        <p>Gerencie e acompanhe o progresso</p>
                    </div>
                </div>
            </section>
            <section className='sec-sair'>
                <IconSair/>
            </section>
            
            
        </main>
    )
}