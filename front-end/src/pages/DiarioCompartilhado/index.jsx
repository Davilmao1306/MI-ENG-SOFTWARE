import { useState, useMemo } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const id = localStorage.getItem("id_usuario");
  const [terapeutas, setTerapeutas] = useState([])
  const [pacientes, setPaciente] = useState([]);
  const [familiares, setFamiliares] = useState([]);
  const [diario, setDiario] = useState()
  useExibirListas("http://localhost:8000/cadastro/lista-pacientes", setPaciente);
  useExibirListas("http://localhost:8000/cadastro/lista-terapeutas", setTerapeutas)
  useExibirListas("http://localhost:8000/cadastro/lista-familiares", setFamiliares)
  useExibirListas(`http://localhost:8000/diario/diario/paciente/${id_paciente}`, setDiario)

  const pacienteAuth = pacientes?.find(p => String(p.id_paciente) === String(id_paciente));
  const terapeutaAuth = terapeutas?.find(t => String(t.id_usuario) === String(id));
  const familiarAuth = familiares?.find(f => String(f.id_usuario) === String(id));

  const [isCompositorOpen, setIsCompositorOpen] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('todos');

  const isTerapeuta = location.pathname.includes('/terapeuta/');
  const linkVoltar = isTerapeuta ? "/terapeuta/pacientes" : `/familiar-paciente/${id_paciente}`;


  useExibirListas(`http://localhost:8000/diario/feed/${id_paciente}`, setFeedItems);


  const handleNewEntry = async (entryData) => {

    try {
      if (entryData.type === 'entrada') {

        const corpoMensagem = {
          descricao_mensagem: entryData.texto,
          id_diario: diario[0]?.id_diario,
          id_terapeuta: isTerapeuta ? terapeutaAuth?.id_terapeuta : null,
          id_familiar: !isTerapeuta ? familiarAuth?.id_familiar : null
        };

        const respMsg = await fetch("http://localhost:8000/diario/mensagem/enviar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(corpoMensagem)
        });

        if (!respMsg.ok) throw new Error("Erro ao salvar mensagem");
        const msgCriada = await respMsg.json();


        const novosAnexos = [];
        if (entryData.attachments?.length > 0) {
          for (const anexo of entryData.attachments) {

            if (anexo.file instanceof File) {
              const formData = new FormData();
              formData.append("arquivo", anexo.file);
              formData.append("tipo", anexo.file.type.startsWith('image') ? 'foto' : 'file');
              formData.append("id_mensagem", msgCriada.id_mensagem);
              const respMidia = await fetch("http://localhost:8000/diario/midia/adicionar", {
                method: "POST",
                body: formData
              });

              if (respMidia.ok) {
                const m = await respMidia.json();
                novosAnexos.push({
                  type: m.tipo,
                  url: `http://localhost:8000/diario/media/${m.nomearquivo}`,
                  name: m.nomearquivo
                });
              }
            }
            if (anexo.type === 'link') {
              await fetch("http://localhost:8000/diario/mensagem/link/adicionar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id_mensagem: msgCriada.id_mensagem,
                  url: anexo.url,
                  nome: anexo.name
                })
              });
              novosAnexos.push({
                type: 'link',
                url: anexo.url,
                name: anexo.name
              });
            }
          }
        }
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


        const corpoChecklist = {
          id_terapeuta: terapeutaAuth?.id_terapeuta,
          id_diario: diario[0]?.id_diario,
          titulo: entryData.titulo
        };

        const respCheck = await fetch("http://localhost:8000/diario/checklist/criar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(corpoChecklist)
        });

        if (!respCheck.ok) throw new Error("Erro ao criar checklist");
        const checkCriado = await respCheck.json();

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

        setFeedItems(prev => [{
          id: `c_${checkCriado.id_checklist}`,
          type: 'checklist',
          autor: 'Você',
          data: new Date().toISOString(),
          titulo: entryData.titulo,
          itens: entryData.itens
        }, ...prev]);
      }

      setIsCompositorOpen(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar: " + error.message);
    }
  };

  const handleSaveChecklistResponse = async (checklistId, updatedItems) => {


    try {
      const updatePromises = updatedItems.map(item => {
        return fetch("http://localhost:8000/diario/checklist/item/atualizar", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: item.id,
            checked: item.checked
          })
        });
      });
      await Promise.all(updatePromises);

      setFeedItems(prevItems => prevItems.map(item =>
        item.id === checklistId ? { ...item, itens: updatedItems } : item
      ));

      alert('Respostas salvas com sucesso!');

    } catch (error) {
      console.error("Erro ao salvar checklist:", error);
      alert("Erro ao salvar as respostas. Tente novamente.");
    }
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
        <Link to={linkVoltar} className='link-voltar-sidebar'>
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
            autor={isTerapeuta ? terapeutaAuth?.nome : familiarAuth?.nome}
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