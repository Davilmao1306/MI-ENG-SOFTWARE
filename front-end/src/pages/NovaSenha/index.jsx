import './nova-senha.estilo.css';
import { FormNovaSenha } from '../../componentes/FormNovaSenha';

export function NovaSenha() {
    return (
        <main className="Nova-senha">
            <header className='header-nova-senha'>
                <img src="/logo-recuperar-senha.png" alt="imagem do logo neurolink" />
            </header>
            <section className="form-nova-senha">
                <div>
                    <h3>
                        Por favor, digite a nova senha para sua conta.
                    </h3>
                </div>
                <div>
                    <FormNovaSenha />
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