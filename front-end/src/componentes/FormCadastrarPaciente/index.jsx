import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Botao } from '../Botao'
import './form-cadastrar-paciente.estilo.css'
import { useState } from 'react';
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';

export function FormCadastrarPaciente() {
    function validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, "");
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
        let digito1 = (soma * 10) % 11;
        if (digito1 === 10) digito1 = 0;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
        let digito2 = (soma * 10) % 11;
        if (digito2 === 10) digito2 = 0;

        return cpf.endsWith(`${digito1}${digito2}`);
    }

    const [erroCpf, setErroCpf] = useState('');
    const navigate = useNavigate();
    async function dadosPaciente(event) {


        event.preventDefault();
        const formData = new FormData(event.target);


        if (!validarCPF(formData.get('cpfPaciente'))) {
            setErroCpf("CPF inválido. Verifique e tente novamente.");
            return;
        } else {
            setErroCpf(""); // limpa o erro se estiver tudo certo
        }
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
            navigate("/clinica")
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
                        as={InputMask}
                        mask="999.999.999-99"
                        type='text'
                        name='cpfPaciente'
                        placeholder='CPF'
                        required
                        onChange={(e) => {
                            if (erroCpf) setErroCpf('');
                        }}
                    />
                    {erroCpf && <p style={{ color: 'red', fontSize: '0.9rem' }}>{erroCpf}</p>}
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