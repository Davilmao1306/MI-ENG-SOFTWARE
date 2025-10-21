import './cadastrar-familiar.estilo.css'
import { FormCadastrarFamiliar } from '../../componentes/FormCadastrarFamiliar'
import { Link } from 'react-router-dom'

export function CadastrarFamiliar() {
    return (
        <main className='cadastar-familiar'>
            <header className="cadastrar-familiar-cabecalho">
                <div className='barra-lateral'>
                    <img src="/rowback.png" alt="" className='img-voltar' />
                    
                    <img src="/sair.png" alt="" className='img-sair' />
                    
                </div>
                <h1>Olá Clínica,<br></br> Cadastre o familiar!</h1>

            </header>
            <section className='form-cadastrar-familiar'>
                <FormCadastrarFamiliar />
            </section>
            <section className='imagem-neurolink'>
                <img src="/neurolink-cadastro.png" alt="" />
            </section>


        </main>
    )
}