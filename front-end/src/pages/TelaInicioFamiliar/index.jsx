import './tela-inicio-familiar.estilo.css'
import { Link, useParams } from 'react-router-dom';
import { IconVoltar } from '../../componentes/IconVoltar'
import { IconSair } from '../../componentes/IconSair'
import { IoBookOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";



export function TelaInicioFamiliar() {
    const { id_paciente } = useParams();
    
    return (
        <main>
            <header className='header-tela-inicio-familiar'>
                <div className='um'>
                    <IconVoltar to='/familiar-perfil' />
                    <IconSair to='/login' />
                </div>
                <div className='dois'>
                    <Link to={`/${id_paciente}/plano-terapeutico-familiar`} className='img-diario-tela-inicio-familiar'>
                        <FiMessageSquare style={{ fontSize: "30px" }} />
                        Plano terapeutico
                    </Link>
                    <Link to={`/${id_paciente}/diario-compartilhado-familiar`} className='img-plano-tela-inicio-familiar'>
                        <IoBookOutline style={{ fontSize: "30px" }} />
                        Diario terapeutico

                    </Link>
                </div>
            </header>
            <section className='section-tela-inicio-familiar'>
                <div className='section-top'>
                    <h1>Olá, Usuário</h1>
                    <div className='div-sectio-top-tela-inicio-familiar'>
                        <Link to="/"><IoMdNotificationsOutline style={{ fontSize: "45px" }} /></Link>
                        <Link to="/perfil-familiar"><RxAvatar style={{ fontSize: "45px", background: "#93D9FA", color: "#000000", borderRadius: "100px" }} /></Link>
                    </div>
                </div>
                <div className='section-bottom'>
                    <Link to={`/${id_paciente}/diario-compartilhado-familiar`}>
                        <IoBookOutline style={{ fontSize: "50px" }} />
                        Diário compartilhado
                    </Link>
                    <Link to={`/${id_paciente}/plano-terapeutico-familiar`}  >
                        <FiMessageSquare style={{ fontSize: "50px" }} />
                        Plano terapeutico
                    </Link>
                </div>
                <img src="/neurolink-cadastrar-svg.svg" className="logo-canto-tela-inicio" alt="" />
            </section>

        </main>
    )
}