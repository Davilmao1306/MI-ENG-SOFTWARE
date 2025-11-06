import './login-estilos.css'
import { FormLogin } from '../../componentes/FormLogin'

export function Login() {
    return (
        <main className="login-page-container">
            <header>
                <img src="/neurolink-login.png" alt="imagem do logo neurolink" />
            </header>
            <section className='image-section-login'>
                <img
                    src="/internasaude-mental.png"
                    alt="Ilustração de cérebros"
                    className="background-brains-image"
                />
            </section>
            <FormLogin />
        </main>
    )
}

