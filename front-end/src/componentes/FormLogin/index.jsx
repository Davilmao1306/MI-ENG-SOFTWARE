import { Link, useNavigate } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import './form-login.estilo.css'

export function FormLogin() {
    const navigate = useNavigate()
    async function dadosLogin(event) {
        event.preventDefault(); // evita recarregar a página
        localStorage.removeItem("token");
        localStorage.removeItem("tipo");
        localStorage.removeItem("id_usuario");

        const formData = new FormData(event.target);
        const dados = {
            email: formData.get('loginEmail'),
            password: formData.get('userSenha'),
        };

        console.log("Enviando dados:", dados);

        try {
            const response = await fetch("http://127.0.0.1:8000/login/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });
            const data = await response.json();

            if (!response.ok) {
                console.error("Erro do backend:", data);
                const msgErro = Object.values(data).join(' ');
                alert(`Erro ao fazer login: ${msgErro}`);
                throw new Error("Erro na requisição: " + response.status);
            }

            if (data.access && data.tipo) {
                localStorage.setItem("token", data.access);
                localStorage.setItem("tipo", data.tipo);
                localStorage.setItem("id_usuario", data.id)
                console.log("Token salvo:", localStorage.getItem("token"));
            }

            if (data.tipo == 'C') {
                navigate('/clinica')
            } else if (data.tipo == 'T') {
                navigate('/terapeuta')
            } else {
                navigate('/familiar-perfil')
            }


        } catch (error) {
            console.error("Erro:", error.message);
            setErroLogin(error.message || "Usuário ou senha inválidos.");
        }
    }
    return (
        <form className='form-login' onSubmit={dadosLogin}>
            <div className='campos-login'>
                <CampoDeFormulario >
                    <Label htmlFor='Useremail' >
                    </Label>
                    <CampoDeEntrada
                        id='Useremail'
                        type='email'
                        name='loginEmail'
                        placeholder='Digite seu email'
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <Label htmlFor='userSenha'>
                    </Label>
                    <CampoDeEntrada
                        id='userSenha'
                        type='password'
                        name='userSenha'
                        placeholder='Digite sua senha'
                        required
                    />
                </CampoDeFormulario>
            </div>
            <div className='acoes-login'>
                <Botao type="submit">
                    LOGIN
                </Botao>
            </div>
            <Link to="/login/recuperar-senha" className="forgot-password-link">
                Esqueceu a senha?
            </Link>
        </form>
    )
}