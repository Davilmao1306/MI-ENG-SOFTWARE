import './tela-inicio-terapeuta.estilo.css'

export function TelaInicioTerapeuta() {
    return (
        <main className='main-tela-inicio-terapeuta'>
            <header className='header-tela-inicio-terapeuta'>
                <h2>Olá, Terapeuta X</h2>
                <div className='header-div-icons'>
                    <img src="/notifications.jpg" alt=" notificação" />
                    <img src="/avatar.jpg" alt=" avatar de perfil" />
                </div>
            </header>
            <section className='sec-filtro-tela-inicio-terapeuta'>
                <div className='div-filtragem'>
                    <p>Filtros</p>
                    <label className='label-checkbox-idade'>
                        <p> Faixa etaria </p>
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                    </label>
                    <label className='label-checkbox-neurodivergencia'>
                        <p>Neurodivergência</p>
                        <input type="checkbox" />
                        <input type="checkbox" />
                        <input type="checkbox" />
                    </label>
                </div>
                <div className='div-exibe-pacientes'>
                    <input type="search" placeholder='Search' />
                </div>
            </section>

        </main>
    )
}