import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './form-cadastrar-terapeuta.estilo.css'

export function FormCadastrarTerapeuta() {
    function dadosTerapeuta(formData) {
        const dados = {
            nome: formData.get('cadastrarNomeTerapeuta'),
            email: formData.get('loginEmail'),
            data: new Date(formData.get("dataNascimentoTerapeuta")),
            registro: formData.get('CRP/CRM'),
            telefone: formData.get('telTerapeuta'),
            senha: formData.get('firstPasswordTerapeuta'),
            senharepiater: formData.get('passwordTerapeuta'),
        }
        console.log("dados do terapeuta", dados)
    }
    return (
        <form className='campos-cadastrar-terapeuta' action={dadosTerapeuta}>
            <div className='formulario-cadastrar-terapeuta'>
                <CampoDeFormulario>
                    <Label htmlFor="NomeTerapeuta"></Label>
                    <CampoDeEntrada
                        type='text'
                        name='cadastrarNomeTerapeuta'
                        placeholder='Digite seu nome completo'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <Label htmlFor="EmailTerapeuta"></Label>
                    <CampoDeEntrada
                        type='email'
                        name='loginEmail'
                        placeholder='Digite seu email'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <Label htmlFor="DataNascimentoTerapeuta"></Label>
                    <CampoDeEntrada
                        type='date'
                        name='dataNascimentoTerapeuta'
                        placeholder='selecione sua data de nascimento'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <Label htmlFor="CRP/CRMTerapeuta"></Label>
                    <CampoDeEntrada
                        type='text'
                        name='CRP/CRM'
                        placeholder='CRP / CRM'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <Label htmlFor="TelefoneTerapeuta"></Label>
                    <CampoDeEntrada
                        type='tel'
                        name='telTerapeuta'
                        placeholder='(DD) XXXXX-XXXX'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <Label htmlFor="SenhaTerapeuta"></Label>
                    <CampoDeEntrada
                        type='password'
                        name='firstPasswordTerapeuta'
                        placeholder='Digite seu senha'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <Label htmlFor="SenhaTerapeuta"></Label>
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