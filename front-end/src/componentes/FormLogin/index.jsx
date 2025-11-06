import { Link, useNavigate } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada'
import { CampoDeFormulario } from '../CampoDeFormulario'
import { Label } from '../Label'
import { Botao } from '../Botao'
import './form-login.estilo.css'

export function FormLogin() {
    const navigate = useNavigate();

    async function dadosLogin(event) {
        event.preventDefault(); // evita recarregar a página

        const formData = new FormData(event.target);
        const dados = {
            login: formData.get('loginEmail'),
            senha: formData.get('userSenha'),
        };

        console.log("Enviando dados:", dados);

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });

            if (!response.ok) {
                throw new Error("Erro na requisição: " + response.status);
            }

            const data = await response.json();

            if (data.token) {
                // Armazena o token e informações do usuário
                localStorage.setItem("token", data.token);
                localStorage.setItem("tipoUsuario", data.usuario.tipo);

                alert("Login bem-sucedido!");

                // Redirecionamento com base no tipo de usuário
                switch (data.usuario.tipo) {
                    case "clinica":
                        navigate("/clinica");
                        break;
                    case "terapeuta":
                        navigate("/terapeuta");
                        break;
                    case "paciente":
                        navigate("/familiar");
                        break;
                    default:
                        navigate("/home");
                        break;
                }
            } else {
                alert(data.mensagem || "Usuário ou senha inválidos.");
            }

        } catch (error) {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao tentar fazer login.");
        }
    }
    return (
        <form className='form-login' onSubmit={dadosLogin}>
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
                <Botao type="submit">
                    LOGIN
                </Botao>
            </div>
            <Link to="/login/recuperar-senha" className="forgot-password-link">
                Esqueceu a senha?
            </Link>
        </form>
    )
}