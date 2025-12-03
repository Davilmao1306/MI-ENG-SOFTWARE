import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PiUploadSimpleBold, PiLinkBold } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
import { IconVoltar } from '../../componentes/IconVoltar';
import './editar-plano.estilo.css';
import { AdicionarLinkModal } from '../../componentes/AdicionarLinkModal';
import { UploadModal } from '../../componentes/UploadModal';
import { IconSair } from '../../componentes/IconSair';

export function EditarPlanoPage() {
    const { id_paciente,id_plano } = useParams();
    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);
    const [pacienteNome, setPacienteNome] = useState('');
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [linksAnexados, setLinksAnexados] = useState([]);
    const [arquivosAnexados, setArquivosAnexados] = useState([]);


    const opcoesNeuro = ["TEA", "TAB", "TDAH", "TPN", "TOC", "Dislexia", "Discalculia", "Disgrafia", "Outros"];
    const [neuroSelecionadas, setNeuroSelecionadas] = useState([]);
    const [descNeuro, setDescNeuro] = useState('');


    const [metodos, setMetodos] = useState([]);
    const [metodoInput, setMetodoInput] = useState('');

    const [cronograma, setCronograma] = useState('');
    const [objetivos, setObjetivos] = useState('');
    const [abordagemFamiliares, setAbordagemFamiliares] = useState('');
    const [sobrePlano, setSobrePlano] = useState('');

    const handleAddLink = (newLink) => {
        setLinksAnexados(prev => [...prev, newLink]);
    };

    const handleUploadFile = (file) => {
        setArquivosAnexados(prev => [
            ...prev,
            {
                name: file.name,
                url: URL.createObjectURL(file),
                fileOriginal: file
            }
        ]);
    };

    useEffect(() => {
        const fetchPlano = async () => {
            try {

                const response = await fetch(`http://localhost:8000/plano/plano/${id_plano}`);
                if (!response.ok) throw new Error('Erro ao buscar');
                const data = await response.json();

                setPacienteNome(data.paciente_nome);
                setDescNeuro(data.grau_neurodivergencia || '');
                setCronograma(data.cronograma_atividades || '');
                setObjetivos(data.objetivos_tratamento || '');
                setAbordagemFamiliares(data.abordagem_familia || '');
                setSobrePlano(data.mensagem_plano || '');


                if (data.lista_neurodivergencias) {
                    setNeuroSelecionadas(data.lista_neurodivergencias.map(n => n.sigla));
                }
                if (data.lista_metodos) {
                    setMetodos(data.lista_metodos);
                }

            } catch (error) {
                console.error("Erro:", error);
                alert("Erro ao carregar os dados do plano.");
            } finally {
                setLoading(false);
            }
        };

        if (id_plano) fetchPlano();
    }, [id_plano]);



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

        // Monta o JSON igual ao que definimos no Serializer 'EditarPlanoIn'
        const dadosAtualizados = {
            grau_neurodivergencia: descNeuro,
            objetivos_tratamento: objetivos,
            abordagem_familia: abordagemFamiliares,
            cronograma_atividades: cronograma,
            mensagem_plano: sobrePlano,

            // Listas
            lista_neurodivergencias: neuroSelecionadas,
            lista_metodos: metodos
        };

        try {
            const response = await fetch(`http://localhost:8000/plano/plano/editar/${id_plano}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dadosAtualizados)
            });

            if (!response.ok) {
                const erro = await response.json();
                throw new Error(erro.detail || "Erro ao atualizar");
            }

            alert("Plano atualizado com sucesso!");
            navigate(-1);

        } catch (error) {
            console.error("Erro ao salvar:", error);
            alert("Erro ao salvar as alterações: " + error.message);
        }
    };
    if (loading) return <div className="loading-container">Carregando dados do plano...</div>;

    return (
        <div className="editar-plano-container">

            <div className='sidebar-plano'>
                <IconVoltar to={`/terapeuta/paciente/${id_paciente}/plano-terapeutico-terapeuta`} />
                <IconSair to='/login' className='link-sair-sidebar' />
            </div>

            <main className="editar-plano-main-content">
                <header className="plano-header">
                    <h1>Editando Plano: {pacienteNome}</h1>
                </header>

                <form onSubmit={handleSubmit} className="form-plano">

                    {/* Neurodivergências */}
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

                    {/* Descrição Neuro */}
                    <div className="form-group">
                        <label>Descreva o grau da(s) neurodivergência(s):</label>
                        <textarea
                            className="form-textarea"
                            rows={3}
                            value={descNeuro}
                            onChange={e => setDescNeuro(e.target.value)}
                        />
                    </div>

                    {/* Métodos */}
                    <div className="form-group">
                        <label>Métodos utilizados (pressione Enter para adicionar):</label>
                        <div className="metodos-container">
                            <input
                                type="text"
                                className="form-input-text"
                                placeholder="Digite e dê Enter..."
                                value={metodoInput}
                                onChange={e => setMetodoInput(e.target.value)}
                                onKeyDown={handleMetodoKeyDown}
                            />
                            <div className="tags-list">
                                {metodos.map((metodo, idx) => (
                                    <span key={idx} className="tag-roxa">
                                        {metodo}
                                        <IoMdClose
                                            className="tag-close-icon"
                                            onClick={() => removeMetodo(metodo)}
                                        />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Cronograma */}
                    <div className="form-group">
                        <label>Cronograma das atividades:</label>
                        <textarea
                            className="form-textarea"
                            rows={4}
                            value={cronograma}
                            onChange={e => setCronograma(e.target.value)}
                        />
                    </div>

                    {/* Objetivos */}
                    <div className="form-group">
                        <label>Objetivos do tratamento:</label>
                        <textarea
                            className="form-textarea"
                            rows={4}
                            value={objetivos}
                            onChange={e => setObjetivos(e.target.value)}
                        />
                    </div>

                    {/* Abordagem */}
                    <div className="form-group">
                        <label>Abordagem família/cuidadores:</label>
                        <textarea
                            className="form-textarea"
                            rows={4}
                            value={abordagemFamiliares}
                            onChange={e => setAbordagemFamiliares(e.target.value)}
                        />
                    </div>

                    {/* Sobre o Plano */}
                    <div className="form-group">
                        <label>Mensagem / Sobre o Plano:</label>
                        <textarea
                            className="form-textarea"
                            rows={5}
                            value={sobrePlano}
                            onChange={e => setSobrePlano(e.target.value)}
                        />
                    </div>
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

                    <div className="footer-actions">
                        <div className="left-icons">

                            <button type="button" className="icon-box blue" onClick={() => setIsUploadModalOpen(true)}><PiUploadSimpleBold /></button>
                            <button type="button" className="icon-box blue" onClick={() => setIsLinkModalOpen(true)}><PiLinkBold /></button>
                        </div>
                        <div className="right-buttons">
                            <button type="button" className="btn-cancelar" onClick={() => navigate(-1)}>Cancelar</button>
                            <button type="submit" className="btn-salvar">Salvar Alterações</button>
                        </div>
                    </div>
                </form>
            </main>
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