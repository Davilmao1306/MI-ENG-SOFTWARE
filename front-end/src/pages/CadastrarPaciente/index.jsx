import './cadastrar-paciente.estilo.css'
import { FormCadastrarPaciente } from '../../componentes/FormCadastrarPaciente'
import { Link } from 'react-router-dom'

export function CadastrarPaciente() {
  return (
    <main className='cadastar-paciente'>
      <header className="cadastrar-paciente-cabecalho">
        <div className='barra-lateral'>
          <img src="/rowback.png" alt="" className='img-voltar' />

          <Link to='/login'>
            <img src="/sair.png" alt="" className='img-sair' />
          </Link>
        </div>
        <h1>Olá Clínica,<br></br> Cadastre o Paciente!</h1>

      </header>
      <section className='form-cadastrar-paciente'>
        <FormCadastrarPaciente />
      </section>
      <section className='imagem-neurolink'>
        <img src="/neurolink-cadastrar-svg.svg" alt="" />
      </section>


    </main>
  )
}