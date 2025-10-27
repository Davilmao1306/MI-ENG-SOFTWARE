import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './form-login.estilo.css'

export function FormLogin() {
    function dadosLogin(formData) {
        console.log("Fazendo login", formData)
        const dados = {
            login: formData.get('loginEmail'),
            senha: formData.get('userSenha')
        }
        console.log("Esses são os dados", dados)
    }
    return (
        <form className='form-login' action={dadosLogin}>
            <div className='campos-login'>
                <CampoDeFormulario >
                    <Label htmlFor='Useremail' >
                    </Label>
                    <CampoDeEntrada
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
                        type='password'
                        name='userSenha'
                        placeholder='Digite sua senha'
                        required
                    />
                </CampoDeFormulario>
            </div>
            <div className='acoes-login'>
                <Botao tipo="submit">
                    LOGIN
                </Botao>
            </div>
            <Link to="/login/recuperar-senha" className="forgot-password-link">
                Esqueceu a senha?
            </Link>
        </form>
    )
}