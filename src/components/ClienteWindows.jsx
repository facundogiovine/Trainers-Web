import React from "react";
import Draggable from "react-draggable";

const ClienteWindows = ({ close, clienteSeleccionado }) => {
    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <Draggable>
            <div className="clienteWindows">
                <div className="container">
                    <button className="closeButton" onClick={close}>&times;</button>
                    <div className="clienteData">
                        <span className="clienteName">{clienteSeleccionado.nombres} {clienteSeleccionado.apellidos}</span>
                        <span className="clienteAge">Edad: {calculateAge(clienteSeleccionado.fechaNacimiento)}</span>
                        <span className="clienteBirthDate">Fecha de Nacimiento: {clienteSeleccionado.fechaNacimiento}</span>
                        <span className="clienteEmail">Email: {clienteSeleccionado.email}</span>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};


export default ClienteWindows;
