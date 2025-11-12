import { useEffect, useState } from "react";

export function useExibirListas(url) {
    const [lista, setLista] = useState([]);


    useEffect(() => {
        if (!url) return; // evita erro se a URL for undefined

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erro ao buscar lista");
                }
                return res.json();
            })
            .then((data) => {
                setLista(data);
            })
            .catch((err) => {
                console.error("Erro ao buscar lista:", err);
                setLista([]); // evita erro de renderização se falhar
            });
    }, [url]);

    return lista
}