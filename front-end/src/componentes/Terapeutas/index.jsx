import { Link } from 'react-router-dom'
import './exibe-terapeutas.estilo.css'

export function ExibeLista({ className, lista }) {
    return (    
        <main className={className}>
            <div className="grid-terapeutas">
                {lista.map((terapeuta) => (
                    <div key={terapeuta.id} className="card-terapeuta">
                        <div className="icone">{terapeuta.icon}</div>
                        <p>
                            <strong>{terapeuta.nome}</strong>
                            {terapeuta.formacao}
                        </p>
                        <Link to={`/terapeuta/${terapeuta.idTerapeuta}`}>
                            <button className='button-ver-perfil'>Ver perfil</button>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    )
}