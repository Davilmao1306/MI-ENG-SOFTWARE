import './tela-inicio-clinica.estilo.css'
import { Link } from 'react-router-dom'

import { FaArrowRight } from "react-icons/fa";
import { BsPersonAdd } from "react-icons/bs";
import { PiSignOutBold } from 'react-icons/pi';
import { MdFamilyRestroom } from "react-icons/md";
import { MdPsychology } from "react-icons/md";
import { IconSair } from '../../componentes/IconSair';


export function TelaInicioClinica() {
    return (
        <main className='main-tela-inicio-clinica'>
            <header className='header-tela-inicio-clinica'>
                <h1>Olá Clínica</h1>
            </header>
            <section className='section-tela-inicio-clinica'>
                <div className='div-cadastrar-paciente'>
                    <Link to="/clinica/cadastrar-paciente">
                        <BsPersonAdd className='icon-cadastrar' />
                        <p>Cadastrar Paciente</p>
                    </Link>
                </div>
                <div className='div-cadastrar-familiar'>
                    <Link to="/clinica/cadastrar-familiar">
                        <MdFamilyRestroom className='icon-cadastrar' />
                        <p>Cadastrar Familiar</p>
                    </Link>
                </div>
                <div className='div-cadastrar-terapeuta'>
                    <Link to="/clinica/cadastrar-terapeuta"> 
                        <MdPsychology className='icon-cadastrar' />
                        <p>Cadastrar Terapeuta</p>
                    </Link>
                </div>
                <div className='div-acessar-terapeutas'>
                    <Link to="/clinica/lista-de-terapeutas">Ver todos os terapeutas <FaArrowRight style={{ fontSize: '10px' }} /> </Link>
                </div>
            </section>
            <section className='img-tela-inicial-clinica'>
                <IconSair to='/login' />
            </section>
            <img src="/neurolink-cadastrar-svg.svg" className="logo-canto-tela-inicio" alt="" />
        </main>
    )
}