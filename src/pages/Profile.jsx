import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../images/logo.png";
import { Select, InputLabel, MenuItem, Button, Stack, Input } from "@mui/material";
import { obtenerEntrenador } from "../utils/utils";
import { faFloppyDisk, faSave, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const [entrenador, setEntrenador] = useState(obtenerEntrenador());
  const [updateEntrenador, setUpdateEntrenador] = useState(entrenador);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [questionList, setQuestionList] = useState({ data: [] });
  const [parametros, setParametros] = useState([]);
  const [answers, setAnswers] = useState([
    {
      parametro: "DEPORTE",
      valorParametro: null,
    },
    {
      parametro: "MODALIDAD",
      valorParametro: null,
    },
    {
      parametro: "LOCALIZACION",
      valorParametro: null,
    },
    {
      parametro: "HORARIO",
      valorParametro: null,
    },
    {
      parametro: "CONDICION_SALUD",
      valorParametro: null,
    },
  ]);

  const [editable, setEditable] = useState(false);
  const recibirParametrosEntrenador = async (entrenadorId) => {
    const endpoint = `http://localhost:8080/api/v1/entrenador/entrenador/${entrenadorId}/parametros`;
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error("Error al recibir los parámetros del entrenador");
    }

    const parametros = await response.json();
    return parametros;
  };
  useEffect(() => {
    const fetchParametros = async () => {
      const params = await recibirParametrosEntrenador(entrenador.id);
      setParametros(params);
      const updatedAnswers = answers.map(answer => {
        const parametro = params.find(parametro => parametro.parametro === answer.parametro);
        return {
          ...answer,
          valorParametro: parametro ? parametro.valorParametro : null
        };
      });
      setAnswers(updatedAnswers);
    };
    fetchParametros();
  }, []);

  const handleFieldChange = (field, value) => {
    setUpdateEntrenador(prevState => {
      return {
        ...prevState,
        [field]: value
      };
    });
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const getQuestionList = async () => {
    setQuestionList({ ...questionList, loading: true });

    let response = await fetch(
      "http://localhost:8080/api/v1/pregunta/preguntasEntrenador"
    );
    let list = (await response.json().catch([])) || [];

    setQuestionList({ ...questionList, loading: false, data: list });

  };
  useEffect(() => {
    getQuestionList();
  }, []);

  const handleAnswerChange = (opcionId, pregunta) => {
    const updatedAnswers = parametros.map((answer) => {
      if (answer.parametro === pregunta) {
        return {
          ...answer,
          valorParametro: opcionId,
        };
      }
      return answer;
    });
    setParametros(updatedAnswers);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    const putEntrenador = {
      nombres: updateEntrenador.nombres,
      apellidos: updateEntrenador.apellidos,
      nombreMostrado: updateEntrenador.nombreMostrado,
      descripcion: updateEntrenador.descripcion,
      email: updateEntrenador.email,
      fechaNacimiento: updateEntrenador.fechaNacimiento,
      calificacion: updateEntrenador.calificacion,
      experiencia: updateEntrenador.experiencia,
      latitud: latitude,
      longitud: longitude,
      activo: updateEntrenador.activo,
      genero: updateEntrenador.genero,
      capacidadClientes: updateEntrenador.capacidadClientes
    };

    const url = `http://localhost:8080/api/v1/entrenador/entrenador/${updateEntrenador.id}`;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(putEntrenador)
    })
      .then(response => {
        if (response.ok) {
          console.log('Entrenador updated successfully!');
          Cookies.set("entrenador", JSON.stringify(updateEntrenador));
          setEntrenador = obtenerEntrenador();
        } else {
          console.log('Failed to update entrenador!');
        }
      })
      .catch(error => {
        console.error('Error while updating entrenador:', error);
      });
    
      console.log(JSON.stringify(answers))
    const putUrl = `http://localhost:8080/api/v1/entrenador/entrenador/${updateEntrenador.id}/parametros`;
    console.log(JSON.stringify(answers))
    fetch(putUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(answers)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
      Cookies.set("entrenador", JSON.stringify(updateEntrenador));
      setEntrenador(obtenerEntrenador());
      setEditable(false);
  };


  return (
    <div className="flex items-center justify-center pt-5 pb-5 h-fit bg-blue-theme-200 object-contain ">
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
          {entrenador.nombres} {entrenador.apellidos}
        </Typography>
        <Divider />
        {!editable && (
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            sx={{ fontWeight: "400", textAlign: "center", margin: "auto", width: '400px' }}
          >
            {entrenador.descripcion}
          </Typography>
        )}

        {editable && (
          <Input
            defaultValue={entrenador.descripcion}
            sx={{ fontWeight: "400", textAlign: "center", margin: "auto", width: '400px' }}
            onChange={(event) => handleFieldChange('descripcion', event.target.value)}
          />
        )}

        <div className="flex flex-col gap-2">
          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Nombres:
            </InputLabel>{" "}
            {!editable && (
              <Typography variant="body1" component="span" color="textPrimary">
                {entrenador.nombres}
              </Typography>
            )}
            {editable && (
              <Input
                defaultValue={entrenador.nombres}
                sx={{ fontWeight: "400", textAlign: "center", margin: "auto", width: '400px' }}
                onChange={(event) => handleFieldChange('nombres', event.target.value)}
              />
            )}
          </div>

          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Apellidos:
            </InputLabel>{" "}
            {!editable && (
              <Typography variant="body1" component="span" color="textPrimary">
                {entrenador.apellidos}
              </Typography>
            )}
            {editable && (
              <Input
                defaultValue={entrenador.apellidos}
                sx={{ fontWeight: "400", textAlign: "center", margin: "auto", width: '400px' }}
                onChange={(event) => handleFieldChange('apellidos', event.target.value)}
              />
            )}
          </div>

          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Nombre mostrado:
            </InputLabel>{" "}
            {!editable && (
              <Typography variant="body1" component="span" color="textPrimary">
                {entrenador.nombreMostrado}
              </Typography>
            )}
            {editable && (
              <Input
                defaultValue={entrenador.nombreMostrado}
                sx={{ fontWeight: "400", textAlign: "center", margin: "auto", width: '400px' }}
                onChange={(event) => handleFieldChange('nombreMostrado', event.target.value)}
              />
            )}
          </div>

          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Correo electrónico:
            </InputLabel>{" "}
            {!editable && (
              <Typography variant="body1" component="span" color="textPrimary">
                {entrenador.email}
              </Typography>
            )}
            {editable && (
              <Input
                defaultValue={entrenador.email}
                sx={{ fontWeight: "400", textAlign: "center", margin: "auto", width: '400px' }}
                onChange={(event) => handleFieldChange('email', event.target.value)}
              />
            )}
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
            {!editable && (
              <Typography variant="body1" component="span" color="textPrimary">
                {entrenador.capacidadClientes}
              </Typography>
            )}
            {editable && (
              <Input
                name="capacidadClientes"
                type="number"
                inputProps={{ min: 0, max: 10 }}
                defaultValue={entrenador.capacidadClientes}
                fullWidth
                onChange={(event) => handleFieldChange('capacidadClientes', event.target.value)}
                sx={{ width: "20%", marginBottom: "10px" }}
              />
            )}
          </div>
          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Años de Experiencia:
            </InputLabel>{" "}
            {!editable && (
              <Typography variant="body1" component="span" color="textPrimary">
                {entrenador.experiencia}
              </Typography>
            )}
            {editable && (
              <Input
                name="experiencia"
                type="number"
                defaultValue={entrenador.experiencia}
                fullWidth
                onChange={(event) => handleFieldChange('experiencia', event.target.value)}
                sx={{ width: "20%", marginBottom: "10px" }}
              />
            )}
          </div>

          <div>
            <InputLabel variant="body1" component="span" sx={{ fontWeight: "bold" }}>
              Tu calificacion es de:
            </InputLabel>{" "}
            <Typography variant="body1" component="span" color="textPrimary">
              {entrenador.calificacion}
            </Typography>
          </div>

          <div>
            {questionList.data.map(question => (
              <div key={question.pregunta}>
                <Divider />
                <Typography fullWidth
                  htmlFor={question.pregunta}
                  color="#00000099"
                  sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                >
                  {question.tituloEntrenador}
                </Typography>
                {!editable && (
                  <Select
                    fullWidth
                    id={question.pregunta}
                    value={parametros.find(a => a.parametro === question.pregunta).valorParametro || ''}
                    // onChange={(event) => handleAnswerChange(event.target.value, question.pregunta)}
                    sx={{ color: "#000", backgroundColor: "#f2f2f2", opacity: 1 }}
                    disabled
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
                )}
                {editable && (
                  <Select
                    fullWidth
                    id={question.pregunta}
                    value={parametros.find(a => a.parametro === question.pregunta)?.valorParametro || ''}
                    sx={{ color: "#000", backgroundColor: "#f2f2f2", opacity: 1 }}
                    onChange={(event) => {
                      const selectedValue = event.target.value;
                      const selectedOption = question.respuesta.opciones.find(opcion => opcion.id === selectedValue);
                      const updatedParametros = parametros.map(parametro => {
                        if (parametro.parametro === question.pregunta) {
                          return {
                            ...parametro,
                            valorParametro: selectedValue,
                            textoParametro: selectedOption?.textoEntrenador || '',
                          };
                        } else {
                          return parametro;
                        }
                      });
                      const updatedAnswers = answers.map(answer => {
                        if (answer.parametro === question.pregunta) {
                          return {
                            parametro: answer.parametro,
                            valorParametro: selectedValue,
                          };
                        } else {
                          return answer;
                        }
                      });
                      console.log(updatedAnswers)
                      setParametros(updatedParametros);
                      setAnswers(updatedAnswers);
                    }}
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

                )}
              </div>
            ))}
          </div>
        </div>
        {!editable && (
          <Stack direction="row" justifyContent="end">

            <Button
              color="warning"
              size="small"
              sx={{ marginTop: 3, textAlign: "center", fontWeight: 500, marginRight: 'auto' }}
              startIcon={<FontAwesomeIcon icon={faPencil} />}
              onClick={handleEdit}
            >
              Editar
            </Button>

            <NavLink to="/">
              <Button
                gutterBottom
                component="div"
                color="primary"
                sx={{ marginLeft: "auto", marginTop: 3, textAlign: "center", fontWeight: 500, justifyContent: 'flex-end' }}
              >
                Volver
              </Button>
            </NavLink>
          </Stack>
        )}
        {editable && (
          <Stack direction="row" justifyContent="center">

            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{ marginTop: 3, textAlign: "center", fontWeight: 500 }}
              startIcon={<FontAwesomeIcon icon={faSave} />}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Stack>
        )}

      </div>
    </div>
  );
};

export default Profile;
