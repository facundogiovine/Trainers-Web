import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import logo from "../images/logo.png";
import { Select, InputLabel, MenuItem } from "@mui/material";
import { obtenerEntrenador } from "../utils/utils";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Profile = () => {
  const entrenador = obtenerEntrenador();
  const [questionList, setQuestionList] = useState({ data: [] });
  const [parametros, setParametros] = useState([]);
  const [answers, setAnswers] = useState([
    {
      "parametro": "DEPORTE",
      "valorParametro": null
    },
    {
      "parametro": "MODALIDAD",
      "valorParametro": null
    },
    {
      "parametro": "LOCALIZACION",
      "valorParametro": null
    },
    {
      "parametro": "HORARIO",
      "valorParametro": null
    },
    {
      "parametro": "CONDICION_SALUD",
      "valorParametro": null
    }
  ]);

  const recibirParametrosEntrenador = async (entrenadorId) => {
    const endpoint = `http://localhost:8080/api/v1/entrenador/entrenador/${entrenadorId}/parametros`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error('Error al recibir los parámetros del entrenador');
    }
  
    const parametros = await response.json();
    return parametros;
  }
  useEffect(() => {
    const fetchParametros = async () => {
      const params = await recibirParametrosEntrenador(entrenador.id);
      setParametros(params);
    };
    fetchParametros();
  }, []);
  
  const getQuestionList = async () => {
    setQuestionList({ ...questionList, loading: true });

    let response = await fetch('http://localhost:8080/api/v1/pregunta/preguntasEntrenador');
    let list = await response.json().catch([]) || [];

    setQuestionList({ ...questionList, loading: false, data: list });
    console.log(questionList.data);
  }
  useEffect(() => {
    getQuestionList();
  }, []);

  const handleAnswerChange = (opcionId, pregunta) => {
    const updatedAnswers = answers.map(answer => {
      if (answer.parametro === pregunta) {
        return {
          ...answer,
          valorParametro: opcionId
        };
      }
      return answer;
    });
    setAnswers(updatedAnswers);
  };

  return (
    <div className=" flex items-center justify-center h-screen bg-blue-theme-200 ">
      <div className="w-2/4 shadow-xl rounded-lg p-6 bg-white object-contain">
        <div className="flex justify-center align-center">
          <img src={logo} className="mb-3 w-60 h-auto"></img>
        </div>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          color="primary"
          sx={{ textAlign: "center", fontWeight: 500 }}
        >
          {entrenador.nombreMostrado}
        </Typography>
        <Divider color="primary" />
        <div className="flex flex-col gap-2">
          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Correo electrónico:
            </InputLabel>{" "}
            <Typography variant="body1" component="span" color="textPrimary">
              {entrenador.email}
            </Typography>
          </div>
          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Fecha de nacimiento:
            </InputLabel>{" "}
            <Typography variant="body1" component="span" color="textPrimary">
              {entrenador.fechaNacimiento}
            </Typography>
          </div>
          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Capacidad de clientes:
            </InputLabel>{" "}
            <Typography variant="body1" component="span" color="textPrimary">
              {entrenador.capacidadClientes}
            </Typography>
          </div>
          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Calificación:
            </InputLabel>{" "}
            <Typography variant="body1" component="span" color="textPrimary">
              {entrenador.calificacion}
            </Typography>
          </div>
          <div>
            {questionList.data.map(question => (
              <div key={question.pregunta}>
                <Divider />
                <FormControl fullWidth sx={{ marginTop: 1 }}>
                  <Typography fullWidth
                    htmlFor={question.pregunta}
                    color="#00000099"
                    sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    {question.tituloEntrenador}
                  </Typography>
                  <Select
                    fullWidth
                    id={question.pregunta}
                    value={answers.find(a => a.parametro === question.pregunta).valorParametro || ''}
                    onChange={(event) => handleAnswerChange(event.target.value, question.pregunta)
                    }
                  >
                    
                    {question.respuesta.opciones.map((opcion) => (
                      <MenuItem
                        key={opcion.id}
                        value={opcion.id}
                      >
                        {opcion.textoEntrenador}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            ))}

          </div>
        </div>
        <NavLink to="/">
          <Typography
            gutterBottom
            component="div"
            color="primary"
            sx={{ marginTop: 3, textAlign: "center", fontWeight: 500 }}
          >
            Volver
          </Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default Profile;
