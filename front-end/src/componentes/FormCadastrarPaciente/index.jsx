import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Botao } from '../Botao'
import './form-cadastrar-paciente.estilo.css'

export function FormCadastrarPaciente() {
    function dadosPaciente(formData) {
        const dados = {
            nome: formData.get('cadastrarNomePaciente'),
            cpf: formData.get('cpfPaciente'),
            data: new Date(formData.get("dataNascimentoPaciente")),
            telefone: formData.get('telResponsavelPaciente'),
            genero: formData.get('genero')
        }
        console.log("dados do paciente", dados)
    }
    return (
        <form className='campos-cadastrar-paciente' action={dadosPaciente}>
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
                    <select className='lista-suspensa' id='genero' defaultValue="" name='genero'>
                        <option value="" disabled>Selecione</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                    </select>
                </CampoDeFormulario>
                
            </div>
            <div className='acoes-cadastrar-paciente'>
                <Botao type='submit'>Cadastrar Paciente</Botao>
            </div>

        </form>
    )
}