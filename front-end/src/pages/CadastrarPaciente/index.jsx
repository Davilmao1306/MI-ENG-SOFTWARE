import './cadastrar-paciente.estilo.css'
import { FormCadastrarPaciente } from '../../componentes/FormCadastrarPaciente'

import {IconSair} from '../../componentes/IconSair'
import {IconVoltar} from '../../componentes/IconVoltar'

export function CadastrarPaciente() {
  return (
    <main className='cadastar-paciente'>
      <header className="cadastrar-paciente-cabecalho">
        <div className='barra-lateral'>
          <IconVoltar to='/pacientes'/>
          <IconSair to='/login'/>
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