import './tela-perfis.estilo.css'
import { Link } from 'react-router-dom';

const pacientes = [
    { id: 1, nome: 'João', avatar: '/avatar-perfil.png' },
    { id: 2, nome: 'Maria', avatar: '/avatar-perfil.png' },
    { id: 3, nome: 'Pedro', avatar: '/avatar-perfil.png' },
  ]
export function TelaPerfilPaciente() {
    return (
        <main className='main-tela-perfis-paciente'>
            <header className="header-tela-perfis">
                <h1>Perfis dos pacientes</h1>
            </header>
            <section className="section-tela-perfis">
                {pacientes.map((paciente) => (
                    <div key={paciente.id} className="div-perfil">
                        <Link to={`/login/familiar-paciente/${paciente.id}`}>
                            <img src={paciente.avatar} alt={`avatar de ${paciente.nome}`} />
                        </Link>
                        <p>{paciente.nome}</p>
                    </div>
                ))}
            </section>
            <section className="logout-section-tela-perfis">
                <Link to="/login">
                    <img src="/logout.png" alt="imagem de retornar para a tela de login" />
                </Link>
            </section>
            <img src="/neurolink-cadastrar-svg.svg" className="logo-canto-tela-de-perfil" alt="" />
        </main>
    )
}