import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PiUploadSimpleBold, PiLinkBold } from "react-icons/pi";
import { IconVoltar } from '../../componentes/IconVoltar';
import { IconSair } from '../../componentes/IconSair';
import { UploadModal } from '../../componentes/UploadModal';
import './criar-plano.estilo.css'; // Reutilizando estilo de criar

export function EditarPlanoPage() {
    const { idPlano } = useParams(); // Pega o ID da URL
    const navigate = useNavigate();

    // Estados dos campos
    const [pacienteNome, setPacienteNome] = useState('Carregando...');
    const [descNeuro, setDescNeuro] = useState(''); // Texto livre
    const [metodosInput, setMetodosInput] = useState(''); // Texto livre
    const [cronograma, setCronograma] = useState('');
    const [objetivos, setObjetivos] = useState('');
    const [abordagemFamiliares, setAbordagemFamiliares] = useState('');

    // Estados para listas (checkboxes/selects) vindos do banco
    // const [idsNeuroSelecionados, setIdsNeuroSelecionados] = useState([]);

    const [arquivos, setArquivos] = useState([]); // Novos arquivos para upload
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

    // 1. Carregar dados do Plano ao abrir a tela
    useEffect(() => {
        const fetchPlano = async () => {
            try {
                // Ajuste a URL conforme seu urls.py
                const response = await fetch(`http://localhost:8000/plano/${idPlano}`);
                if (!response.ok) throw new Error('Erro ao buscar plano');

                const data = await response.json();

                // Preenche os estados com o que veio do banco
                // Ajuste as chaves (data.nome_paciente) conforme o JSON que seu backend retorna
                setPacienteNome(data.nome_paciente || 'Paciente');
                setDescNeuro(data.neurodivergencia || '');
                setMetodosInput(data.metodos_utilizados || '');
                setCronograma(data.cronograma_atividades || '');
                setObjetivos(data.objetivos_tratamento || '');
                setAbordagemFamiliares(data.abordagem_familiares || '');

            } catch (error) {
                console.error("Erro:", error);
                alert("Erro ao carregar dados do plano.");
            }
        };

        if (idPlano) fetchPlano();
    }, [idPlano]);

    const handleUploadFile = (files) => {
        setArquivos([...arquivos, ...files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Cria o objeto para envio
        const dadosAtualizados = {
            objetivos_tratamento: objetivos,
            metodos_utilizados: metodosInput,
            cronograma_atividades: cronograma,
            neurodivergencia: descNeuro,
            abordagem_familiares: abordagemFamiliares,
            // ids_neuro: idsNeuroSelecionados, // Se implementar multiselect
        };

        try {
            // Chama a rota de atualização criada no passo 2
            const response = await fetch(`http://localhost:8000/plano/atualizar/${idPlano}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Token ...` se tiver login
                },
                body: JSON.stringify(dadosAtualizados),
            });

            if (response.ok) {
                alert('Plano atualizado com sucesso!');
                navigate('/planos-terapeuta'); // Volta para a lista
            } else {
                const errorData = await response.json();
                alert('Erro ao atualizar: ' + (errorData.detail || 'Erro desconhecido'));
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão ao salvar.');
        }
    };

    return (
        <div className="criar-plano-layout">
            <main className="criar-plano-main-content">
                <div className="header-top">
                    <IconVoltar />
                    <h2>Editar Plano Terapêutico</h2>
                    <IconSair />
                </div>

                <div className="form-container">
                    <form onSubmit={handleSubmit}>

                        {/* Campo Paciente (Apenas leitura na edição) */}
                        <fieldset className="fieldset-dados-paciente">
                            <legend>Paciente</legend>
                            <input
                                type="text"
                                value={pacienteNome}
                                disabled
                                className="input-bloqueado"
                                style={{ backgroundColor: '#e9ecef', color: '#6c757d' }}
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Objetivos do Tratamento</legend>
                            <textarea
                                value={objetivos}
                                onChange={(e) => setObjetivos(e.target.value)}
                                className="textarea-padrao"
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Neurodivergência (Descrição)</legend>
                            <input
                                type="text"
                                value={descNeuro}
                                onChange={(e) => setDescNeuro(e.target.value)}
                                className="input-padrao"
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Métodos Utilizados</legend>
                            <textarea
                                value={metodosInput}
                                onChange={(e) => setMetodosInput(e.target.value)}
                                className="textarea-padrao"
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Cronograma</legend>
                            <textarea
                                value={cronograma}
                                onChange={(e) => setCronograma(e.target.value)}
                                className="textarea-padrao"
                            />
                        </fieldset>

                        <fieldset>
                            <legend>Abordagem para Familiares</legend>
                            <textarea
                                value={abordagemFamiliares}
                                onChange={(e) => setAbordagemFamiliares(e.target.value)}
                                className="textarea-padrao"
                            />
                        </fieldset>

                        {/* Botões de Ação */}
                        <div className="action-bar">
                            <div className="action-bar-left">
                                {/* Botão de Upload (se quiser permitir adicionar mais arquivos na edição) */}
                                <button type="button" className="action-icon-btn" onClick={() => setIsUploadModalOpen(true)}>
                                    <PiUploadSimpleBold />
                                </button>
                            </div>
                            <div className="action-bar-right">
                                <button type="button" className="botao-cancelar-plano" onClick={() => navigate('/planos-terapeuta')}>Cancelar</button>
                                <button type="submit" className="botao-criar-plano">Salvar Alterações</button>
                            </div>
                        </div>

                    </form>
                </div>
            </main>

            <UploadModal
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onUploadFile={handleUploadFile}
            />
        </div>
    );
}