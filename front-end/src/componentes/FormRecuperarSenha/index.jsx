import { Link } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './recuperar-senha.estilo.css'

export function FormRecuperarSenha() {
    return (
        <form className='form-recuperar-senha'>
            <div className='campos-recuperar-senha'>
                <CampoDeFormulario >
                    <Label htmlFor='Useremail' >
                    </Label>
                    <CampoDeEntrada
                        type='email'
                        name='loginEmail'
                        placeholder='Digite seu email'
                    />
                </CampoDeFormulario>
            </div>
            <div className='acoes-recuperar-senha'>
                <Link to="/login/recuperar-senha/nova-senha" className='link-continuar-nova-senha'>
                    <Botao>
                        CONTINUAR
                    </Botao>
                </Link>
                <Link to="/login" className='link-voltar-login'>
                    <Botao>
                        VOLTAR
                    </Botao>
                </Link>
            </div>
        </form>
    )
}