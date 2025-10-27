import './lista-terapeutas.estilo.css'
import { IconSair } from '../../componentes/IconSair';
import { IconVoltar } from '../../componentes/IconVoltar';
import { RxAvatar } from 'react-icons/rx';

import { ExibeLista } from '../../componentes/Terapeutas';


export function ListaTerapeutas() {
    /*Esperasse que venha de uma API*/
    const listaterapeutas = [
        {
            id: 1,
            icon: <RxAvatar fontSize={"40px"} />,
            nome: "Dr Fulano de tal",
            formacao: "Psicologo",
            idTerapeuta: "12"
        }
    ]
    return (
        <main>
            <header className='header-lista-terapeutas'>
                <h1>Terapeutas</h1>
                <IconVoltar to='/clinica' />
                <IconSair to='/login' />
            </header>
            <section className='section-lista-terapeutas'>
                <div className='search-lista-terapeutas'>
                    <input type="search" placeholder='Buscar por nome, CRP, CRM' />
                </div>
                <section className='section-de-exibir-terapeutas'>
                    <div className='filtros-lista-terapeutas'>
                        <p>Filtros</p>
                        <div className='label-checkbox-idade'>
                            <p> Especialidade </p>
                            <label htmlFor="dislexia " className='label-checkbox'>
                                <input type="checkbox" />
                                DISLEXIA
                            </label>
                            <label htmlFor='TDAH' className='label-checkbox'>
                                <input type="checkbox" />
                                TDAH
                            </label>
                            <label htmlFor='TOC' className='label-checkbox'>
                                <input type="checkbox" />
                                TOC
                            </label>
                        </div>
                        <label className='label-checkbox-neurodivergencia'>
                            <p>Métodos de tratamento</p>
                            <label htmlFor="ABA " className='label-checkbox'>
                                <input type="checkbox" />
                                ABA
                            </label>
                            <label htmlFor='TCC' className='label-checkbox'>
                                <input type="checkbox" />
                                TCC
                            </label>
                            <label htmlFor='TEA' className='label-checkbox'>
                                <input type="checkbox" />
                                TEA
                            </label>
                        </label>
                    </div>
                    <div className='exibe-lista-terapeutas'>
                        <ExibeLista classname={'exibe-terapeutas'} lista={listaterapeutas} />
                    </div>
                </section>
            </section>
            <section className='icon-lista-terapeutas'></section>
        </main>
    )
}