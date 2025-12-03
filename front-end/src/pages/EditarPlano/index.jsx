import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PiUploadSimpleBold, PiLinkBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { IconVoltar } from '../../componentes/IconVoltar';
// Certifique-se de importar o arquivo CSS correto
import './editar-plano.estilo.css'; 

export function EditarPlanoPage() {
    const { idPlano } = useParams();
    const navigate = useNavigate();

    // --- ESTADOS ---
    const [pacienteNome, setPacienteNome] = useState('Carregando...');
    
    // Neurodivergências (Lista de opções e seleção)
    const opcoesNeuro = ["TEA", "TAB", "TDAH", "TPN", "TOC", "Dislexia", "Discaústica", "Disgrafia", "Outros"];
    const [neuroSelecionadas, setNeuroSelecionadas] = useState([]); 
    const [descNeuro, setDescNeuro] = useState(''); // "Descreva o grau..."

    // Métodos (Tags)
    const [metodos, setMetodos] = useState([]); 
    const [metodoInput, setMetodoInput] = useState('');

    const [cronograma, setCronograma] = useState('');
    const [objetivos, setObjetivos] = useState('');
    const [abordagemFamiliares, setAbordagemFamiliares] = useState('');
    const [sobrePlano, setSobrePlano] = useState('');

    // --- CARREGAMENTO ---
    useEffect(() => {
        const fetchPlano = async () => {
            try {
                // Simulação de fetch (Substitua pela sua URL real)
                const response = await fetch(`http://localhost:8000/plano/${idPlano}`);
                if (!response.ok) throw new Error('Erro ao buscar');
                const data = await response.json();

                setPacienteNome(data.nome_paciente || 'Paciente Teste');
                setDescNeuro(data.neurodivergencia_descricao || ''); // Ajuste conforme seu backend
                setCronograma(data.cronograma_atividades || '');
                setObjetivos(data.objetivos_tratamento || '');
                setAbordagemFamiliares(data.abordagem_familiares || '');
                setSobrePlano(data.sobre_plano || '');

                // Se o backend retornar as neuros e métodos como string separada por virgula, convertemos para array
                if (data.neurodivergencias) {
                    setNeuroSelecionadas(typeof data.neurodivergencias === 'string' ? data.neurodivergencias.split(',') : data.neurodivergencias);
                }
                if (data.metodos_utilizados) {
                    setMetodos(typeof data.metodos_utilizados === 'string' ? data.metodos_utilizados.split(',') : data.metodos_utilizados);
                }

            } catch (error) {
                console.error("Erro:", error);
            }
        };
        if (idPlano) fetchPlano();
    }, [idPlano]);

    // --- HANDLERS ---

    // Alternar seleção dos botões de Neuro
    const toggleNeuro = (neuro) => {
        if (neuroSelecionadas.includes(neuro)) {
            setNeuroSelecionadas(neuroSelecionadas.filter(item => item !== neuro));
        } else {
            setNeuroSelecionadas([...neuroSelecionadas, neuro]);
        }
    };

    // Adicionar método como Tag ao pressionar Enter ou Vírgula
    const handleMetodoKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const novoValor = metodoInput.trim().replace(',', '');
            if (novoValor && !metodos.includes(novoValor)) {
                setMetodos([...metodos, novoValor]);
                setMetodoInput('');
            }
        }
    };

    // Remover Tag de método
    const removeMetodo = (metodoParaRemover) => {
        setMetodos(metodos.filter(m => m !== metodoParaRemover));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dadosAtualizados = {
            neurodivergencias: neuroSelecionadas, // Envia array ou converte .join(',') se o back esperar string
            neurodivergencia_descricao: descNeuro,
            metodos_utilizados: metodos, 
            cronograma_atividades: cronograma,
            objetivos_tratamento: objetivos,
            abordagem_familiares: abordagemFamiliares,
            sobre_plano: sobrePlano
        };
        console.log("Enviando:", dadosAtualizados);
        // ... Lógica de fetch PUT aqui ...
    };

    return (
        <div className="editar-plano-container">
            <header className="header-simples">
               {/* Se quiser o titulo fora do form */}
            </header>

            <form onSubmit={handleSubmit} className="form-plano">
                
                {/* 1. Selecione o Paciente */}
                <div className="form-group">
                    <label>Selecione o paciente</label>
                    <div className="input-fake-select">
                        {pacienteNome}
                        <span className="icon-list">☰</span>
                    </div>
                </div>

                {/* 2. Neurodivergência (Botões) */}
                <div className="form-group">
                    <label>Selecione a neurodivergência do seu paciente:</label>
                    <div className="neuro-grid">
                        {opcoesNeuro.map(neuro => (
                            <button
                                type="button"
                                key={neuro}
                                className={`btn-neuro ${neuroSelecionadas.includes(neuro) ? 'active' : ''}`}
                                onClick={() => toggleNeuro(neuro)}
                            >
                                {neuro}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Grau / Descrição */}
                <div className="form-group">
                    <label>Descreva o grau da(s) neurodivergência(s) do paciente:</label>
                    <input 
                        className="input-gray" 
                        placeholder="mensagem..." 
                        value={descNeuro}
                        onChange={e => setDescNeuro(e.target.value)}
                    />
                </div>

                {/* 4. Métodos (Tags) */}
                <div className="form-group">
                    <label>Selecione os métodos a serem usados durante o acompanhamento</label>
                    <div className="metodos-container">
                        <input
                            type="text"
                            className="input-transparent"
                            placeholder="Digite os métodos separando por virgula"
                            value={metodoInput}
                            onChange={e => setMetodoInput(e.target.value)}
                            onKeyDown={handleMetodoKeyDown}
                        />
                        <div className="tags-list">
                            {metodos.map((metodo, idx) => (
                                <span key={idx} className="tag-roxa">
                                    {metodo}
                                    {/* Opcional: botão de fechar na tag */}
                                    {/* <IoMdClose onClick={() => removeMetodo(metodo)} /> */} 
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. Cronograma */}
                <div className="form-group">
                    <label>Cronograma da atividade</label>
                    <textarea 
                        className="textarea-gray" 
                        placeholder="Breve descrição sobre o cronograma..."
                        value={cronograma}
                        onChange={e => setCronograma(e.target.value)}
                    />
                </div>

                {/* 6. Objetivos */}
                <div className="form-group">
                    <label>Objetivos do tratamento</label>
                    <textarea 
                        className="textarea-gray" 
                        placeholder="Breve descrição sobre os objetivos..."
                        value={objetivos}
                        onChange={e => setObjetivos(e.target.value)}
                    />
                </div>

                {/* 7. Abordagem Familiar */}
                <div className="form-group">
                    <label>Abordagem família/cuidadores/responsáveis:</label>
                    <textarea 
                        className="textarea-gray" 
                        placeholder="Breve descrição sobre os objetivos/metas junto aos familiares..."
                        value={abordagemFamiliares}
                        onChange={e => setAbordagemFamiliares(e.target.value)}
                    />
                </div>

                 {/* 8. Sobre o Plano */}
                 <div className="form-group">
                    <label>Sobre o Plano:</label>
                    <textarea 
                        className="textarea-gray big" 
                        placeholder="Mensagem"
                        value={sobrePlano}
                        onChange={e => setSobrePlano(e.target.value)}
                    />
                </div>

                {/* Área de Assinaturas (Visual apenas) */}
                <div className="assinaturas-section">
                    <p><strong>Clientes envolvidos</strong></p>
                    <p><strong>Assinatura do terapeuta:</strong></p>
                    <p><strong>Assinatura dos familiares:</strong></p>
                </div>

                {/* Footer de Ações */}
                <div className="footer-actions">
                    <div className="left-icons">
                        <button type="button" className="icon-box blue"><PiUploadSimpleBold /></button>
                        <button type="button" className="icon-box blue"><PiLinkBold /></button>
                    </div>
                    <div className="right-buttons">
                        <button type="button" className="btn-cancelar" onClick={() => navigate(-1)}>Cancelar</button>
                        <button type="submit" className="btn-salvar">Salvar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}