import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, tipoPermitido }) {
    const token = localStorage.getItem("token");
    const tipo = localStorage.getItem("tipo");
    const id = localStorage.getItem("id_usuario");

    if (!token) {
        // usuário não autenticado → redireciona pro login
        return <Navigate to="/login" replace />;
    }

    if (tipoPermitido && tipo !== tipoPermitido) {
        // usuário autenticado, mas sem permissão
        return <Navigate to="/login" replace />;
    }

    // tudo certo → mostra a rota
    return children;
}
