// src/componentes/FormLogin/index.jsx
import { Link, useNavigate } from 'react-router-dom';
import { CampoDeEntrada } from '../CampoDeEntrada';
import { CampoDeFormulario } from '../CampoDeFormulario';
import { Label } from '../Label';
import { Botao } from '../Botao';
import { useState } from 'react';
import Consent from '../Consentimento';
import './form-login.estilo.css';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export function FormLogin() {
  const navigate = useNavigate();

  // estados do formulário
  const [erroLogin, setErroLogin] = useState('');
  // estados para o consentimento
  const [showConsent, setShowConsent] = useState(false);
  const [loginData, setLoginData] = useState(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const toggleMostrarSenha = () => {
    setMostrarSenha(prev => !prev);
  };

  async function dadosLogin(event) {
    event.preventDefault(); // evita recarregar a página
    localStorage.removeItem("token");
    localStorage.removeItem("tipo");
    localStorage.removeItem("id_usuario");
    setErroLogin('');

    const formData = new FormData(event.target);
    const dados = {
      email: formData.get('loginEmail'),
      password: formData.get('userSenha'),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/login/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro do backend:", data);
        const msgErro = typeof data === 'object' ? Object.values(data).join(' ') : (data || 'Erro no login');
        alert(`Erro ao fazer login: ${msgErro}`);
        throw new Error("Erro na requisição: " + response.status);
      }

      // Salva token e infos se vierem
      if (data.access && data.tipo) {
        localStorage.setItem("token", data.access);
        localStorage.setItem("tipo", data.tipo);
        localStorage.setItem("id_usuario", data.id || data.userId || '');
      }

      // Se for clínica, navega direto (não mostra consentimento)
      if (data.tipo === 'C') {
        navigate('/clinica');
        return;
      }

      // Detecta se é "primeiro acesso" —  a nomes diferentes que o backend possa usar
      // (ex.: primeiro_acesso, primeiroAcesso, primeiroAcesso, termoAceito boolean invertido, etc.)
      const primeiroAcesso =
        data.primeiro_acesso === true ||
        data.primeiroAcesso === true ||
        data.primeiro === true ||
        // ou se o backend retornar um campo 'termoAceito' que seja false
        data.termoAceito === false ||
        data.consentido === false ||
        data.first_login === true;

      // Se for primeiro acesso (e tipo T ou F), abrimos o modal de consentimento
      if (primeiroAcesso && (data.tipo === 'T' || data.tipo === 'F')) {
        setLoginData(data);
        setShowConsent(true);
        return;
      }

      // Caso normal: navega conforme tipo
      if (data.tipo === 'T') navigate('/terapeuta');
      else navigate('/familiar-perfil');

    } catch (error) {
      console.error("Erro:", error);
      setErroLogin(error.message || "Usuário ou senha inválidos.");
    }
  }

  // Quando o usuário aceita o termo
  const handleConsentAccept = async () => {
    try {
      // pega id salvo (tenta várias chaves)
      const userId = loginData?.id || loginData?.userId || localStorage.getItem("id_usuario");

      if (!userId) {
        throw new Error("ID do usuário não encontrado para registrar consentimento.");
      }


      const resp = await fetch("http://127.0.0.1:8000/login/api/aceitar-termo/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(localStorage.getItem("token") ? { "Authorization": `Bearer ${localStorage.getItem("token")}` } : {}),
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (!resp.ok) {
        const body = await resp.text().catch(() => '');
        throw new Error("Erro ao gravar consentimento: " + (body || resp.status));
      }

      // fecha o modal
      setShowConsent(false);

      // navega conforme tipo
      if (loginData?.tipo === 'T') navigate('/terapeuta');
      else navigate('/familiar-perfil');

    } catch (err) {
      console.error("Erro ao salvar consentimento:", err);
      setErroLogin("Não foi possível salvar seu consentimento. Tente novamente.");
    }
  };

  // Quando o usuário recusa o termo
  const handleConsentDecline = () => {
    setShowConsent(false);
    setErroLogin("Você precisa aceitar os termos para continuar.");
  };

  return (
    <>
      <form className='form-login' onSubmit={dadosLogin}>
        <div className='campos-login'>
          <CampoDeFormulario>
            <Label htmlFor='Useremail' />
            <CampoDeEntrada
              id='Useremail'
              type='email'
              name='loginEmail'
              placeholder='Digite seu email'
              required
            />
          </CampoDeFormulario>

          <CampoDeFormulario>
            <Label htmlFor='userSenha' />
            <div style={{ position: 'relative' }}>
              <CampoDeEntrada
                id='userSenha'
                type={mostrarSenha ? 'text' : 'password'}
                name='userSenha'
                placeholder='Digite sua senha'
                required
              />
              <button
                type="button"
                onClick={toggleMostrarSenha}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
                aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {mostrarSenha ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </CampoDeFormulario>
        </div>

        {erroLogin && <p className="erro-login" style={{ color: 'red', textAlign: 'center' }}>{erroLogin}</p>}

        <div className='acoes-login'>
          <Botao type="submit">
            LOGIN
          </Botao>
        </div>

        <Link to="/login/recuperar-senha" className="forgot-password-link">
          Esqueceu a senha?
        </Link>
      </form>

      {/* Modal de consentimento */}
      <Consent
        show={showConsent}
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
      />
    </>
  );
}

export default FormLogin;