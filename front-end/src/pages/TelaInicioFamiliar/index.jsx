import './tela-inicio-familiar.estilo.css'
import { Link } from 'react-router-dom';

export function TelaInicioFamiliar() {
    return (
        <main>
            <header className='header-tela-inicio-familiar'>
                <div className='um'>
                    <Link to="/" className='img-voltar-tela-inicio-familiar'>
                        <img src="/rowback.png" alt="imagem de voltar" />
                    </Link>
                    <Link to="/" className='img-sair-tela-inicio-familiar'>
                        <img src="/logout.png" alt="imagem de sair para o inicio do site" />
                    </Link>
                </div>
                <div className='dois'>
                    <Link to="/" className='img-diario-tela-inicio-familiar'>
                        <img src="/livro-plano-30px.png" alt="imagem de acessar o diario compartilhado" />
                        Plano terapeutico
                    </Link>
                    <Link to="/" className='img-plano-tela-inicio-familiar'>
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
                    <Link to="/plano-terapeutico-familiar" >
                        <img src="/livro-plano-50px.png" alt="" />
                        Diário compartilhado
                    </Link>
                    <Link to="/diario-compartilhado-familiar" >
                        <img src="/icone-diario-50px.png" alt="" />
                        Plano terapeutico
                    </Link>
                </div>
                <img src="/neurolink-cadastrar-svg.svg" className="logo-canto-tela-inicio" alt="" />
            </section>

        </main>
    )
}