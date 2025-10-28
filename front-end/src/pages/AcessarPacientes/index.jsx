import { ListaPacientes } from '../../componentes/ExibeLista'
import './acessar-pacientes.estilo.css'
import { BsPersonCircle } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router";
export function AcessarPacientes() {
    return (
        <main className='tela-exibe-pacientes'>
            <header className='header-acessar-pacientes'>
                <div className='div-img-nome'>
                    <img src="/logo-terapeuta.png" alt="" />
                    <p>Rodrigo Tripodi</p>

                </div>
                <div>
                    <IoMdNotificationsOutline fontSize={"40px"} color='#000000' />
                    <BsPersonCircle fontSize={"40px"} color='#000000' />
                </div>
            </header>
            <section className='section-exibe-pacientes'>
                <Link to = '/terapeuta'>
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