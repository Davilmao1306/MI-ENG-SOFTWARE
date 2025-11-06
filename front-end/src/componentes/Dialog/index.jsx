import React, { useEffect, useRef } from "react";
import './dialog.estilo.css'
import { Botao } from "../Botao";

export function Dialog({ isOpen, onClose, children }) {
    const dialog = document.querySelector("dialog");

    const dialogRef = useRef(null)

    useEffect(() => {
        if (isOpen) {
            openDialog()
        } else {
            closeDialog()
        }
    }, [isOpen])
    // "Show the dialog" button opens the dialog modally
    const openDialog = () => {
        dialogRef.current.showModal();
    };

    // "Close" button closes the dialog
    const closeDialog = () => {
        dialogRef.current.close();
    };

    return (
        <React.Fragment>
            <dialog ref={dialogRef} className="dialog">
                {children}
                <div className="btn-dlog">
                    <Botao className="botao-dialog" autoFocus onClick={closeDialog}>
                        Continuar
                    </Botao>
                </div>
            </dialog>
        </React.Fragment>
    )
}