import { ListaPacientes } from '../../componentes/ExibeLista'
import './acessar-pacientes.estilo.css'
import { BsPersonCircle } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router";
import { useExibirListas } from '../../hooks/useExibirListas';

export function AcessarPacientes() {
    const terapeutas = useExibirListas("http://localhost:8000/cadastro/lista-terapeutas")
    const id = localStorage.getItem("id_usuario");

    // Tem que fazer isso para dar tempo dos dados chegarem a lista de terapeutas
    if (!Array.isArray(terapeutas) || terapeutas.length === 0) {
        return;
    }

    const terapeutaAuth = terapeutas.find(t => String(t.id_usuario) === String(id));
    return (
        <main className='tela-exibe-pacientes'>
            <header className='header-acessar-pacientes'>
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
            <section className='section-exibe-pacientes'>
                <Link to='/terapeuta'>
                    <ArrowLeft className='voltar-tela-pacientes' />
                </Link>
                <div className='div-titulos'>
                    <h2>Meus Pacientes</h2>
                </div>
                <div>
                    <ListaPacientes />
                </div>
            </section>

        </main>
    )
}