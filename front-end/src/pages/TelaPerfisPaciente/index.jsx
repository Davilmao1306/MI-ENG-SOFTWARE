import './tela-perfis.estilo.css'
import { Link } from 'react-router-dom';
import { PiSignOutBold } from 'react-icons/pi';
import { BsPersonCircle } from "react-icons/bs";

const pacientes = [
    { id: 1, nome: 'Matheus', avatar: '/avatar-perfil.png' },
    { id: 2, nome: 'Paciente', avatar: '/avatar-perfil.png' },
    { id: 3, nome: 'Paciente', avatar: '/avatar-perfil.png' },
]
export function TelaPerfilPaciente() {
    return (
        <main className='main-tela-perfis-paciente'>
            <header className="header-tela-perfis">
                <h1>Perfis dos pacientes</h1>
            </header>f
            <section className="section-tela-perfis">
                {pacientes.map((paciente) => (
                    <div key={paciente.id} className="div-perfil">
                        <Link to={`/login/familiar-paciente/${paciente.id}`}>
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