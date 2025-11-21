import './campo-entrada.estilo.css'
export function CampoDeEntrada({ as: Component = "input", ...props }) {
    return <input {...props} className="form-input" />
}