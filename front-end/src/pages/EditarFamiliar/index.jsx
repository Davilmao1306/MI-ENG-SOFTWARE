import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import './editar-familiar.estilo.css';
import { useExibirListas } from '../../hooks/useExibirListas';

export function EditarFamiliar() {
  const { id_familiar } = useParams();
  const navigate = useNavigate();

  const [familiar, setFamiliar] = useState({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    data_nascimento: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  useExibirListas("http://localhost:8000/cadastro/lista-usuarios", setUsuarios);

  
  useEffect(() => {
    
    const urlGetFamiliar = "http://localhost:8000/cadastro/lista-familiares";
    console.log("Buscando dados do familiar:", id_familiar);

    fetch(urlGetFamiliar)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Não foi possível buscar os dados do familiar.');
        }
        return res.json();
      })
      .then((data) => {
        data = data.find(f => f.id_familiar === parseInt(id_familiar));
        const useredit = usuarios.find(u => u.id_usuario === data.id_usuario);
        console.log("Dados do familiar recebidos:", data);
        
        setFamiliar(prevState => ({
          ...prevState,
          nome: data.nome,
          cpf: data.cpf,
          email: useredit?.email,
          telefone: data.telefone,
          data_nascimento: data.datanascimento || data.data_nascimento || ''
        }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar familiar:", err);
        alert('Erro ao carregar os dados do familiar.');
        setIsLoading(false);
      });
  }, [id_familiar, usuarios]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamiliar(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const dadosParaEnviar = { ...familiar };
    const urlUpdateFamiliar = `http://localhost:8000/cadastro/editar-familiar/${id_familiar}/`;
    console.log('Enviando dados atualizados para a API:', dadosParaEnviar);

    fetch(urlUpdateFamiliar, {
      method: 'PUT',
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
        navigate('/clinica/lista-de-familiares');
      })
      .catch(err => {
        console.error('Erro ao atualizar familiar:', err);
        alert('Erro ao salvar as alterações. Tente novamente.');
      });
  };

  const handleCancelar = () => {
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