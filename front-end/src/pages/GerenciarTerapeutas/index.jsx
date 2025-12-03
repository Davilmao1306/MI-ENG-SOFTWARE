import { useState } from 'react';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import { TerapeutaCard } from '../../componentes/TerapeutaCard'; // Importe o TerapeutaCard
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './gerenciar-terapeutas.estilo.css'; // O CSS da tela principal
import { useExibirListas } from '../../hooks/useExibirListas';

export function GerenciarTerapeutas() { 
  const [terapeutas, setTerapeutas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useExibirListas("http://localhost:8000/cadastro/lista-terapeutas", setTerapeutas)


  const filteredTerapeutas = terapeutas.filter(terapeuta => {
    const termo = searchTerm.toLowerCase();
    const idTerapeuta = terapeuta.id_terapeuta ? String(terapeuta.id_terapeuta).toLowerCase() : '';

    return (
      terapeuta.nome.toLowerCase().includes(termo) ||
      idTerapeuta.includes(termo) ||
      (terapeuta.especialidade && terapeuta.especialidade.toLowerCase().includes(termo)) || // Verifique se especialidade existe
      (terapeuta.email && terapeuta.email.toLowerCase().includes(termo)) // Ex: buscar por email
    );
  });

  // Função para lidar com a ação de Remover/Inativar
  const handleRemoverOuInativarTerapeuta = (terapeuta) => {
    const confirmAction = window.confirm(
      `Deseja realmente remover/inativar o terapeuta ${terapeuta.nome} (ID: ${terapeuta.id_terapeuta})?`
    );

    if (confirmAction) {
      console.log(`Ação de remover/inativar para o terapeuta: ${terapeuta.nome}`);
      fetch(`http://localhost:8000/cadastro/terapeuta/excluir/${terapeuta.id_terapeuta}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        if (response.ok) {
          alert('Terapeuta removido/inativado com sucesso!');
          fetch("http://localhost:8000/cadastro/lista-terapeutas")
              .then(r => r.json())
              .then(data => setTerapeutas(data));
        } else {
          alert('Erro ao remover/inativar terapeuta.');
        }
      })
      .catch(error => console.error('Erro na requisição:', error));
    }
  };


  return (
    <div className="gerenciar-layout">
      <Sidebar />
      <Navbar userName="Clínica" />
      <main className="gerenciar-main-content">
        <h1 className="gerenciar-terapeutas-title">Gerenciamento de Terapeutas</h1>

        <div className="acoes-gerenciamento">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Buscar por nome, ID, e-mail, especialidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}

            />
          </div>

          <Link to="/clinica/cadastrar-terapeuta" className="add-button">
            <FiPlusCircle /> Cadastrar Terapeuta
          </Link>
        </div>

        <div className="terapeutas-grid">
          {filteredTerapeutas.length > 0 ? (
            filteredTerapeutas.map(terapeuta => (
              <TerapeutaCard
                key={terapeuta.id_terapeuta}
                terapeuta={terapeuta}
                onRemoverOuInativar={handleRemoverOuInativarTerapeuta}
              />
            ))
          ) : (
            <p className="no-itens-found">Nenhum terapeuta encontrado com os critérios de busca.</p>
          )}
        </div>
      </main>
    </div>
  );
}