import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Botao } from '../Botao'
import './form-cadastrar-paciente.estilo.css'

export function FormCadastrarPaciente() {
    return (
        <form className='campos-cadastrar-paciente'>
            <div className='formulario-cadastrar-paciente'>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='text'
                        name='cadastrarNomePaciente'
                        placeholder='Digite seu nome completo'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='text'
                        name='cpfPaciente'
                        placeholder='CPF'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='date'
                        name='dataNascimentoPaciente'
                        placeholder='selecione sua data de nascimento'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='tel'
                        name='telResponsavelPaciente'
                        placeholder='Telefone do responsável (DD) XXXXX-XXXX'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='text'
                        name='sexoPaciente'
                        placeholder='Digite seu sexo'
                        required
                    />
                </CampoDeFormulario>
                
            </div>
            <div className='acoes-cadastrar-paciente'>
                <Botao type='submit'>Cadastrar Paciente</Botao>
            </div>

        </form>
    )
}