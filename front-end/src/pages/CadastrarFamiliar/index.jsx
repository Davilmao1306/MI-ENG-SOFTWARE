
import './cadastrar-familiar.estilo.css'
import { FormCadastrarFamiliar } from '../../componentes/FormCadastrarFamiliar'
import { IconVoltar } from '../../componentes/IconVoltar'
import { Link } from 'react-router-dom'

export function CadastrarFamiliar() {

    return (
        <main className='cadastar-familiar'>
            <header className="cadastrar-familiar-cabecalho">
                <h1>Olá Clínica, Cadastre o familiar!</h1>
                <div className='barra-lateral'>
                    <IconVoltar to={'/clinica/lista-de-familiares'} />
                </div>
            </header>
            <section className='form-cadastrar-familiar'>
                <FormCadastrarFamiliar />
            </section>
            <section className='imagem-neurolink'>
                <img src="/neurolink-cadastro.png" alt="Logo Neurolink" />
            </section>
        </main>
    )
}