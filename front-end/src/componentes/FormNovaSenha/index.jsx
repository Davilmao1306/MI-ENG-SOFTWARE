import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import './nova-senha.estilo.css'
import { useState } from "react";

export function FormNovaSenha({ uid, token }) {

    const [senha, setSenha] = useState("");
    const [senha2, setSenha2] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (senha !== senha2) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const response = await fetch("http://localhost:8000/login/auth/redefinir-senha", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    uid: uid,
                    token: token,
                    nova_senha: senha
                })
            });

            // O fetch não lança erro automaticamente em 404 ou 500, precisamos verificar o .ok
            if (!response.ok) {
                const errorData = await response.json(); // Tenta pegar mensagem do backend se houver
                throw new Error(errorData.detail || "Erro na requisição");
            }

            alert("Senha alterada com sucesso!");
            window.location.href = "/login";

        } catch (error) {
            alert("Erro ao alterar senha");
            console.error(error);
        }
    }

    return (
        <form className='form-recuperar-senha' onSubmit={handleSubmit}>
            <div className='campos-recuperar-senha'>
                {/* Certifique-se que CampoDeFormulario e CampoDeEntrada estão importados */}
                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='password'
                        placeholder='Nova Senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <CampoDeEntrada
                        type='password'
                        placeholder='Repita a nova senha'
                        value={senha2}
                        onChange={(e) => setSenha2(e.target.value)}
                    />
                </CampoDeFormulario>
            </div>

            <div className='acoes-nova-senha'>
                <button type="submit" className='confirmar-nova-senha'>
                    CONFIRMAR NOVA SENHA
                </button>
            </div>
        </form>
    );
}