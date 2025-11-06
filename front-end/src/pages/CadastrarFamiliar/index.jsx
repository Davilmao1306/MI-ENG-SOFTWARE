import React, { useState } from 'react'; // <--- IMPORTE O useState
import './cadastrar-familiar.estilo.css'
import { FormCadastrarFamiliar } from '../../componentes/FormCadastrarFamiliar'
import { IconSair } from '../../componentes/IconSair'
import { IconVoltar } from '../../componentes/IconVoltar'
import { useNavigate, useLocation } from 'react-router-dom';

export function CadastrarFamiliar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { pacienteId, returnTo } = location.state || {};

    // Remova estes estados daqui se eles estiverem sendo gerenciados dentro de FormCadastrarFamiliar
    // Se FormCadastrarFamiliar é um componente "burro" (só de apresentação) e você quer o estado aqui:
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [dataNascimento, setDataNascimento] = useState(''); // Exemplo, se você tem este campo
    const [grauParentesco, setGrauParentesco] = useState(''); // Exemplo
    const [telefone, setTelefone] = useState(''); // Exemplo
    const [senha, setSenha] = useState(''); // Exemplo
    const [confirmarSenha, setConfirmarSenha] = useState(''); // Exemplo


    const handleCadastro = async (formData) => { // <--- A função agora recebe um objeto formData
        // e.preventDefault() será chamado dentro do FormCadastrarFamiliar
        console.log("Cadastrando familiar:", formData); // Use formData
        const newFamiliar = { id: `f${Date.now()}`, ...formData }; // Simulação

        // Lógica real de cadastro do familiar na API
        // Exemplo: await api.post('/familiares', formData);

        if (pacienteId) {
            console.log(`Familiar ${formData.nome} cadastrado e pronto para vincular ao paciente ${pacienteId}`);
            // Lógica para vincular o familiar ao paciente (chame sua API de vínculo)
            // Exemplo: await api.post(`/pacientes/${pacienteId}/vincular-familiar`, { familiarId: newFamiliar.id });

            navigate('/pacientes');
        } else {
            navigate('/familiares'); // Volta para a lista de familiares, por exemplo
        }
    };

    const handleBack = () => {
        if (returnTo) {
            navigate(returnTo);
        } else {
            navigate(-1);
        }
    };

    return (
        <main className='cadastar-familiar'>
            <header className="cadastrar-familiar-cabecalho">
                <div className='barra-lateral'>
                    <IconVoltar onClick={handleBack} /> {/* <--- Use onClick e a função handleBack */}
                    <IconSair to='/login' />
                </div>
                <h1>Olá Clínica,{pacienteId ? <br /> : null} {pacienteId ? `Cadastre o familiar para o paciente ${pacienteId}!` : 'Cadastre o familiar!'}</h1>
            </header>
            <section className='form-cadastrar-familiar'>
                {/* <--- PASSE AS PROPS PARA O COMPONENTE FILHO */}
                <FormCadastrarFamiliar
                    onCadastroSubmit={handleCadastro}
                    // Se você for gerenciar os estados no pai, passe-os aqui:
                    // nome={nome} setNome={setNome}
                    // email={email} setEmail={setEmail}
                    // ...outros campos
                />
            </section>
            <section className='imagem-neurolink'>
                <img src="/neurolink-cadastro.png" alt="Logo Neurolink" />
            </section>
        </main>
    )
}