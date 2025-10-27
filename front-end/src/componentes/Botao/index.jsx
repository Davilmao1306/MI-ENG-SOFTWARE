import './botao.estilo.css'

export function Botao({ tipo, children}) {
    return (
        <button type={tipo} className='botao'>
            {children}
        </button>
    )

}