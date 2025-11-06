import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './form-recuperar-senha.estilo.css'
import { useState } from 'react';

export function FormRecuperarSenha() {
    const [email, setEmail] = useState("")

    const enviarEmail = async (event) => {
        event.preventDefault()
        try {
            const resposta = await fetch("endpoint que irá ser criado", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })
            if (!resposta.ok) {
                alert("Email não encontrado ou erro no servidor.")
                return
            }
            alert("Se o email existir, enviaremos um link de recuperação!")
        } catch (erro) {
            console.error(erro)
            alert("Erro ao enviar solicitação. Tente novamente.")
        }
    }
    return (
        <form className='form-recuperar-senha'>
            <div className='campos-recuperar-senha'>
                <CampoDeFormulario >
                    <Label htmlFor='Useremail' >
                    </Label>
                    <CampoDeEntrada
                        type='email'
                        name='email'
                        placeholder='Digite seu email'
                        onChange={e => setEmail(e.target.value)}
                    />
                </CampoDeFormulario>
            </div>
            <div className='acoes-recuperar-senha'>
                <Botao onClick={enviarEmail}>
                    CONTINUAR
                </Botao>
                <Link to="/login" className='link-voltar-login'>
                    <Botao>
                        VOLTAR
                    </Botao>
                </Link>
            </div>
        </form>
    )
}