import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Botao } from '../Botao'
import './form-cadastrar-familiar.estilo.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoEyeOff } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';
import { Label } from './../Label/index';
const TIPO_FAMILIAR = 'F'

export function FormCadastrarFamiliar() {
    const navigate = useNavigate();
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    // Função para alternar a visibilidade da senha
    const toggleMostrarSenha = () => {
        setMostrarSenha(prev => !prev);
    };

    async function dadosFamiliar(event) {
        event.preventDefault();

        if (senha !== confirmaSenha) {
            console.log("As senhas não coincidem. Por favor, verifique.");
            return;
        }

        const formData = new FormData(event.target);
        const dados = {
            nome: formData.get('cadastrarNomeFamiliar'),
            email: formData.get('loginEmail'),
            data_nascimento: formData.get("dataNascimentoFamiliar"),
            cpf: formData.get('cpfFamiliar'),
            telefone: formData.get('telResponsavel'),
            senha: senha,
            tipo: TIPO_FAMILIAR
        }
        console.log("dados do familiar", dados)

        try {
            const response = await fetch("http://127.0.0.1:8000/cadastro/familiares", {
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
            console.log("Familiar cadastrado com sucesso:", data);
            alert(`Familiar cadastrado com sucesso! ID: ${data.id_familiar}`);
            navigate('/clinica')
        } catch (error) {
            console.error("Erro:", error);

            if (!error.message.includes("Erro na requisição")) {
                alert("Ocorreu um erro de rede ao tentar cadastrar familiar.");
            }
        }
    }
    return (
        <form className='campos-cadastrar-familiar' onSubmit={dadosFamiliar}>
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
                        name='cpfFamiliar'
                        placeholder='CPF'
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
                    <Label htmlFor="SenhaFamiliar"></Label>
                    <div style={{ position: 'relative' }}>
                        <CampoDeEntrada
                            type={mostrarSenha ? 'text' : 'password'}
                            name='firstPasswordFamiliar'
                            placeholder='Digite seu senha'
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleMostrarSenha}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                            {mostrarSenha ? <IoEyeOff /> : <IoEye />}
                        </button>
                    </div>
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <Label htmlFor="SenhaFamiliarRepetida"></Label>
                    <div style={{ position: 'relative' }}>
                        <CampoDeEntrada
                            type={mostrarSenha ? 'text' : 'password'}
                            name='PasswordFamiliarRepetida'
                            placeholder='Digite seu senha novamente'
                            required
                            value={confirmaSenha}
                            onChange={(e) => setConfirmaSenha(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={toggleMostrarSenha}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                        >
                            {mostrarSenha ? <IoEyeOff /> : <IoEye />}
                        </button>
                    </div>
                </CampoDeFormulario>
            </div >
            <div className='acoes-cadastrar-familiar'>
                <Botao type='submit'>Cadastrar Familiar</Botao>
            </div>

        </form >
    )
}