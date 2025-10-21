import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './form-cadastrar-terapeuta.estilo.css'

export function FormCadastrarTerapeuta() {
    return (
        <form className='campos-cadastrar-terapeuta'>
            <div className='formulario-cadastrar-terapeuta'>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='text'
                        name='cadastrarNomeTerapeuta'
                        placeholder='Digite seu nome completo'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='email'
                        name='loginEmail'
                        placeholder='Digite seu email'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='date'
                        name='dataNascimentoTerapeuta'
                        placeholder='selecione sua data de nascimento'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='text'
                        name='CRP/CRM'
                        placeholder='CRP / CRM'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='tel'
                        name='telTerapeuta'
                        placeholder='(DD) XXXXX-XXXX'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='password'
                        name='firstPasswordTerapeuta'
                        placeholder='Digite seu senha'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='password'
                        name='passwordTerapeuta'
                        placeholder='Digite sua senha novamente'
                        required
                    />
                </CampoDeFormulario>
            </div>
            <div className='acoes-cadastrar-terapeuta'>
                <Botao type='submit'>Cadastrar Terapeuta</Botao>
            </div>

        </form>
    )
}