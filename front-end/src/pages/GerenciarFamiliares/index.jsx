// src/paginas/GerenciarFamiliares/index.jsx
import { useState, useEffect } from 'react';
import { Sidebar } from '../../componentes/Sidebar';
import { Navbar } from '../../componentes/Navbar';
import { FamiliarCard } from '../../componentes/FamiliarCard';
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './gerenciar-familiares.estilo.css'; 

export function GerenciarFamiliares() {
  const [familiares, setFamiliares] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 
  const urlGetFamiliares = "http://localhost:8000/cadastro/lista-familiares"; 

  const fetchFamiliares = () => {
    fetch(urlGetFamiliares)
      .then((res) => res.json())
      .then((data) => setFamiliares(data))
      .catch((err) => console.error("Erro ao buscar familiares:", err));
  };

  useEffect(() => {
    fetchFamiliares();
  }, []);

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
      `Deseja realmente remover/inativar o familiar ${familiar.nome} (ID: ${familiar.id_familiar})?`
    );

    if (confirmAction) {
      // << ALERTA: AJUSTE ESTA URL PARA A SUA API DE REMOÇÃO/INATIVAÇÃO DE FAMILIAR >>
      fetch(`http://localhost:8000/cadastro/familiares/${familiar.id_familiar}/`, { 
        method: 'DELETE', // Ou 'PATCH' se for inativar
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${seuTokenAqui}` // Se precisar de autenticação
        },
      })
      .then(response => {
        if (response.ok) {
          alert(`Familiar ${familiar.nome} removido/inativado com sucesso!`);
          fetchFamiliares(); // Recarrega a lista
        } else {
          return response.json().then(errorData => {
            alert(`Erro ao remover/inativar familiar: ${errorData.detail || response.statusText}`);
            console.error('Erro detalhado da API:', errorData);
          });
        }
      })
      .catch(error => {
        alert('Erro de conexão ao tentar remover/inativar familiar.');
        console.error('Erro na requisição:', error);
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
          <div className="search-input-wrapper expanded">
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