import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { PiUploadSimpleBold, PiLinkBold } from "react-icons/pi"; 
import { CampoBuscaPaciente } from '../../componentes/CampoBuscaPaciente';
import { IconVoltar } from '../../componentes/IconVoltar';
import { IconSair } from '../../componentes/IconSair';
import { AdicionarLinkModal } from '../../componentes/AdicionarLinkModal';
import { UploadModal } from '../../componentes/UploadModal';

import './criar-plano.estilo.css';

export function CriarPlanoPage() {

  const [pacienteSelecionado, setPacienteSelecionado] = useState(null); 
  const [neuroSelecionadas, setNeuroSelecionadas] = useState([]);
  const [descNeuro, setDescNeuro] = useState('');
  const [metodosInput, setMetodosInput] = useState('');
  

  const [cronograma, setCronograma] = useState('');
  const [objetivos, setObjetivos] = useState('');
  const [abordagemFamiliares, setAbordagemFamiliares] = useState('');
  const [sobrePlano, setSobrePlano] = useState('');


  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [linksAnexados, setLinksAnexados] = useState([]);
  const [arquivosAnexados, setArquivosAnexados] = useState([]);

  
  const neurodivergenciasOpcoes = ["TEA", "TAB", "TDAH", "TPN", "TOC", "Dislexia", "Discalculia", "Disgrafia", "Outros"];
  const metodosOpcoes = ["Treinamento Parental", "Comunicação assistiva", "Terapia ocupacional", "Fonoaudiologia", "Terapia Comportamental Cognitiva"];


  const { idDoPlano } = useParams();
  const isEditing = !!idDoPlano;
  const navigate = useNavigate();

  // FUNÇÕES DE MANIPULAÇÃO DE ESTADO
  const handleChipClick = (item) => {
    setNeuroSelecionadas(prev =>
      prev.includes(item)
        ? prev.filter(n => n !== item)
        : [...prev, item]
    );
  };

  const handleSelectPaciente = (paciente) => {
    setPacienteSelecionado(paciente);
  };

  const addMethodToInput = (item) => {
    setMetodosInput(prev => {
      const currentMethods = prev.split(',').map(m => m.trim()).filter(m => m !== '');
      if (currentMethods.includes(item)) {
        return prev;
      }
      return currentMethods.length > 0 ? `${prev}, ${item}` : item;
    });
  };

  const handleAddLink = (newLink) => {
    setLinksAnexados(prev => [...prev, newLink]);
    console.log("Link adicionado:", newLink);
  };

  const handleUploadFile = (file) => {
    // Simular o upload do arquivo
    console.log("Arquivo para upload:", file.name, file);
    setArquivosAnexados(prev => [...prev, { name: file.name, url: URL.createObjectURL(file) }]);
  };

  const handleRemoveLink = (indexToRemove) => {
    setLinksAnexados(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveFile = (indexToRemove) => {
    setArquivosAnexados(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do Plano:", {
      paciente: pacienteSelecionado,
      neurodivergenciasSelecionadas: neuroSelecionadas,
      descricaoNeuro: descNeuro,
      metodosAplicados: metodosInput,
      cronograma,
      objetivos,
      abordagemFamiliares,
      sobrePlano,
      linksAnexados,
      arquivosAnexados
    });
    alert("Plano criado com sucesso!");
    navigate('/plano-terapeutico-terapeuta'); 
  };

  return (
    <div className="criar-plano-page-container">
      <div className='sidebar-plano'>
        <IconVoltar to="/plano-terapeutico-terapeuta" className='link-voltar-sidebar'/>
        <IconSair to='/login' className='link-sair-sidebar' />
      </div>

      <main className="criar-plano-main-content">
        <header className="plano-header">
          <h1>{isEditing ? `Editar Plano Terapêutico #${idDoPlano}` : "Criar plano terapêutico"}</h1>
        </header>

        <div className="criar-plano-form-wrapper">
          <form className="criar-plano-form" onSubmit={handleSubmit}>

            <fieldset className="form-section">
              <CampoBuscaPaciente
                label="Selecione o paciente"
                onSelectPaciente={handleSelectPaciente}
                initialPatient={pacienteSelecionado} 
              />
            </fieldset>

            <fieldset className="form-section">
              <label>Selecione a neurodivergência do seu paciente:</label>
              <div className="chip-group">
                {neurodivergenciasOpcoes.map(item => (
                  <button
                    type="button"
                    key={item}
                    className={`chip neuro-chip ${neuroSelecionadas.includes(item) ? 'active' : ''}`}
                    onClick={() => handleChipClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="form-section">
               <label htmlFor="descNeuro">Descreva o grau da(s) neurodivergência(s) do paciente:</label>
               <textarea
                    id="descNeuro"
                    className="form-textarea"
                    placeholder="Descrição..."
                    rows={3}
                    value={descNeuro}
                    onChange={(e) => setDescNeuro(e.target.value)}
                ></textarea>
            </fieldset>

            <fieldset className="form-section">
              <label>Selecione os métodos a serem usados durante o acompanhamento</label>
               <input
                    type="text"
                    className="form-input-text"
                    placeholder="Digite os métodos separando por vírgula"
                    value={metodosInput}
                    onChange={(e) => setMetodosInput(e.target.value)}
                />
              <div className="chip-group method-chips">
                {metodosOpcoes.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    className="chip method-chip"
                    onClick={() => addMethodToInput(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="form-section">
               <label htmlFor="cronograma">Cronograma das atividades</label>
               <textarea
                    id="cronograma"
                    className="form-textarea"
                    placeholder="Breve descrição sobre o cronograma das atividades a serem desenvolvidas com o paciente."
                    rows={4}
                    value={cronograma}
                    onChange={(e) => setCronograma(e.target.value)}
                ></textarea>
            </fieldset>

            <fieldset className="form-section">
               <label htmlFor="objetivos">Objetivos do tratamento</label>
               <textarea
                    id="objetivos"
                    className="form-textarea"
                    placeholder="Breve descrição sobre os objetivos/metas do tratamento por categoria profissional."
                    rows={4}
                    value={objetivos}
                    onChange={(e) => setObjetivos(e.target.value)}
                ></textarea>
            </fieldset>

            <fieldset className="form-section">
               <label htmlFor="abordagem">Abordagem família/cuidadores/responsáveis:</label>
               <textarea
                    id="abordagem"
                    className="form-textarea"
                    placeholder="Breve descrição sobre os objetivos/metas junto aos familiares/cuidadores/responsáveis que auxiliará no cuidado em saúde do paciente."
                    rows={4}
                    value={abordagemFamiliares}
                    onChange={(e) => setAbordagemFamiliares(e.target.value)}
                ></textarea>
            </fieldset>

            <fieldset className="form-section">
               <label htmlFor="sobre">Sobre o Plano:</label>
               <textarea
                    id="sobre"
                    className="form-textarea"
                    placeholder="Mensagem"
                    rows={5}
                    value={sobrePlano}
                    onChange={(e) => setSobrePlano(e.target.value)}
                ></textarea>
            </fieldset>

            {/* Seção para exibir links e arquivos anexados */}
            {(linksAnexados.length > 0 || arquivosAnexados.length > 0) && (
              <fieldset className="form-section anexos-section">
                <label>Anexos:</label>
                {linksAnexados.length > 0 && (
                  <div className="anexos-list">
                    <h4>Links:</h4>
                    {linksAnexados.map((link, index) => (
                      <div key={index} className="anexo-item link-item">
                        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                        <button type="button" className="remove-anexo-btn" onClick={() => handleRemoveLink(index)}>X</button>
                      </div>
                    ))}
                  </div>
                )}
                {arquivosAnexados.length > 0 && (
                  <div className="anexos-list">
                    <h4>Arquivos:</h4>
                    {arquivosAnexados.map((file, index) => (
                      <div key={index} className="anexo-item file-item">
                        <span>{file.name}</span>
                        {file.url && <a href={file.url} target="_blank" rel="noopener noreferrer">Ver</a>}
                        <button type="button" className="remove-anexo-btn" onClick={() => handleRemoveFile(index)}>X</button>
                      </div>
                    ))}
                  </div>
                )}
              </fieldset>
            )}

            <fieldset className="form-section assinatura-section">
               <label>Clientes envolvidos</label>
               <p>Assinatura do terapeuta:</p>
               <p>Assinatura dos familiares:</p>
            </fieldset>

            {/* --- Barra de Ações Inferior --- */}
            <div className="action-bar">
               <div className="action-bar-left">
                   <button type="button" className="action-icon-btn" onClick={() => setIsUploadModalOpen(true)}>
                       <PiUploadSimpleBold />
                   </button>
                   <button type="button" className="action-icon-btn" onClick={() => setIsLinkModalOpen(true)}>
                       <PiLinkBold />
                   </button>
               </div>
               <div className="action-bar-right">
                   <button type="button" className="botao-cancelar-plano" onClick={() => navigate('/planos-terapeuta')}>Cancelar</button>
                   <button type="submit" className="botao-criar-plano">Criar plano</button>
               </div>
            </div>

          </form>
        </div>
      </main>

      {/* Renderiza os modais fora do formulário principal */}
      <AdicionarLinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onAddLink={handleAddLink}
      />
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadFile={handleUploadFile}
      />
    </div>
  );
}