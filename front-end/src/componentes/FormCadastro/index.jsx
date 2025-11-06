import React from 'react';
// Importando os blocos de Lego que seu colega já criou!
import { CampoDeEntrada } from '../CampoDeEntrada';
import { Botao } from '../Botao';
import './form-cadastro.estilo.css';

// O componente agora aceita uma propriedade "tipo"
export function FormCadastro({ tipo }) {
  // Define o título do formulário com base no tipo
  const titulo = `Cadastre seu ${tipo}!`;
  const textoBotao = `CADASTRAR`;

  return (
    <div className="form-wrapper">
      <header className="form-header">
        <h2>Olá Clínica,</h2>
        <h1>{titulo}</h1>
      </header>

      <form className="cadastro-form-container">
        {/* --- CAMPOS COMUNS A TODOS --- */}
        <CampoDeEntrada type="text" placeholder="Nome" />
        
        {tipo !== 'paciente' && <CampoDeEntrada type="email" placeholder="E-mail" />}
        {tipo === 'paciente' && <CampoDeEntrada type="text" placeholder="CPF" />}
        
        <CampoDeEntrada type="date" placeholder="Data de Nascimento" />

        {/* --- CAMPOS ESPECÍFICOS (Renderização Condicional) --- */}
        {tipo === 'terapeuta' && (
          <>
            <CampoDeEntrada type="text" placeholder="CRP/CRM" />
            <CampoDeEntrada type="tel" placeholder="Telefone comercial" />
          </>
        )}
        {tipo === 'paciente' && (
          <>
            <CampoDeEntrada type="tel" placeholder="Telefone" />
            <CampoDeEntrada type="text" placeholder="NeuroDivergência" />
          </>
        )}
        {tipo === 'familiar' && (
          <>
            <CampoDeEntrada type="text" placeholder="CPF" />
            <CampoDeEntrada type="text" placeholder="Grau de parentesco" />
            <CampoDeEntrada type="tel" placeholder="Telefone pessoal" />
          </>
        )}
        
        {/* Campos de senha aparecem para terapeuta e familiar */}
        {(tipo === 'terapeuta' || tipo === 'familiar') && (
          <>
            <CampoDeEntrada type="password" placeholder="Senha" />
            <CampoDeEntrada type="password" placeholder="Digite a senha novamente" />
          </>
        )}
        
        <Botao type="submit">
          {textoBotao}
        </Botao>
      </form>
    </div>
  );
}

