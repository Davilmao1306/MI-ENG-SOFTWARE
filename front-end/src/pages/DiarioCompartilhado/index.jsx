import { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { PiSignOutBold } from 'react-icons/pi';
import { BsSearch } from 'react-icons/bs';
import { InputDiario } from '../../componentes/InputDiario';
import { CardEntrada } from '../../componentes/CardEntrada';
import { CardChecklist } from '../../componentes/CardChecklist';
import './diario-compartilhado.estilo.css';
import { useExibirListas } from '../../hooks/useExibirListas';

export function DiarioCompartilhadoPage() {
  const [isCompositorOpen, setIsCompositorOpen] = useState(false);
  const [pacientes, setPaciente] = useState([]);
  useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setPaciente);

  const [isTerapeuta] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const { id_paciente } = useParams();
  const pacienteAuth = pacientes.find(p => String(p.id_paciente) === String(id_paciente));

  const [feedItems, setFeedItems] = useState([
    {
      id: 'f1', type: 'checklist', autor: 'Terapeuta Rodrigo Tripodi', data: '2023-10-26T10:10:00Z', titulo: 'Atividades educacionais.',
      itens: [
        { text: 'Foco na leitura por 15min', checked: false },
        { text: 'Quebra-cabeça de 50 peças', checked: false },
        { text: 'Desenho livre com tintas', checked: false },
      ]
    },

    { id: 'f2', type: 'entrada', autor: 'Josilda da Silva', data: '2023-10-26T18:45:00Z', texto: 'Hoje o Matheus conseguiu ficar 20 minutos focado na atividade.', attachments: [] },

    { id: 'f3', type: 'entrada', autor: 'Joana dos Santos', data: '2023-10-24T16:35:00Z', texto: 'Foi um bom dia de atividades, ele se mostrou bem calmo.', attachments: [] },
    {
      id: 'f4', type: 'checklist', autor: 'Terapeuta Rodrigo Tripodi', data: '2023-10-23T10:10:00Z', titulo: 'Rotina matinal.',
      itens: [
        { text: 'Escovar os dentes', checked: true },
        { text: 'Arrumar a cama', checked: false },
        { text: 'Tomar café da manhã', checked: true },
      ]
    },
    {
      id: 'f5',
      type: 'entrada',
      autor: 'Josilda da Silva',
      data: '2023-10-27T09:00:00Z',
      texto: 'Matheus adorou a brincadeira com blocos hoje! Ele estava super concentrado. Segue uma foto:',

      attachments: [
        { type: 'file', url: 'https://via.placeholder.com/200/ADD8E6/000000?text=BlocosMatheus', name: 'Teste.png' }
      ]
    },

    {
      id: 'f6',
      type: 'entrada',
      autor: 'Terapeuta Rodrigo Tripodi',
      data: '2023-10-28T11:00:00Z',
      texto: 'Exploramos novos jogos e ele se divertiu muito. Segue a foto de um desenho que ele fez e um link interessante.',
      attachments: [
        { type: 'file', url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Desenho', name: 'DesenhoAzul.png' },
        { type: 'link', url: 'https://www.instagram.com', name: 'RecursosTEA.org' }
      ]
    },
  ]);
  const handleNewEntry = (entryData) => {

    const newEntry = {
      id: `f${feedItems.length + Math.random().toString(36).substring(7)}`,
      data: new Date().toISOString(),
      ...entryData,
      autor: isTerapeuta ? 'Terapeuta Rodrigo Tripodi' : 'Josilda da Silva',
    };
    setFeedItems(prevItems => [newEntry, ...prevItems]);
    setIsCompositorOpen(false);
    console.log("Nova entrada adicionada:", newEntry);

    if (newEntry.type === 'entrada' && newEntry.attachments) {
      newEntry.attachments.forEach(att => {
        if (att.url && att.url.startsWith('blob:')) {
          URL.revokeObjectURL(att.url);
        }
      });
    }
  };

  const handleSaveChecklistResponse = (checklistId, updatedItems) => {
    console.log(`Salvando respostas para checklist ${checklistId}:`, updatedItems);
    setFeedItems(prevItems => prevItems.map(item =>
      item.id === checklistId && item.type === 'checklist'
        ? { ...item, itens: updatedItems }
        : item
    ));
    alert('Respostas do checklist salvas!');
  };


  const filteredFeedItems = useMemo(() => {
    let items = [...feedItems];


    if (filterType !== 'todos') {
      items = items.filter(item => item.type === filterType);
    }


    if (searchTerm.trim()) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      items = items.filter(item => {
        const autorMatch = item.autor.toLowerCase().includes(lowercasedSearchTerm);
        // Para entradas combinadas (agora com attachments)
        if (item.type === 'entrada') {
          const textoMatch = item.texto && item.texto.toLowerCase().includes(lowercasedSearchTerm);
          const attachmentMatch = item.attachments && item.attachments.some(att =>
            (att.name && att.name.toLowerCase().includes(lowercasedSearchTerm)) ||
            (att.url && att.url.toLowerCase().includes(lowercasedSearchTerm)) // Busca na URL também
          );
          return autorMatch || textoMatch || attachmentMatch;
        }

        if (item.type === 'checklist') {
          const tituloMatch = item.titulo && item.titulo.toLowerCase().includes(lowercasedSearchTerm);
          const itemTextMatch = item.itens && item.itens.some(i => i.text.toLowerCase().includes(lowercasedSearchTerm));
          return autorMatch || tituloMatch || itemTextMatch;
        }
        return false;
      });
    }

    return items;
  }, [feedItems, searchTerm, filterType]);


  return (
    <div className="diario-page-container">
      <div className='sidebar-diario'>
        <Link to="/terapeuta/pacientes" className='link-voltar-sidebar'>
          <IoArrowBack />
        </Link>
        <Link to='/login' className='link-sair-sidebar'>
          <PiSignOutBold /> Sair
        </Link>
      </div>

      <main className="diario-main-content">
        <header className="diario-header-paciente">
          <div className="paciente-info">
            <h2>{pacienteAuth?.nome}</h2>
            <p>{pacienteAuth?.cpf} cpf</p>
          </div>
          <button
            className="btn-nova-entrada"
            onClick={() => setIsCompositorOpen(!isCompositorOpen)}
          >
            + Nova Entrada
          </button>
        </header>

        <h3 className="diario-titulo-principal">Diário Compartilhado ({filteredFeedItems.length})</h3>

        <div className="diario-content-wrapper">
          <InputDiario
            isOpen={isCompositorOpen}
            onClose={() => setIsCompositorOpen(false)}
            onPost={handleNewEntry}
            isTerapeuta={isTerapeuta}
          />

          <div className="filtro-diario-container">
            <div className="search-bar">
              <BsSearch />
              <input
                type="text"
                placeholder="Buscar por palavra-chave..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="filtro-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="todos">Todos os Tipos</option>
              <option value="entrada">Entradas</option>
              <option value="checklist">Checklists</option>
            </select>

            <button
              className="filtro-btn"
              onClick={() => setFeedItems(prev => [...prev].sort((a, b) => new Date(b.data) - new Date(a.data)))}
            >
              Mais Recentes
            </button>
            <button
              className="filtro-btn"
              onClick={() => setFeedItems(prev => [...prev].sort((a, b) => new Date(a.data) - new Date(b.data)))}
            >
              Menos Recentes
            </button>
          </div>

          <section className="feed-container">
            {filteredFeedItems.map(item => {
              switch (item.type) {
                case 'entrada':

                  return <CardEntrada key={item.id} autor={item.autor} data={item.data} texto={item.texto} attachments={item.attachments} />;
                case 'checklist':
                  return <CardChecklist
                    key={item.id}
                    autor={item.autor}
                    data={item.data}
                    titulo={item.titulo}
                    itens={item.itens}
                    onSaveResponse={(updatedItems) => handleSaveChecklistResponse(item.id, updatedItems)}
                    isTerapeutaView={isTerapeuta}
                  />;
                default:
                  return <div key={item.id} className="feed-item-placeholder">Tipo de entrada desconhecido: {item.type}</div>;
              }
            })}
            {filteredFeedItems.length === 0 && (
              <div className="feed-vazio-msg">
                <p>Nenhuma entrada encontrada com os critérios de busca/filtro.</p>
                <p>Tente ajustar sua busca ou filtros.</p>
              </div>
            )}
          </section>
        </div>

      </main>
    </div>
  );
}