import React from "react";
import Draggable from "react-draggable";
import { obtenerEntrenador } from "../utils/utils";

const ProfileWindows = ({}) => {
    let entrenador = obtenerEntrenador();
    console.log(entrenador);
    return (
            <div className="profile">
                <div className="container">
                    <div className="clienteData">
                        <div className="trainerName">{entrenador.nombreMostrado}</div>
                        <br />
                        <div className="dataContainer">
                            <label className="clientInformationLabel" htmlFor="clientEmail">Email:</label>
                            <span id="clientEmail" className="clientInformation">EmailEntrenador  </span>
                        </div>
                        <br />
                        <div className="dataContainer">
                            <label className="clientInformationLabel" htmlFor="clientAge">Edad:</label>
                            <span id="clientAge" className="clientInformation"> EntrenadorEdad </span>
                        </div>
                        <br />
                        <div className="dataContainer">
                            <label className="clientInformationLabel" htmlFor="clientBirthdate">Fecha de Nacimiento:</label>
                            <span id="clientBirthdate" className="clientInformation"> EntrenadorFechaNacimiento</span>
                        </div>
                        <br />
                    </div>

                </div>
            </div>
    );
};


export default ProfileWindows;
