import { IoMdNotificationsOutline } from 'react-icons/io'
import './tela-sessao.estilo.css'
import { BsPersonCircle } from 'react-icons/bs'
import { Botao } from './../../componentes/Botao/index';

export function TelaNovaSessao() {
    return (
        <main>
            <header className='header-tela-sessao'>
                <div className='div-img-nome'>
                    <img src="/logo-terapeuta.png" alt="" />
                    <p>Rodrigo Tripodi</p>
                </div>
                <div>
                    <IoMdNotificationsOutline fontSize={"40px"} color='#000000' />
                    <BsPersonCircle fontSize={"40px"} color='#000000' />
                </div>
            </header>
            <section>
                <h3>Sessões</h3>
                <p>3 de 3 sessões</p>
                <Botao>
                    + Nova Sessão
                </Botao>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3">Paciente</th>
                                <th className="p-3">Data/Hora</th>
                                <th className="p-3">Tipo</th>
                                <th className="p-3">Duração</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="p-3">Paciente não encontrado</td>
                                <td className="p-3">20/01/2025 07:00</td>
                                <td className="p-3">Individual</td>
                                <td className="p-3">60 min</td>
                                <td className="p-3 text-blue-500">Agendada</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    )
}