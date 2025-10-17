import './botao.estilo.css'

export function Botao({ children }) {
    return (
        <button className='botao'>
            {children}
        </button>
    )

}