
import './Login.css'


function CampoDeFormulario({children}){
    return(
        <fieldset>
            {children}
        </fieldset>
    )
    
}
function Label({children, htmlFor}){
    return(
        <label htmlFor={htmlFor}>
            {children}
        </label>
    )
}
function CampoDeEntrada(props){
    return <input {...props} />
}
function FormLogin(){
    return(
        <form className='form-login'>
            <CampoDeFormulario>
                <Label htmlFor='email'>
                    Email
                </Label>
                <CampoDeEntrada
                    type='email'
                    name = 'loginEmail'
                    placeholder = 'Digite seu email'
                />
            </CampoDeFormulario>
            <CampoDeFormulario>
                <Label>
                    Senha
                </Label>
                <CampoDeEntrada 
                    type='password' 
                    name='userSenha' 
                    placeholder='Digite sua senha'
                />
            </CampoDeFormulario>
        </form>
    )
}
function Login(){
    return(
        <main>
            <header>
                <img src="/neurolink-login.png" alt="imagem do logo neurolink" />
            </header>
            <FormLogin/>
        </main>
    )
}
export default Login