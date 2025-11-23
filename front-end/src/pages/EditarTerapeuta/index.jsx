import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import './editar-terapeuta.estilo.css'; 

export function EditarTerapeuta() {
  const { id_terapeuta } = useParams(); // Pega o ID do terapeuta da URL
  const navigate = useNavigate();

  // Estado para os dados do terapeuta
  const [terapeuta, setTerapeuta] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    crp: '',
    especialidade: '', 
    senha: '', 
    confirmarSenha: '' 
  });

  const [isLoading, setIsLoading] = useState(true);
  const [erroSenha, setErroSenha] = useState('');

  // Busca os dados do terapeuta na API
  useEffect(() => {

    const urlGetTerapeuta = `http://localhost:8000/cadastro/terapeutas/${id_terapeuta}`;
    console.log("Buscando dados do terapeuta:", id_terapeuta);

    fetch(urlGetTerapeuta)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Não foi possível buscar os dados do terapeuta.');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Dados do terapeuta recebidos:", data);

        setTerapeuta(prevState => ({
          ...prevState,
          nome: data.nome,
          cpf: data.cpf,
          email: data.email,
          telefone: data.telefone,
          crp: data.crp, 
          especialidade: data.especialidade 
          // Senha e confirmarSenha permanecem vazios
        }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar terapeuta:", err);
        alert('Erro ao carregar os dados do terapeuta.');
        setIsLoading(false);
      });
  }, [id_terapeuta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTerapeuta(prevState => ({
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
    if (terapeuta.senha && terapeuta.senha !== terapeuta.confirmarSenha) {
      setErroSenha('As senhas não coincidem.');
      return;
    }

    // Prepara os dados para envio
    const dadosParaEnviar = { ...terapeuta };
    // Remove campos de senha se estiverem vazios
    if (!dadosParaEnviar.senha) {
      delete dadosParaEnviar.senha;
      delete dadosParaEnviar.confirmarSenha;
    } else {
      delete dadosParaEnviar.confirmarSenha;
    }

    // Ajuste a URL para o seu endpoint de terapeutas
    const urlUpdateTerapeuta = `http://localhost:8000/cadastro/terapeutas/${id_terapeuta}/`;
    console.log('Enviando dados atualizados para a API:', dadosParaEnviar);

    fetch(urlUpdateTerapeuta, {
      method: 'PUT', // Ou 'PATCH'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dadosParaEnviar),
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Falha ao atualizar o terapeuta.');
      }
      return res.json();
    })
    .then(data => {
      console.log('Terapeuta atualizado com sucesso:', data);
      alert('Alterações salvas com sucesso!');
      // Redireciona para a lista de terapeutas
      navigate('/clinica/lista-de-terapeutas');
    })
    .catch(err => {
      console.error('Erro ao atualizar terapeuta:', err);
      alert('Erro ao salvar as alterações. Tente novamente.');
    });
  };

  const handleCancelar = () => {
    // Redireciona para a lista de terapeutas
    navigate('/clinica/lista-de-terapeutas');
  };

  if (isLoading) {
    return <div className="loading">Carregando dados do terapeuta...</div>;
  }

  return (
    <div className="editar-terapeuta-layout">
      <Sidebar />
      <Navbar userName="Clínica" />
      <main className="editar-terapeuta-main-content">
        <h1 className="editar-terapeuta-title">Editar Terapeuta</h1>

        <div className="editar-terapeuta-container">
          <form onSubmit={handleSubmit} className="editar-terapeuta-form">
            
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={terapeuta.nome || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF (Bloqueado)</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={terapeuta.cpf || ''}
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
                value={terapeuta.email || ''}
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
                value={terapeuta.telefone || ''}
                onChange={handleChange}
              />
            </div>

 
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="crp">CRP</label>
                <input
                  type="text"
                  id="crp"
                  name="crp"
                  value={terapeuta.crp || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="especialidade">Especialidade</label>
                <input
                  type="text"
                  id="especialidade"
                  name="especialidade"
                  value={terapeuta.especialidade || ''}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Campos de Senha */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="senha">Nova Senha (deixe em branco para não alterar)</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  value={terapeuta.senha || ''}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="confirmarSenha">Confirmar Nova Senha</label>
                <input
                  type="password"
                  id="confirmarSenha"
                  name="confirmarSenha"
                  value={terapeuta.confirmarSenha || ''}
                  onChange={handleChange}
                  required={!!terapeuta.senha}
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