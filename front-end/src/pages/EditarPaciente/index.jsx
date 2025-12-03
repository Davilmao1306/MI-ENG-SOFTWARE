import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import './editar-paciente.estilo.css'; 


export function EditarPaciente() {

  const { id_paciente } = useParams();
  const navigate = useNavigate();

  const [paciente, setPaciente] = useState({
    nome: '',
    cpf: '',
    data_nascimento: '',
    genero: ''
  });

  const [isLoading, setIsLoading] = useState(true);


  
  useEffect(() => {
    const urlGetPaciente = "http://localhost:8000/cadastro/lista-pacientes";

    console.log("Buscando dados do paciente:", id_paciente);

    fetch(urlGetPaciente)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Não foi possível buscar os dados do paciente.');
        }
        return res.json();
      })
      .then((data) => {
        data = data.find(t => t.id_paciente === parseInt(id_paciente));
        console.log("Dados do paciente recebidos:", data);

        setPaciente(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar paciente:", err);
        alert('Erro ao carregar os dados do paciente.');
        setIsLoading(false);

      });
  }, [id_paciente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaciente(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const urlUpdatePaciente = `http://localhost:8000/cadastro/editar-paciente/${id_paciente}/`;

    console.log('Enviando dados atualizados para a API:', paciente);

    fetch(urlUpdatePaciente, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paciente),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Falha ao atualizar o paciente.');
        }
        return res.json();
      })
      .then(data => {
        console.log('Paciente atualizado com sucesso:', data);
        alert('Alterações salvas com sucesso!');

        navigate('/clinica/lista-de-pacientes');
      })
      .catch(err => {
        console.error('Erro ao atualizar paciente:', err);
        alert('Erro ao salvar as alterações. Tente novamente.');
      });
  };

  const handleCancelar = () => {
    navigate('/clinica/lista-de-pacientes');
  };

  if (isLoading) {
    return <div className="loading">Carregando dados do paciente...</div>;
  }

  return (
    <div className="editar-paciente-layout">
      <Sidebar />
      <Navbar userName="Clínica" />
      <main className="editar-paciente-main-content">
        <h1 className="editar-paciente-title">Editar Paciente</h1>

        <div className="editar-paciente-container">
          <form onSubmit={handleSubmit} className="editar-paciente-form">

            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={paciente.nome || ''}
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
                value={paciente.cpf || ''}
                disabled 
                className="input-disabled"
              />
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="data_nascimento">Data de Nascimento</label>
                <input
                  type="date"
                  id="data_nascimento"
                  name="data_nascimento"
                  value={paciente.data_nascimento || ''}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="genero">Gênero</label>
                <select
                  id="genero"
                  name="genero"
                  value={paciente.genero || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
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