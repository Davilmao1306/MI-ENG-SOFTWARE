import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export function ProtectedRoute({ children, tipoPermitido }) {
    const token = localStorage.getItem("token");
    const tipo = localStorage.getItem("tipo");
    const id = localStorage.getItem("id_usuario");
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const decoded = jwtDecode(token);
            const expired = decoded.exp * 1000 < Date.now();

            if (expired) {
                console.log("Token expirado!");
                localStorage.removeItem("token");
                localStorage.removeItem("tipo");
                localStorage.removeItem("id_usuario");
                navigate("/login");
            } else {
                console.log("Token válido.");
            }

        } catch (e) {
            console.log("Token inválido!");
            navigate("/login");
        }
    }, [navigate]);
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
