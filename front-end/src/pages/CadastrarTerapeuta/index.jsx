import './cadastrar-terapeuta.estilo.css'
import { FormCadastrarTerapeuta } from '../../componentes/FormCadastrarTerapeuta'
import { Link } from 'react-router-dom'
import { PiSignOutBold } from 'react-icons/pi'
import { IoArrowBack } from 'react-icons/io5';

export function CadastrarTerapeuta() {
    return (
        <main className='cadastar-terapeuta'>
            <header className="cadastrar-terapeuta-cabecalho">
                <div className='barra-lateral'>
                    <Link to="/clinica" className="icon-voltar">
                        <IoArrowBack  />
                    </Link>
                    
                    <Link to='/login' className='icon-sair'>
                        <PiSignOutBold  /> Sair
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