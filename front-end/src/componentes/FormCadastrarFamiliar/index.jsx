import React, { useState } from 'react';
import { CampoDeFormulario } from '../CampoDeFormulario';
import { Botao } from '../Botao';
import './form-cadastrar-familiar.estilo.css';

export function FormCadastrarFamiliar({ onSucessoCadastro }) {
    const emptyState = {
        nome: '',
        email: '',
        data_nascimento: '',
        grau_parentesco: '',
        telefone: '',
        senha: '',
        confirmar_senha: ''
    };
    
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        data_nascimento: '',
        grau_parentesco: '',
        telefone: '',
        senha: '',
        confirmar_senha: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação simples
        if (formData.senha !== formData.confirmar_senha) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/cadastro/familiares', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: formData.nome,
                    email: formData.email,
                    data_nascimento: formData.data_nascimento,
                    telefone: formData.telefone,
                    cpf: formData.cpf,
                    senha: formData.senha,
                    grau_parentesco: formData.grau_parentesco
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // Backend retornou erro de validação
                let mensagens = '';
                for (const campo in data) {
                    mensagens += `${campo}: ${data[campo].join(', ')}\n`;
                }
                alert(`Erro ao cadastrar familiar:\n${mensagens}`);
                return;
            }

            // Sucesso
            alert('Familiar cadastrado com sucesso!');
            if (onSucessoCadastro) onSucessoCadastro();
            setFormData(emptyState);

        } catch (error) {
            alert('Erro na requisição: ' + error.message);
        }
    };

    return (
        <form className='campos-cadastrar-familiar' onSubmit={handleSubmit}>
            <div className='formulario-cadastrar-familiar'>
                <CampoDeFormulario>
                    <input
                        type='text'
                        name='nome'
                        placeholder='Digite seu nome completo'
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='email'
                        name='email'
                        placeholder='Digite seu email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='date'
                        name='data_nascimento'
                        placeholder='Selecione sua data de nascimento'
                        value={formData.data_nascimento}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='text'
                        name='grau_parentesco'
                        placeholder='Grau de parentesco'
                        value={formData.grau_parentesco}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='tel'
                        name='telefone'
                        placeholder='(DD) XXXXX-XXXX'
                        value={formData.telefone}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='text'
                        name='cpf'
                        placeholder='Digite o CPF'
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='password'
                        name='senha'
                        placeholder='Digite sua senha'
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>

                <CampoDeFormulario>
                    <input
                        type='password'
                        name='confirmar_senha'
                        placeholder='Digite sua senha novamente'
                        value={formData.confirmar_senha}
                        onChange={handleChange}
                        required
                    />
                </CampoDeFormulario>
            </div>

            <div className='acoes-cadastrar-familiar'>
                <Botao type='submit'>Cadastrar Familiar</Botao>
            </div>
        </form>
    );
}
