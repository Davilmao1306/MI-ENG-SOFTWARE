import { Link } from 'react-router-dom';
import './lading-page.estilo.css'


export function LandingPage() {
    return (
        <main className='landing-page'>
            <header className='header'>
                <div >
                    <Link to="/" className='header-logo'>
                        <img src="/neurolink.png" alt="Logo da empresa" />
                    </Link>
                </div>

                <div className='header-nav'>
                    <div className='nav'>
                        <label for='menu'>
                            <img src="/Menu.png" alt="menu bar"/>
                        </label>
                        <input type='checkbox' id='menu' hidden />
                        <nav >
                            <ul className='list-links'>
                                <li> <Link to='/'>Inicio</Link></li>
                                <li> <Link to='/login'>Acessar conta</Link></li>
                                <li> <Link to='/'>Contato</Link></li>
                            </ul>
                        </nav>
                    </div>
                    <div className='nav-desktop-tablet'>
                        <p>Inicio</p>
                        <Link to="/login">
                            Acesse sua conta
                        </Link>
                    </div>

                </div>
            </header>

            <section className='section'>
                <div className='section-titulo'>
                    <div>
                        <h1>
                            Conectando Corações e Cultivando o Futuro
                        </h1>
                        <p>
                            Suporte especializado e os recursos que sua familia precisa, tudo isso em um só lugar
                        </p>
                    </div>
                    <img className='img-section-titulo' src="/imagemfamilia.png" alt="Imagem fictícia de uma pais e filhos brincando" />

                </div>
                <div className='section-subtitulo'>
                    <h3>
                        Sua jornada conosco em Três Passos Simples
                    </h3>
                    <div className='section-image'>
                        <div className='section-subimage1'>
                            <img src="/lupa-com-livro.png" alt="Imagem de um livro com uma lupa" />
                            <p>Treinamento Familiar de como preprar a Criança para Terapia</p>
                        </div>
                        <div className='section-subimage2'>
                            <img src="/baloes-com-cerebro.png" alt="Imagem de dois balões de dialogo e um deles tem um cérebro" />
                            <p>Entendendo os sinais do seu filho</p>
                        </div>
                        <div className='section-subimage3'>
                            <img src="/mao-com-plantas.png" alt="Imagem de uma mão com várias plantinhas" />
                            <p>Atividades Sensoriais para o Dia Dia</p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className='footer'>
                <div className='footer-info'>
                    <p>Sobre nós</p>
                    <p>Termos de uso</p>
                    <p>Privacidade de uso</p>
                </div>
                <div className='footer-contato'>
                    <p>neurolink contatos</p>
                    <p>DD X XXXX-XXXX</p>
                    <p>neurolinkadm@gmail.com</p>
                </div>
            </footer>
        </main>
    )
}


