import React, { useState } from "react";
import { CampoDeEntrada } from "../CampoDeEntrada";
import { CampoDeFormulario } from "../CampoDeFormulario";
import { Botao } from "../Botao";
import { Link, useNavigate } from "react-router-dom";
import "./estilo.css";

export function FormLogin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();
    
    const onSubmit = async (e) => {
        e.preventDefault(); // impede envio pela URL
        console.log("Submeteu formulário");

        const dadosLogin = { email, senha };
        console.log("Dados capturados:", dadosLogin);

        // exemplo de envio seguro via POST
        /*
        try {
            const resposta = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosLogin),
            });

            const data = await resposta.json();
            console.log("Resposta:", data);
        } catch (erro) {
            console.error("Erro ao logar:", erro);
        }
        */
        navigate('/clinica')
    };

    return (
        <form onSubmit={onSubmit} className="form-login">
            <div className="campos-login">
                <CampoDeFormulario>
                    <label htmlFor="loginEmail">Email</label>
                    <CampoDeEntrada
                        type="email"
                        id="loginEmail"
                        name="loginEmail"
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <label htmlFor="userSenha">Senha</label>
                    <CampoDeEntrada
                        type="password"
                        id="userSenha"
                        name="userSenha"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </CampoDeFormulario>
            </div>

            <div className="acoes-login">
                <Botao type="submit">LOGIN</Botao>
            </div>

            <Link to="/login/recuperar-senha" className="forgot-password-link">
                Esqueceu a senha?
            </Link>
        </form>
    );
}
