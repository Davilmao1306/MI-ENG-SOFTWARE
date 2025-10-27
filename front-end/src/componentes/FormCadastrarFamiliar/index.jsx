import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Botao } from '../Botao'
import './form-cadastrar-familiar.estilo.css'

export function FormCadastrarFamiliar() {
    function dadosFamiliar(formData) {
        const dados = {
            nome: formData.get('cadastrarNomeFamiliar'),
            email: formData.get('loginEmail'),
            data: new Date(formData.get("dataNascimentoFamiliar")),
            parentesco: formData.get('grauParentescoFamiliar'),
            telefone: formData.get('telResponsavel'),
            senha: formData.get('firstPasswordFamiliar'),
            senharepiater: formData.get('passwordFamiliar'),
        }
        console.log("dados do familiar", dados)
    }
    return (
        <form className='campos-cadastrar-familiar' action={dadosFamiliar}>
            <div className='formulario-cadastrar-familiar'>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='text'
                        name='cadastrarNomeFamiliar'
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
                        name='dataNascimentoFamiliar'
                        placeholder='selecione sua data de nascimento'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='text'
                        name='grauParentescoFamiliar'
                        placeholder='Grau de parentesco'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='tel'
                        name='telResponsavel'
                        placeholder='(DD) XXXXX-XXXX'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='password'
                        name='firstPasswordFamiliar'
                        placeholder='Digite seu senha'
                        required
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='password'
                        name='passwordFamiliar'
                        placeholder='Digite sua senha novamente'
                        required
                    />
                </CampoDeFormulario>
            </div>
            <div className='acoes-cadastrar-familiar'>
                <Botao type='submit'>Cadastrar Familiar</Botao>
            </div>

        </form>
    )
}