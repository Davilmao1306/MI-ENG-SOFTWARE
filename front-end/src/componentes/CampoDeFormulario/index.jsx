import './campo-form.estilo.css'
export function CampoDeFormulario({ children }) {
    return (
        <fieldset className="input-group">
            {children}
        </fieldset>
    )
}