// src/paginas/GerenciarFamiliares/index.jsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import { FamiliarCard } from '../../componentes/FamiliarCard';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './gerenciar-familiares.estilo.css';
import { useExibirListas } from '../../hooks/useExibirListas';




export function GerenciarFamiliares() {
  const [familiares, setFamiliares] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useExibirListas("http://localhost:8000/cadastro/lista-familiares", setFamiliares)


  const filteredFamiliares = familiares.filter(familiar => {
    const termo = searchTerm.toLowerCase();
    const idFamiliar = familiar.id_familiar ? String(familiar.id_familiar).toLowerCase() : '';

    return (
      familiar.nome.toLowerCase().includes(termo) ||
      idFamiliar.includes(termo) ||
      (familiar.email && familiar.email.toLowerCase().includes(termo)) ||
      (familiar.telefone && familiar.telefone.toLowerCase().includes(termo))
    );
  });

  const handleRemoverOuInativarFamiliar = (familiar) => {
    const confirmAction = window.confirm(
      `Deseja realmente remover/inativar o familiar ${familiar.nome}?`
    );

    if (confirmAction) {
      fetch(`http://localhost:8000/cadastro/familiar/excluir/${familiar.id_familiar}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (res) => {
          if (res.ok) {
            alert('Familiar removido com sucesso!');

            fetch("http://localhost:8000/cadastro/lista-familiares")
              .then(r => r.json())
              .then(data => setFamiliares(data));
          } else {
            const errorData = await res.json();
            alert(`Erro ao remover: ${errorData.detail}`);
          }
        })
        .catch((error) => {
          console.error('Erro na requisição:', error);
          alert('Erro de conexão ao tentar remover.');
        });
    }
  };


  return (
    <div className="gerenciar-layout">
      <Sidebar />
      <Navbar userName="Clínica" />
      <main className="gerenciar-main-content">
        <h1 className="gerenciar-familiar-title">Gerenciamento de Familiares</h1>

        <div className="acoes-gerenciamento">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Buscar por nome, ID, email, telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>


          <Link to="/clinica/cadastrar-familiar" className="add-button">
            <FiPlusCircle /> Cadastrar Familiar
          </Link>
        </div>

        <div className="familiares-grid">
          {filteredFamiliares.length > 0 ? (
            filteredFamiliares.map(familiar => (
              <FamiliarCard
                key={familiar.id_familiar}
                familiar={familiar}
                onRemoverOuInativar={handleRemoverOuInativarFamiliar}
              />
            ))
          ) : (
            <p className="no-itens-found">Nenhum familiar encontrado com os critérios de busca.</p>
          )}
        </div>
      </main>
    </div>
  );
}