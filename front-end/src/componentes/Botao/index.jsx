import React from 'react';
import './estilo.css';


export function Botao({ type, children, onClick }) {
return (
<button className="botao" type={type} onClick={onClick}>
{children}
</button>
);
}