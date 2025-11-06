import React, { useState } from 'react';
import { CampoDeFormulario } from '../CampoDeFormulario';
import { Botao } from '../Botao';
import './form-cadastrar-paciente.estilo.css';

export function FormCadastrarPaciente({ onSucessoCadastro }) {
    const [formData, setFormData] = useState({
        nome: '',
        data_nascimento: '',
        cpf: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/cadastro/pacientes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                let mensagens = '';
                for (const campo in data) {
                    mensagens += `${campo}: ${data[campo].join(', ')}\n`;
                }
                alert(`Erro ao cadastrar paciente:\n${mensagens}`);
                return;
            }

            alert('Paciente cadastrado com sucesso!');
            setFormData({ nome: '', data_nascimento: '', cpf: '' }); // limpa formulário
            if (onSucessoCadastro) onSucessoCadastro();

        } catch (error) {
            alert('Erro na requisição: ' + error.message);
        }
    };

    return (
        <form className='campos-cadastrar-paciente' onSubmit={handleSubmit}>
            <div className='formulario-cadastrar-paciente'>
                <CampoDeFormulario>
                    <input
                        type='text'
                        name='nome'
                        placeholder='Digite o nome completo do paciente'
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='date'
                        name='data_nascimento'
                        placeholder='Data de nascimento'
                        value={formData.data_nascimento}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='text'
                        name='cpf'
                        placeholder='CPF do paciente'
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>
            </div>

            <div className='acoes-cadastrar-paciente'>
                <Botao type='submit'>Cadastrar Paciente</Botao>
            </div>
        </form>
    );
}
