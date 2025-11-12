// src/paginas/GerenciarTerapeutas/index.jsx
import React, { useState, useEffect } from 'react';
import { Sidebar } from '../../componentes/Sidebar';
import { TerapeutaCard } from '../../componentes/TerapeutaCard'; // Importe o TerapeutaCard
import { FiPlusCircle, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './gerenciar-terapeutas.estilo.css'; // O CSS da tela principal

export function GerenciarTerapeutas() {
  const [terapeutas, setTerapeutas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const urlGetTerapeutas = "http://localhost:8000/cadastro/lista-terapeutas"; // << Sua URL da API para terapeutas

  const fetchTerapeutas = () => {
    fetch(urlGetTerapeutas)
      .then((res) => res.json())
      .then((data) => setTerapeutas(data))
      .catch((err) => console.error("Erro ao buscar terapeutas:", err));
  };

  useEffect(() => {
    fetchTerapeutas();
  }, []);

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
    // Aqui você implementaria a lógica para remover ou inativar o terapeuta
    // Geralmente, isso envolveria:
    // 1. Uma requisição DELETE ou PATCH (para inativar) à sua API.
    // 2. Uma confirmação do usuário (ex: alert, modal de confirmação).
    // 3. Atualizar o estado 'terapeutas' após a operação bem-sucedida.

    const confirmAction = window.confirm(
      `Deseja realmente remover/inativar o terapeuta ${terapeuta.nome} (ID: ${terapeuta.id_terapeuta})?`
    );

    if (confirmAction) {
      console.log(`Ação de remover/inativar para o terapeuta: ${terapeuta.nome}`);
      // Exemplo de requisição (AJUSTE PARA SUA API REAL)
      // fetch(`http://localhost:8000/cadastro/terapeutas/${terapeuta.id_terapeuta}/`, {
      //   method: 'DELETE', // Ou 'PATCH' para inativar
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   // body: JSON.stringify({ ativo: false }) // Se for para inativar
      // })
      // .then(response => {
      //   if (response.ok) {
      //     alert('Terapeuta removido/inativado com sucesso!');
      //     fetchTerapeutas(); // Recarrega a lista de terapeutas
      //   } else {
      //     alert('Erro ao remover/inativar terapeuta.');
      //   }
      // })
      // .catch(error => console.error('Erro na requisição:', error));

      // Por enquanto, apenas um console.log e recarregar para simular
      alert(`Terapeuta ${terapeuta.nome} (ID: ${terapeuta.id_terapeuta}) seria removido/inativado.`);
      fetchTerapeutas(); // Recarrega a lista para refletir a mudança (se fosse real)
    }
  };


  return (
    <div className="gerenciar-layout">
      <Sidebar />
      <main className="gerenciar-main-content">
        <h1 className="gerenciar-terapeutas-title">Gerenciamento de Terapeutas</h1>

        <div className="acoes-gerenciamento">
          <div className="search-input-wrapper expanded">
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