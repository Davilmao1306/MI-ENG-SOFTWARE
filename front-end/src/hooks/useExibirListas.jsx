import { useEffect, useState } from "react";

export function useExibirListas(url) {
    const [lista, setLista] = useState([]);
    const fetchLista = () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setLista(data))
            .catch((err) => console.error("Erro ao buscar lista:", err));
    };

    useEffect(() => {
        fetchLista();
    }, []);

    return lista
}