import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './form-login.estilo.css'

export function FormLogin() {
    return (
        <form className='form-login'>
            <div className='campos-login'>
                <CampoDeFormulario >
                    <Label htmlFor='Useremail' >
                    </Label>
                    <CampoDeEntrada
                        type='email'
                        name='loginEmail'
                        placeholder='Digite seu email'
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <Label htmlFor='userSenha'>
                    </Label>
                    <CampoDeEntrada
                        type='password'
                        name='userSenha'
                        placeholder='Digite sua senha'
                    />
                </CampoDeFormulario>
            </div>
            <div className='acoes-login'>
                <Botao>
                    LOGIN
                </Botao>
            </div>
            <Link to="/login/recuperar-senha" className="forgot-password-link">
                Esqueceu a senha?
            </Link>
        </form>
    )
}