import { useState, useEffect, useMemo, use } from 'react';
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
  const { id_paciente } = useParams();
  const id = localStorage.getItem("id_usuario");
  const [loading, setLoading] = useState(true);
  const [terapeutas, setTerapeutas] = useState([])
  const [pacientes, setPaciente] = useState([]);
  const [familiares, setFamiliares] = useState([]);
  const [diario, setDiario] = useState()
  useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setPaciente);
  useExibirListas("http://localhost:8000/cadastro/lista-terapeutas", setTerapeutas)
  useExibirListas("http://localhost:8000/cadastro/lista-familiares", setFamiliares)
  useExibirListas(`http://localhost:8000/diario/diario/paciente/${id_paciente}`, setDiario)
  //console.log(diario);
  const pacienteAuth = pacientes?.find(p => String(p.id_paciente) === String(id_paciente));
  const terapeutaAuth = terapeutas?.find(t => String(t.id_usuario) === String(id));
  const familiarAuth = familiares?.find(f => String(f.id_usuario) === String(id));
  const [isCompositorOpen, setIsCompositorOpen] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');
  const [isTerapeuta] = useState(true);
  const [isFamiliar] = useState(true);
  useEffect(() => {
    async function fetchFeed() {
      if (!id_paciente) return;
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8000/diario/feed/${id_paciente}`);
        //console.log(response);
        if (response.ok) {
          const data = await response.json();
          setFeedItems(data);
        } else {
          console.error("Erro ao buscar feed");
        }
      } catch (error) {
        console.error("Erro de rede:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeed();
  }, [id_paciente]);

  // const [feedItems, setFeedItems] = useState([
  //   {
  //     id: 'f1', type: 'checklist', autor: 'Terapeuta Rodrigo Tripodi', data: '2023-10-26T10:10:00Z', titulo: 'Atividades educacionais.',
  //     itens: [
  //       { text: 'Foco na leitura por 15min', checked: false },
  //       { text: 'Quebra-cabeça de 50 peças', checked: false },
  //       { text: 'Desenho livre com tintas', checked: false },
  //     ]
  //   },

  //   { id: 'f2', type: 'entrada', autor: 'Josilda da Silva', data: '2023-10-26T18:45:00Z', texto: 'Hoje o Matheus conseguiu ficar 20 minutos focado na atividade.', attachments: [] },

  //   { id: 'f3', type: 'entrada', autor: 'Joana dos Santos', data: '2023-10-24T16:35:00Z', texto: 'Foi um bom dia de atividades, ele se mostrou bem calmo.', attachments: [] },
  //   {
  //     id: 'f4', type: 'checklist', autor: 'Terapeuta Rodrigo Tripodi', data: '2023-10-23T10:10:00Z', titulo: 'Rotina matinal.',
  //     itens: [
  //       { text: 'Escovar os dentes', checked: true },
  //       { text: 'Arrumar a cama', checked: false },
  //       { text: 'Tomar café da manhã', checked: true },
  //     ]
  //   },
  //   {
  //     id: 'f5',
  //     type: 'entrada',
  //     autor: 'Josilda da Silva',
  //     data: '2023-10-27T09:00:00Z',
  //     texto: 'Matheus adorou a brincadeira com blocos hoje! Ele estava super concentrado. Segue uma foto:',

  //     attachments: [
  //       { type: 'file', url: 'https://via.placeholder.com/200/ADD8E6/000000?text=BlocosMatheus', name: 'Teste.png' }
  //     ]
  //   },

  //   {
  //     id: 'f6',
  //     type: 'entrada',
  //     autor: 'Terapeuta Rodrigo Tripodi',
  //     data: '2023-10-28T11:00:00Z',
  //     texto: 'Exploramos novos jogos e ele se divertiu muito. Segue a foto de um desenho que ele fez e um link interessante.',
  //     attachments: [
  //       { type: 'file', url: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Desenho', name: 'DesenhoAzul.png' },
  //       { type: 'link', url: 'https://www.instagram.com', name: 'RecursosTEA.org' }
  //     ]
  //   },
  // ]);
const handleNewEntry = async (entryData) => {
    const idDiario = diario[0]?.id_diario;
    
    // Validação de segurança
    if (!idDiario) {
        alert("Erro: Diário não encontrado para este paciente.");
        return;
    }

    try {
      if (entryData.type === 'entrada') {
          // Salvar o texto na tabela Mensagem
          const corpoMensagem = {
            descricao_mensagem: entryData.texto,
            id_diario: idDiario,
            id_terapeuta: isTerapeuta ? terapeutaAuth?.id_terapeuta : null, 
            id_familiar: isFamiliar ? familiarAuth?.id_familiar : null,
          };

          const respMsg = await fetch("http://localhost:8000/diario/mensagem/enviar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(corpoMensagem)
          });

          if (!respMsg.ok) throw new Error("Erro ao salvar mensagem");
          const msgCriada = await respMsg.json();

          // Salvar os Anexos (Mídia) vinculados à Mensagem
          const novosAnexos = [];
          if (entryData.attachments?.length > 0) {
            for (const anexo of entryData.attachments) {
               // Verifica se é arquivo para upload (tem propriedade 'file' ou é blob)
               if (anexo.file instanceof File) {
                   const formData = new FormData();
                   formData.append("arquivo", anexo.file); // O objeto File real
                   formData.append("tipo", anexo.file.type.startsWith('image') ? 'foto' : 'file');
                   formData.append("id_mensagem", msgCriada.id_mensagem); // VINCULA AQUI
                   
                   const respMidia = await fetch("http://localhost:8000/diario/midia/adicionar", {
                       method: "POST", 
                       body: formData 
                   });
                   
                   if(respMidia.ok) {
                       const m = await respMidia.json();
                       novosAnexos.push({ 
                           type: m.tipo, 
                           url: `http://localhost:8000/diario/media/${m.nomearquivo}`, 
                           name: m.nomearquivo 
                       });
                   }
               }
            }
          }

          // Atualiza a tela (Feed)
          setFeedItems(prev => [{
              id: `m_${msgCriada.id_mensagem}`, 
              type: 'entrada',
              autor: 'Você', 
              data: new Date().toISOString(),
              texto: entryData.texto, 
              attachments: novosAnexos
          }, ...prev]);

      } 
      else if (entryData.type === 'checklist') {
          
          if (!isTerapeuta) {
              alert("Apenas terapeutas podem criar checklists.");
              return;
          }

          // 1. Criar o Cabeçalho do Checklist
          const corpoChecklist = {
              id_terapeuta: terapeutaAuth?.id_terapeuta,
              id_diario: idDiario,
              titulo: entryData.titulo // Agora o banco aceita título!
          };
          
          const respCheck = await fetch("http://localhost:8000/diario/checklist/criar", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify(corpoChecklist)
          });

          if(!respCheck.ok) throw new Error("Erro ao criar checklist");
          const checkCriado = await respCheck.json();

          // 2. Salvar cada Item do Checklist
          // entryData.itens vem como array: [{ text: 'Ler livro' }, { text: 'Dormir' }]
          for (const item of entryData.itens) {
              await fetch("http://localhost:8000/diario/checklist/item/adicionar", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      descricao: item.text,
                      id_checklist: checkCriado.id_checklist
                  })
              });
          }

          // Atualiza a tela (Feed)
          setFeedItems(prev => [{
              id: `c_${checkCriado.id_checklist}`, 
              type: 'checklist',
              autor: 'Você', 
              data: new Date().toISOString(),
              titulo: entryData.titulo,
              itens: entryData.itens
          }, ...prev]);
      }

      setIsCompositorOpen(false); // Fecha o modal
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar: " + error.message);
    }
  };

  const handleSaveChecklistResponse = (checklistId, updatedItems) => {
    console.log(`Salvando respostas para checklist ${checklistId}:`, updatedItems);
    setFeedItems(prevItems => prevItems.map(item =>
      item.id === checklistId ? { ...item, itens: updatedItems } : item
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
        const autorMatch = item.autor && item.autor.toLowerCase().includes(lowercasedSearchTerm);

        if (item.type === 'entrada') {
          const textoMatch = item.texto && item.texto.toLowerCase().includes(lowercasedSearchTerm);
          return autorMatch || textoMatch;
        }

        if (item.type === 'checklist') {
          const tituloMatch = item.titulo && item.titulo.toLowerCase().includes(lowercasedSearchTerm);
          return autorMatch || tituloMatch;
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