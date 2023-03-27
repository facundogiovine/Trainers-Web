import React from "react";
import Draggable from "react-draggable";
import Button from "@mui/material/Button";

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
                        <div className="clienteName">{clienteSeleccionado.nombres} {clienteSeleccionado.apellidos}</div>
                        <br />
                        <div className="dataContainer">
                            <label className="clientInformationLabel" htmlFor="clientEmail">Email:</label>
                            <span id="clientEmail" className="clientInformation"> {clienteSeleccionado.email}</span>
                        </div>
                        <br />
                        <div className="dataContainer">
                            <label className="clientInformationLabel" htmlFor="clientAge">Edad:</label>
                            <span id="clientAge" className="clientInformation"> {calculateAge(clienteSeleccionado.fechaNacimiento)}</span>
                        </div>
                        <br />
                        <div className="buttonContainer">
                            <Button variant="contained" sx={{ color: 'white' }} size="large" style={{ margin: "0 auto", display: "block" }}>
                                Desvincular
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </Draggable>
    );
};


export default ClienteWindows;
