import './diario-terapeuta.estilo.css'
import { IconSair } from '../../componentes/IconSair';
import { IconVoltar } from './../../componentes/IconVoltar/index';
import { ExibeLista } from './../../componentes/Terapeutas/index';

export function DiarioTerapeuta() {
    const paciente = [
        {
            nome: "Maria Cecília",
            idade: "10",
            neurodivergencia: "TDAH"
        }
    ]
    const registros = [
        {
            id: "1",
            titulo: "Praticando atividades fonoadiologas",
            autor: "Mãe",
            data: new Date().getTime(),
            descricao: "Fazendo atividades sugeridas pela fonoaudiologa para melhorar a fala da paciente"
        }
    ]
    return (
        <main>
            <header className='diario-terapeuta'>
                <IconVoltar to='/terapeuta'></IconVoltar>
                <div>
                    <h2>Diário compartilhado de observações</h2>
                </div>
            </header>
            <section className='section-diario-terapeuta'>
                <div>
                    <h3>
                        {paciente[0].nome}
                    </h3>
                    <p>
                        {paciente[0].idade + paciente[0].neurodivergencia}
                    </p>
                    <button>+ Novo registro</button>
                </div>
                <div>
                    <ExibeLista classname='lista-registros' lista={registros}/>
                </div>
                <div>
                    
                </div>
            </section>

        </main>
    )
}