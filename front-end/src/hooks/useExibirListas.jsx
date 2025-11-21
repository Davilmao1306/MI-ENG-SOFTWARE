import { useEffect, useState } from "react";

export function useExibirListas(url, setLista) {

    const fetchLista = () => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setLista(data))
            .catch((err) => console.error("Erro ao buscar lista:", err));
    };

    useEffect(() => {
        fetchLista();
    }, []);
    const lista = setLista
    return lista
}