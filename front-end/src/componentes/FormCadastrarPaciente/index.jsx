import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Botao } from '../Botao'
import './form-cadastrar-paciente.estilo.css'

export function FormCadastrarPaciente() {
    async function dadosPaciente(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const dados = {
            nome: formData.get('cadastrarNomePaciente'),
            cpf: formData.get('cpfPaciente'),
            data_nascimento: formData.get("dataNascimentoPaciente"),
            telefone: formData.get('telResponsavelPaciente'),
            genero: formData.get('genero')
        }
        console.log("dados do paciente", dados)

        try {
            const response = await fetch("http://127.0.0.1:8000/cadastro/pacientes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });

            if (!response.ok) {
                const erroData = await response.json();
                console.error("Erro do backend:", erroData);
                const msgErro = Object.values(erroData).join(' ');
                alert(`Erro ao cadastrar: ${msgErro}`);
                throw new Error("Erro na requisição: " + response.status);
            }
            const data = await response.json();
            console.log("Paciente cadastrado com sucesso:", data);
            alert(`Paciente cadastrado com sucesso! ID: ${data.id_paciente}`);
        } catch (error) {
            console.error("Erro:", error);

            if (!error.message.includes("Erro na requisição")) {
                alert("Ocorreu um erro de rede ao tentar cadastrar paciente.");
            }
        }
    }
    return (
        <form className='campos-cadastrar-paciente' onSubmit={dadosPaciente}>
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