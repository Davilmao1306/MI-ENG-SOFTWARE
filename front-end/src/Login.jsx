import { Link } from 'react-router-dom';
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
function FormLogin() {
  return (

    <form className='form-login'>
      <div className="input-group">
        <input 
          className="form-input" 
          type='email'
          name='loginEmail'
          placeholder='Email' 
        />
      </div>

      <div className="input-group">
        <input
          className="form-input" 
          type='password'
          name='userSenha'
          placeholder='Senha'
        />
      </div>

      <button type="login" className="login-button">
        LOGIN
      </button>

       <Link to="/recuperar-senha" className="forgot-password-link">
        Esqueceu a senha?
      </Link>

    </form>
  )
}
function Login(){
    return(
    
        <main className="login-page-container">
          <img 
              src="/internasaude-mental.png" 
              alt="Ilustração de cérebros" 
              className="background-brains-image" 
            />
        
            <header>
                <img src="/neurolink-login.png" alt="imagem do logo neurolink" />
            </header>
           
            <FormLogin/>
        </main>
    )
}

export default Login