import React, { useState } from 'react';
import { CampoDeFormulario } from '../CampoDeFormulario';
import { Botao } from '../Botao';
import './form-cadastrar-terapeuta.estilo.css';

export function FormCadastrarTerapeuta({ onSucessoCadastro }) {
    const [formData, setFormData] = useState({
        nome: '',
        data_nascimento: '',
        telefone: '',
        crp: '',
        especialidade: '',
        email: '',
        senha: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/cadastro/terapeutas', {
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
                alert(`Erro ao cadastrar terapeuta:\n${mensagens}`);
                return;
            }

            alert('Terapeuta cadastrado com sucesso!');
            setFormData({
                nome: '',
                data_nascimento: '',
                telefone: '',
                crp: '',
                especialidade: '',
                email: '',
                senha: ''
            });

            if (onSucessoCadastro) onSucessoCadastro();

        } catch (error) {
            alert('Erro na requisição: ' + error.message);
        }
    };

    return (
        <form className='campos-cadastrar-terapeuta' onSubmit={handleSubmit}>
            <div className='formulario-cadastrar-terapeuta'>
                <CampoDeFormulario>
                    <input
                        type='text'
                        name='nome'
                        placeholder='Nome completo'
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
                        type='tel'
                        name='telefone'
                        placeholder='Telefone (DD) XXXXX-XXXX'
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='text'
                        name='crp'
                        placeholder='CRP do terapeuta'
                        value={formData.crp}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='text'
                        name='especialidade'
                        placeholder='Especialidade (ex: Psicólogo, Psiquiatra...)'
                        value={formData.especialidade}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='email'
                        name='email'
                        placeholder='E-mail do terapeuta'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='password'
                        name='senha'
                        placeholder='Senha'
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>
            </div>

            <div className='acoes-cadastrar-terapeuta'>
                <Botao type='submit'>Cadastrar Terapeuta</Botao>
            </div>
        </form>
    );
}
