import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './nova-senha.estilo.css'

export function FormNovaSenha() {
    return (
        <form className='form-recuperar-senha'>
            <div className='campos-recuperar-senha'>
                <CampoDeFormulario>
                    <Label htmlFor='userNewSenha'>
                    </Label>
                    <CampoDeEntrada
                        type='password'
                        name='userSenha'
                        placeholder='Nova Senha'
                    />
                </CampoDeFormulario>
                <CampoDeFormulario>
                    <Label htmlFor='userNewRepeatSenha'>
                    </Label>
                    <CampoDeEntrada
                        type='password'
                        name='userSenha'
                        placeholder='Sua nova senha novamente'
                    />
                </CampoDeFormulario>
            </div>
            <div className='acoes-nova-senha'>
                <Link to="/login" className='link-login-nova-senha'>
                    <Botao className='confirmar-nova-senha'>
                        CONFIRMAR NOVA SENHA
                    </Botao>
                </Link>
            </div>
        </form>
    )
}