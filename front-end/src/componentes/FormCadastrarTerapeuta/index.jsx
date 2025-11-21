import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './form-cadastrar-terapeuta.estilo.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IoEyeOff, IoEye } from "react-icons/io5";


const TIPO_TERPEUTA = 'T'
export function FormCadastrarTerapeuta() {
    const navigate = useNavigate();
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);

    // Função para alternar a visibilidade da senha
    const toggleMostrarSenha = () => {
        setMostrarSenha(prev => !prev);
    };

    async function dadosTerapeuta(event) {
        event.preventDefault();

        if (senha !== confirmaSenha) {
            console.log("As senhas não coincidem. Por favor, verifique.");
            return; // Impede o envio do formulário
        }
        const formData = new FormData(event.target);
        const dados = {
            nome: formData.get('cadastrarNomeTerapeuta'),
            email: formData.get('loginEmail'),
            data_nascimento: formData.get("dataNascimentoTerapeuta"),
            crp: formData.get('CRP/CRM'),
            telefone: formData.get('telTerapeuta'),
            senha: senha,
            especialidade: formData.get('especialidade'),
            tipo: TIPO_TERPEUTA
        }
        console.log("dados do terapeuta", dados)

        try {
            const response = await fetch("http://127.0.0.1:8000/cadastro/terapeutas", {
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
            console.log("Terapeuta cadastrado com sucesso:", data);
            alert(`Terapeuta cadastrado com sucesso! ID: ${data.id_terapeuta}`);
            navigate('/clinica')
        } catch (error) {
            console.error("Erro:", error);

            if (!error.message.includes("Erro na requisição")) {
                alert("Ocorreu um erro de rede ao tentar cadastrar Terapeuta.");
            }
        }
    }
    return (
        <form className='campos-cadastrar-terapeuta' onSubmit={dadosTerapeuta}>
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
                    <div style={{ position: 'relative' }}>
                        <CampoDeEntrada
                            type={mostrarSenha ? 'text' : 'password'}
                            name='firstPasswordTerapeuta'
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
                    <Label htmlFor="SenhaTerapeutarepetida"></Label>
                    <div style={{ position: 'relative' }}>
                        <CampoDeEntrada
                            type={mostrarSenha ? 'text' : 'password'}
                            name='secondPasswordTerapeuta'
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
                <CampoDeFormulario>
                    <Label htmlFor="Especialidade"></Label>
                    <CampoDeEntrada
                        type='text'
                        name='especialidade'
                        placeholder='Sua especialidade'
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