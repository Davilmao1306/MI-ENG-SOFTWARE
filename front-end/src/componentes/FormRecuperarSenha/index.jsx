import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './form-recuperar-senha.estilo.css'
import { useState } from 'react';

export function FormRecuperarSenha() {
    const [email, setEmail] = useState("")

    const enviarEmail = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/login/auth/esqueci-senha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        if (res.ok) {
            alert('Verifique seu e-mail (ou o terminal do backend se estiver em teste).');
        } else {
            alert('Erro ao solicitar.');
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