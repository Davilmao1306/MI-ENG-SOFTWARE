import { useState } from 'react';
import { PiUploadSimpleBold } from "react-icons/pi";
import { PiLinkBold } from "react-icons/pi";
import { CampoBuscaPaciente } from '../../componentes/CampoBuscaPaciente';
import { IconVoltar } from '../../componentes/IconVoltar';
import { IconSair } from '../../componentes/IconSair';
import './criar-plano.estilo.css';

export function CriarPlanoPage() {
  const neurodivergencias = ["TEA", "TAB", "TDAH", "TPN", "TOC", "Dislexia", "Discalculia", "Disgrafia", "Outros"];
  const metodos = ["Treinamento Parental", "Comunicação assistiva", "Terapia ocupacional", "Fonoaudiologia", "Terapia Comportamental Cognitiva"];
  const [neuroSelecionadas, setNeuroSelecionadas] = useState([]);

  const [descNeuro, setDescNeuro] = useState(''); // Para o textarea de descrição da neurodivergencia
  const [metodosInput, setMetodosInput] = useState(''); // Para o input de métodos

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


  // Adicionar método ao input de métodos, separados por vírgula
  const addMethodToInput = (item) => {
      setMetodosInput(prev => {
          // Separa os itens existentes, filtra vazios e remove espaços em branco
          const currentMethods = prev.split(',').map(m => m.trim()).filter(m => m !== '');

          // Se o item já existe na lista, não adiciona novamente
          if (currentMethods.includes(item)) {
              return prev;
          }

          // Adiciona o novo item
          return currentMethods.length > 0 ? `${prev}, ${item}` : item;
      });
  };

  return (
    <div className="criar-plano-page-container">
  
      <div className='sidebar-plano'>
        <IconVoltar to="/plano-terapeutico-terapeuta" className='link-voltar-sidebar'/>
        <IconSair to='/login' className='link-sair-sidebar' /> 
       
      </div>

      <main className="criar-plano-main-content">
        <header className="plano-header">
          <h1>Criar plano terapêutico</h1>
        </header>

        <div className="criar-plano-form-wrapper">
          <form className="criar-plano-form">

            <fieldset className="form-section">
              <CampoBuscaPaciente
                label="Selecione o paciente"
                onSelectPaciente={handleSelectPaciente}
              />
            </fieldset>

  
            <fieldset className="form-section">
              <label>Selecione a neurodivergência do seu paciente:</label>
              <div className="chip-group">
                {neurodivergencias.map(item => (
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
                    value={metodosInput} // Conecta o estado
                    onChange={(e) => setMetodosInput(e.target.value)} // Atualiza o estado ao digitar
                />
              <div className="chip-group method-chips">
                {metodos.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    className="chip method-chip"
                    onClick={() => addMethodToInput(item)} // Adiciona ao input
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

      
            <fieldset className="form-section">
               <label htmlFor="cronograma">Cronograma das atividade</label>
               <textarea id="cronograma" className="form-textarea" placeholder="Breve descrição sobre o cronograma das atividades a serem desenvolvidas com o paciente." rows={4}></textarea>
            </fieldset>
             <fieldset className="form-section">
               <label htmlFor="objetivos">Objetivos do tratamento</label>
               <textarea id="objetivos" className="form-textarea" placeholder="Breve descrição sobre os objetivos/metas do tratamento por categoria profissional." rows={4}></textarea>
            </fieldset>
             <fieldset className="form-section">
               <label htmlFor="abordagem">Abordagem família/cuidadores/responsáveis:</label>
               <textarea id="abordagem" className="form-textarea" placeholder="Breve descrição sobre os objetivos/metas junto aos familiares/cuidadores/responsáveis que auxiliará no cuidado em saúde do paciente." rows={4}></textarea>
            </fieldset>
             <fieldset className="form-section">
               <label htmlFor="sobre">Sobre o Plano:</label>
               <textarea id="sobre" className="form-textarea" placeholder="Mensagem" rows={5}></textarea>
            </fieldset>

      
             <fieldset className="form-section assinatura-section">
               <label>Clientes envolvidos</label>
               <p>Assinatura do terapeuta:</p>
               <p>Assinatura dos familiares:</p>
             </fieldset>

            {/* --- Barra de Ações Inferior --- */}
            <div className="action-bar">
               <div className="action-bar-left">
                   <button type="button" className="action-icon-btn"><PiUploadSimpleBold /></button>
                   <button type="button" className="action-icon-btn"><PiLinkBold /></button>
               </div>
               <div className="action-bar-right">
                   <button type="button" className="botao-cancelar-plano">Cancelar</button>
                   <button type="submit" className="botao-criar-plano">Criar plano</button>
               </div>
            </div>

          </form>
        </div> 
      </main>
    </div> 
  );
}