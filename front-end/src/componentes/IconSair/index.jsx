import { PiSignOutBold } from 'react-icons/pi';
import './icon-sair.estilo.css'
import { Link } from "react-router";

export function IconSair({ to }) {

    return (
        <Link to={to} className="icon-sair">
            <PiSignOutBold /> Sair
        </Link>
    )
}