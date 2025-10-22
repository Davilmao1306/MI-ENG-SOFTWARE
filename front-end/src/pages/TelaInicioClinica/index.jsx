import './tela-inicio-clinica.estilo.css'
import { Link } from 'react-router-dom'

import { FaArrowRight } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

export function TelaInicioClinica() {
    return (
        <main className='main-tela-inicio-clinica'>
            <header className='header-tela-inicio-clinica'>
                <h1>Olá Clínica</h1>

            </header>
            <section className='section-tela-inicio-clinica'>
                <div className='div-cadastrar-paciente'>
                    <Link to="/clinica/cadastrar-paciente">
                        <img src="/person.png" alt="icone de um boneco para simbolizar uma pessoa" />
                        <p>Cadastrar Paciente</p>
                    </Link>
                </div>
                <div className='div-cadastrar-familiar'>
                    <Link to="/clinica/cadastrar-familiar">
                        <img src="/person.png" alt=" icone de um boneco para simbolizar uma pessoa" />
                        <p>Cadastrar Familiar</p>
                    </Link>
                </div>
                <div className='div-cadastrar-terapeuta'>
                    <Link to="/clinica/cadastrar-terapeuta">
                        <img src="/person.png" alt=" icone de um boneco para simbolizar uma pessoa" />
                        <p>Cadastrar Terapeuta</p>
                    </Link>
                </div>
            </section>
            <section className='section-acessar-terapeutas'>
                <h2>Nossos Terapeutas <FaArrowRight style={{ fontSize: '15px' }} /></h2>
                <input type="search" placeholder='Buscar por nome, crp, crm' />
                <Link to="/clinica/lista-de-terapeutas">Ver todos os terapeutas <FaArrowRight style={{ fontSize: '10px' }} /> </Link>
            </section>
            <section className='img-tela-inicial-clinica'>
                <Link to="/login">
                    <img src="/logout.png" alt="" />
                </Link>
            </section>
        </main>
    )
}