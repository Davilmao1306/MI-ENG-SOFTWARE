import React from 'react';
import './estilo.css';


export function CampoDeEntrada({ type, name, placeholder, required }) {
return (
<input
className="campo-de-entrada"
type={type}
name={name}
placeholder={placeholder}
required={required}
/>
);
}