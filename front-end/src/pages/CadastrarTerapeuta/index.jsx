import './cadastrar-terapeuta.estilo.css'
import { FormCadastrarTerapeuta } from '../../componentes/FormCadastrarTerapeuta'
import { Link } from 'react-router-dom'
export function CadastrarTerapeuta() {
    return (
        <main className='cadastar-terapeuta'>
            <header className="cadastrar-terapeuta-cabecalho">
                <div className='barra-lateral'>
                    <img src="/rowback.png" alt="" className='img-voltar' />
                    <Link to='/login'>
                        <img src="/sair.png" alt="" className='img-sair' />
                    </Link>
                </div>
                <h1>Olá Clínica,<br></br> Cadastre o Terapeuta!</h1>

            </header>
            <section className='form-cadastrar-terapeuta'>
                <FormCadastrarTerapeuta />
            </section>
            <section className='imagem-neurolink'>
                <img src="/neurolink-cadastro.png" alt="" />
            </section>
        </main>
    )
}