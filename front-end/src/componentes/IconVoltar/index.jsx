import { IoArrowBack } from 'react-icons/io5';
import { Link } from "react-router";
import './icon-voltar.estilo.css'

export function IconVoltar({ to }) {
    return (
        <Link to={to} >
            <IoArrowBack className="icon-voltar"/>
        </Link>
    )
}