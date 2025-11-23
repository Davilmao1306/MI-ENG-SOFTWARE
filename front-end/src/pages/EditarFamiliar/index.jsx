import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import './editar-familiar.estilo.css';

export function EditarFamiliar() {
  const { id_familiar } = useParams(); 
  const navigate = useNavigate();

  // Estado para os dados do familiar
  const [familiar, setFamiliar] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    senha: '', 
    confirmarSenha: '' 
  });

  const [isLoading, setIsLoading] = useState(true);
  const [erroSenha, setErroSenha] = useState(''); // Estado para erro de senha

  // Busca os dados do familiar na API
  useEffect(() => {
    // Ajuste a URL para o seu endpoint de familiares
    const urlGetFamiliar = `http://localhost:8000/cadastro/familiares/${id_familiar}`;
    console.log("Buscando dados do familiar:", id_familiar);

    fetch(urlGetFamiliar)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Não foi possível buscar os dados do familiar.');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dados do familiar recebidos:", data);
        // Preenche o estado, mas não traz a senha por segurança
        setFamiliar(prevState => ({
          ...prevState,
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          telefone: data.telefone

        }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar familiar:", err);
        alert('Erro ao carregar os dados do familiar.');
        setIsLoading(false);
      });
  }, [id_familiar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamiliar(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Limpa erro de senha ao digitar
    if (name === 'senha' || name === 'confirmarSenha') {
      setErroSenha('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação de senha
    if (familiar.senha && familiar.senha !== familiar.confirmarSenha) {
      setErroSenha('As senhas não coincidem.');
      return;
    }

    // Prepara os dados para envio
    const dadosParaEnviar = { ...familiar };
    // Se a senha não foi alterada, remove do objeto para não enviar string vazia
    if (!dadosParaEnviar.senha) {
      delete dadosParaEnviar.senha;
      delete dadosParaEnviar.confirmarSenha;
    } else {
      // Remove o campo de confirmação antes de enviar
      delete dadosParaEnviar.confirmarSenha;
    }

    // Ajuste a URL para o seu endpoint de familiares
    const urlUpdateFamiliar = `http://localhost:8000/cadastro/familiares/${id_familiar}/`;
    console.log('Enviando dados atualizados para a API:', dadosParaEnviar);

    fetch(urlUpdateFamiliar, {
      method: 'PUT', // Ou 'PATCH'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosParaEnviar),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Falha ao atualizar o familiar.');
      }
      return res.json();
    })
    .then(data => {
      console.log('Familiar atualizado com sucesso:', data);
      alert('Alterações salvas com sucesso!');
      // Redireciona para a lista de familiares
      navigate('/clinica/lista-de-familiares'); 
    })
    .catch(err => {
      console.error('Erro ao atualizar familiar:', err);
      alert('Erro ao salvar as alterações. Tente novamente.');
    });
  };

  const handleCancelar = () => {
    // Redireciona para a lista de familiares
    navigate('/clinica/lista-de-familiares');
  };

  if (isLoading) {
    return <div className="loading">Carregando dados do familiar...</div>;
  }

  return (
    <div className="editar-familiar-layout">
      <Sidebar />
      <Navbar userName="Clínica" />
      <main className="editar-familiar-main-content">
        <h1 className="editar-familiar-title">Editar Familiar</h1>

        <div className="editar-familiar-container">
          <form onSubmit={handleSubmit} className="editar-familiar-form">
            
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={familiar.nome || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={familiar.cpf || ''}
                disabled
                className="input-disabled"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={familiar.email || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={familiar.telefone || ''}
                onChange={handleChange}
              />
            </div>

            {/* Campos de Senha */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="senha">Nova Senha (deixe em branco para não alterar)</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={familiar.senha || ''}
                  onChange={handleChange}
                  // Senha não é obrigatória na edição
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={familiar.confirmarSenha || ''}
                  onChange={handleChange}
                  // Obrigatório apenas se uma nova senha for digitada
                  required={!!familiar.senha}
                />
              </div>
            </div>
            {erroSenha && <div className="erro-senha">{erroSenha}</div>}

            <div className="form-actions">
              <button type="button" className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
              <button type="submit" className="btn-salvar">Salvar Alterações</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}