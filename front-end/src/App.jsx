import './App.css'
import { Link } from 'react-router-dom';

function App() {
  return (
    <main>
      <header>
        <div className='header-logo'>
          <img src="/neurolink.png" alt="Logo da empresa" />
        </div>
        <div className='header-nav'>
          <nav className='nav'>
            <p>Inicio</p>
          </nav>
          <Link to="/login">
            Acesse sua conta
          </Link>
        </div>
      </header>
      
      <section>
        <div className='section-titulo'>
          <div className='section-texto'>
            <div className='section-h1'>
              <h1>
                Conectando Corações e Cultivando o Futuro
              </h1>
            </div>
            <div className='section-p'>
              <p>
                Suporte especializado e os recursos que sua familia precisa, tudo isso em um só lugar
              </p>
            </div>
          </div>
          <div className='section-img'>
            <img src="/imagemfamilia.png" alt="Imagem fictícia de uma pais e filhos brincando"/>
          </div>
        </div>
        
        <div className='section-subtitulo'>
          <div className='section-texto2'>
            <h3>
              Sua jornada conosco em Três Passos Simples
            </h3>
          </div>
          <div className='section-image'>
            <div className='section-subimage1'>
              <img src="/lupa-com-livro.png" alt="Imagem de um livro com uma lupa" />
              <figcaption>Treinamento Familiar de como preprar a Criança para Terapia</figcaption>
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

export default App
