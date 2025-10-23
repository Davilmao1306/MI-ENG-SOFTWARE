import './tela-inicio-familiar.estilo.css'
import { Link } from 'react-router-dom';
import { IconVoltar } from '../../componentes/IconVoltar'
import { IconSair } from '../../componentes/IconSair'

export function TelaInicioFamiliar() {
    return (
        <main>
            <header className='header-tela-inicio-familiar'>
                <div className='um'>
                    <IconVoltar to='/login/familiar-perfis' />
                    <IconSair to='/login'/>
                </div>
                <div className='dois'>
                    <Link to="/plano-terapeutico-familiar" className='img-diario-tela-inicio-familiar'>
                        <img src="/livro-plano-30px.png" alt="imagem de acessar o diario compartilhado" />
                        Plano terapeutico
                    </Link>
                    <Link to="/diario-compartilhado-familiar" className='img-plano-tela-inicio-familiar'>
                        <img src="/icone-diario-30px.png" alt="imagem de acessar o plano terapeutico" />Diário compartilhado
                    </Link>
                </div>
            </header>
            <section className='section-tela-inicio-familiar'>
                <div className='section-top'>
                    <h1>Olá, Usuário</h1>
                    <div className='div-sectio-top-tela-inicio-familiar'>
                        <Link to="/"><img src="/notifications.jpg" alt="imagem de acessar o plano terapeutico" /></Link>
                        <Link to="/"><img src="/avatar.jpg" alt="imagem de acessar o diario compartilhado" /></Link>
                    </div>
                </div>
                <div className='section-bottom'>
                    <Link to="/diario-compartilhado-familiar" >
                        <img src="/livro-plano-50px.png" alt="" />
                        Diário compartilhado
                    </Link>
                    <Link to="/plano-terapeutico-familiar" >
                        <img src="/icone-diario-50px.png" alt="" />
                        Plano terapeutico
                    </Link>
                </div>
                <img src="/neurolink-cadastrar-svg.svg" className="logo-canto-tela-inicio" alt="" />
            </section>

        </main>
    )
}