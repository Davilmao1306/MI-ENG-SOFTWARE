import './botao.estilo.css'

export function Botao({ children, ...rest}) {
    return (
        <button className='botao' {...rest}>
            {children}
        </button>
    )

} 