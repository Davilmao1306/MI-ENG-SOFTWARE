import './recuperar-senha.estilo.css'
import { FormRecuperarSenha } from '../../componentes/FormRecuperarSenha'


export function RecuperarSenha() {
    return (
        <main className="Recuperar-senha">
            <header className='header-recuperar-senha'>
                <img src="/logo-recuperar-senha.png" alt="imagem do logo neurolink" />
            </header>
            <section className="form-recuperar-senha">
                <div>
                <h2>
                    Digite seu email abaixo
                    <p>para receber o link de recuperação para a sua conta</p>
                </h2>
                </div>
                <div>
                    <FormRecuperarSenha />
                </div>
            </section> 
            <section className='section-img-recuperar-senha'>
                <img
                    src="/internasaude-mental.png"
                    alt="Ilustração de cérebros"
                    className="background-brains-image"
                /> 
            </section>
        </main>
    )
}
