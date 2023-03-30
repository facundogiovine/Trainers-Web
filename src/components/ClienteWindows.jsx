import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Typography, Divider, Avatar, InputLabel } from "@mui/material";
import { obtenerEntrenador } from "../utils/utils";

const ClienteWindows = ({ close, clienteSeleccionado }) => {
    const navigate = useNavigate();
    const [clientePfp, setClientePfp] = useState(null);
    const [preferencias, setPreferencias] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const entrenador = obtenerEntrenador();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('http://localhost:8080/api/v1/pregunta/preferencias');
                const jsonData = await response.json();
                setPreferencias(jsonData);
                setDataLoaded(true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const calculateAge = (birthday) => {
        const birthDate = new Date(birthday);
        const ageDifMs = Date.now() - birthDate.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    useEffect(() => {
        async function fetchClientePfp() {
            const response = await fetch(`http://localhost:8080/api/v1/imagen/imagen?idPersona=${clienteSeleccionado.id}&tipoPersona=CLIENTE&tipoImagen=FOTO_PERFIL`);
            const data = await response.json();
            const { base64 } = data;
            setClientePfp(base64);
        }

        fetchClientePfp();
    }, [clienteSeleccionado.id]);


    // console.log(clienteSeleccionado.preferencias)

    const handleUnmatch = async () => {
        const data = { idCliente: clienteSeleccionado.id, idEntrenador: entrenador.id };
        try {
          const response = await fetch("http://localhost:8080/api/v1/match/unmatch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          // handle successful response here
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
          // handle error here
        }
        navigate(0)
        
      };


    return (
        <Draggable>
            <div className="clienteWindows">
                <div className="container">
                    <button className="closeButton" onClick={close}>&times;</button>
                    <div className="clienteData" >
                        <Avatar
                            alt=""
                            src={`data:image/png;base64,${clientePfp}`}
                            sx={{ width: '200px', height: '200px', marginLeft: 'auto', marginRight: 'auto' }}
                        />
                        <Typography
                            variant="h4"
                            gutterBottom
                            component="div"
                            color="primary"
                            sx={{ textAlign: "center", fontWeight: 500 }}
                        >
                            {clienteSeleccionado.nombreMostrado}
                        </Typography>
                        <Divider />
                        <Typography
                            variant="h6"
                            gutterBottom
                            component="div"
                            sx={{ fontWeight: "400", textAlign: "center", margin: "auto", width: '400px' }}
                        >
                            {clienteSeleccionado.descripcion}
                        </Typography>

                        <div className="flex flex-col gap-2">


                            <div>
                                <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
                                    Correo electrónico:
                                </InputLabel>{" "}
                                <Typography variant="body1" component="span" color="textPrimary">
                                    {clienteSeleccionado.email}
                                </Typography>
                            </div>

                            <div>
                                <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
                                    Fecha de nacimiento:
                                </InputLabel>{" "}
                                <Typography variant="body1" component="span" color="textPrimary">
                                    {clienteSeleccionado.fechaNacimiento}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            {clienteSeleccionado.preferencias.map((preferencia) => {
                                const prefData = preferencias.find(p => p.preferencia === preferencia.preferencia);
                                if (prefData && preferencia.preferencia !== "SEXO_ENTRENADOR" ) {
                                    const opcion = prefData.opciones.find(o => o.id === preferencia.valor);
                                    if (opcion) {
                                        let preferenciaLabel = preferencia.preferencia;
                                        if (preferencia.preferencia === "EXPERIENCIA_DISCIPLINA") {
                                            preferenciaLabel = "EXPERIENCIA EN LA DISCIPLINA";
                                        } else if (preferencia.preferencia === "CONDICION_SALUD") {
                                            preferenciaLabel = "CONDICION DE SALUD";
                                        }
                                        return (
                                            <div>
                                                <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
                                                    {preferenciaLabel}:
                                                </InputLabel>{" "}
                                                <Typography variant="body1" component="span" color="textPrimary">
                                                    {opcion.texto}
                                                </Typography>
                                            </div>
                                        );
                                    }
                                }
                            })}
                        </div>

                        <div className="buttonContainer">
                            <Button onClick={handleUnmatch} variant="contained" sx={{ color: 'white' }} size="large" style={{ margin: "0 auto", display: "block" }}>
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
