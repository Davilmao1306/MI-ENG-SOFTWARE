import './tela-inicio-terapeuta.estilo.css'
import { BsPersonCircle } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IconSair } from '../../componentes/IconSair'
import { Link } from 'react-router-dom';
import { useExibirListas } from '../../hooks/useExibirListas';

export function TelaInicioTerapeuta() {
    const terapeutas = useExibirListas("http://localhost:8000/cadastro/lista-terapeutas")
    const id = localStorage.getItem("id_usuario");

    // Tem que fazer isso para dar tempo dos dados chegarem a lista de terapeutas
    if (!Array.isArray(terapeutas) || terapeutas.length === 0) {
        return;
    }

    const terapeutaAuth = terapeutas.find(t => String(t.id_usuario) === String(id));

    return (
        <main className='main-tela-inicio-terapeuta'>
            <header className='header-tela-inicio-terapeuta'>
                <div className='div-img-nome'>
                    <img src="/logo-terapeuta.png" alt="" />
                    <p> {terapeutaAuth.nome}<br></br>
                        {terapeutaAuth.especialidade}
                    </p>

                </div>
                <div>
                    <IoMdNotificationsOutline fontSize={"40px"} color='#000000' />
                    <BsPersonCircle fontSize={"40px"} color='#000000' />
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

                </div>
            </section>
            <section className='sec-sair'>
                <IconSair />
            </section>


        </main>
    )
}