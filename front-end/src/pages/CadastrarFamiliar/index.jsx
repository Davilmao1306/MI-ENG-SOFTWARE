
import './cadastrar-familiar.estilo.css'
import { FormCadastrarFamiliar } from '../../componentes/FormCadastrarFamiliar'
import { IconVoltar } from '../../componentes/IconVoltar'
import { Link } from 'react-router-dom'
import { Sidebar } from '../../componentes/Sidebar'

export function CadastrarFamiliar() {

    return (
        <main className='cadastar-familiar'>
            <header className="cadastrar-familiar-cabecalho">
                <h1>Olá Clínica, Cadastre o familiar!</h1> 
                <Sidebar>
                    <IconVoltar to={'/clinica/lista-de-familiares'} />
                </Sidebar>
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