import './Login.css'


function Fieldset(props){
    return(
        <fieldset>
            
        </fieldset>
    )
    
}
function Label(props){}
function Input(props){}
function FormLogin(){
    return(
        <form className='form-login'>
            <fieldset>
                <label htmlFor='Email'>
                    Email
                </label>
                <input>
                </input>
            </fieldset>
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