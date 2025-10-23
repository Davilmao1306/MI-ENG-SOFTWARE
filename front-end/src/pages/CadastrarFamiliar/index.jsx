import './cadastrar-familiar.estilo.css'
import { FormCadastrarFamiliar } from '../../componentes/FormCadastrarFamiliar'
import { IconSair } from '../../componentes/IconSair'
import { IconVoltar } from '../../componentes/IconVoltar'

export function CadastrarFamiliar() {
    return (
        <main className='cadastar-familiar'>
            <header className="cadastrar-familiar-cabecalho">
                <div className='barra-lateral'>
                    <IconVoltar to='/clinica' />
                    <IconSair to='/login' />
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