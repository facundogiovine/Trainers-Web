import React from "react";
import * as Yup from "yup"
import Input from '@mui/material/Input';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import { useState, useEffect } from "react";
import "dayjs/locale/es";

const RegisterData = () => {
  const [genderList, setGenderList] = useState({ data: [] });
  const [questionList, setQuestionList] = useState({ data: [] });
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state;
  console.log(location.state)

  const getGenderList = async () => {
    setGenderList({ ...genderList, loading: true });

    let response = await fetch('http://localhost:8080/api/v1/genero/generos');
    let list = await response.json().catch([]) || [];

    setGenderList({ ...genderList, loading: false, data: list });
  }
  useEffect(() => {
    getGenderList();
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

  const registerEntrenador = () => {
    const entrenador = {
      "nombres": "Facundo",
      "apellidos": "Giovine",
      "nombreMostrado": "Facu Giovine",
      "descripcion": "Entreno en un gimnasio",
      "email": "facundo@abc.com",
      "contrasena": "facu123",
      "fechaNacimiento": "15/12/1995",
      "calificacion": 5,
      "experiencia": 0,
      "latitud": "30.4584127488",
      "longitud": "98.5470097408",
      "activo": true,
      "genero": 1,
      "capacidadClientes": 4
    };

    fetch('http://localhost:8080/api/v1/entrenador/entrenador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entrenador)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  const formik = useFormik({
    initialValues: {
      sexo: 0,
      nombres: "",
      apellidos: "",
      fechaNacimiento: null,
    },
    validationSchema: Yup.object({
      nombreMostrado: Yup.string().required("Ingrese el nombre que desea mostrar."),
      nombres: Yup.string().required("Ingrese su nombre"),
      apellidos: Yup.string().required("Ingrese su apellido"),
      fechaNacimiento: Yup.date()
        .max(
          new Date(new Date().getFullYear() - 20, 11, 31),
          "Debes ser mayor de 20 años"
        )
        .min(
          new Date(new Date().getFullYear() - 60, 0, 1),
          "No puede ser mayor de 60 años"
        )
        .nullable()
        .required("Ingrese su fecha de nacimiento"),
    }),
  });


  return (
    <Box sx={{
      flexGrow: 1
    }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/register")}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Completá tus datos
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="flex items-center justify-center bg-blue-theme-200 overflow-auto">
        <div className="shadow-xl rounded-lg p-6 bg-white  ">
          <form onSubmit={formik.handleSubmit} >
            <Typography
              gutterBottom
              variant="h6"
              component="h6"
              sx={{
                marginTop: 1,
              }}
            >
              Datos Personales
            </Typography>
            <Divider />
            <TextField
              name="nombres"
              label="Nombres"
              type="text"
              fullWidth
              error={formik.errors.nombres && formik.touched.nombres}
              helperText={formik.touched.nombres ? formik.errors.nombres : ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombres}
              variant="standard"
            />
            <TextField
              name="apellidos"
              label="Apellidos"
              type="text"
              fullWidth
              sx={{
                marginTop: 1,
              }}
              error={formik.errors.apellidos && formik.touched.apellidos}
              helperText={formik.errors.apellidos}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.apellidos}
              variant="standard"
            />
            <FormControl
              fullWidth
              sx={{
                marginTop: 1,
              }}
              variant="standard"
            >
              <InputLabel id="sexo-biologico">Sexo Biológico</InputLabel>
              <Select
                labelId="sexo-biologico"
                name="sexo"
                value={formik.values.sexo}
                label="Sexo Biológico"
                error={formik.errors.sexo && formik.touched.sexo}
                onChange={(event) => {
                  formik.handleChange(event);
                  const selectedGenero = genderList.data.find(genero => genero.descripcion === event.target.value);
                  console.log(`Selected genero ID: ${selectedGenero.id}, descripcion: ${selectedGenero.descripcion}`);
                }}

              >
                {genderList.data.filter(genero => genero.mostrarEntrenador).map(genero => (
                  <MenuItem key={genero.id} value={genero.descripcion}>
                    {genero.descripcion}
                  </MenuItem>
                ))}

              </Select>
            </FormControl>
            <TextField
              name="nombreMostrado"
              label="Nombre Mostrado"
              type="text"
              fullWidth
              error={formik.errors.nombreMostrado && formik.touched.nombreMostrado}
              helperText={formik.errors.nombreMostrado}
              sx={{
                marginTop: 1,
              }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nombreMostrado}
              variant="standard"
            />
            <TextField
              name="fechaNacimiento"
              label="Fecha de Nacimiento"
              type="date"
              fullWidth
              value={formik.values.fechaNacimiento}
              InputLabelProps={{
                shrink: true
              }}
              format="dd/MM/yyyy"
              sx={{
                marginTop: 3
              }}
              variant="standard"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
              helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
            />
            <Typography
              gutterBottom
              variant="h6"
              component="h6"
              sx={{
                marginTop: 3,
              }}
            >
              Contanos sobre vos
            </Typography>
            <>
              {questionList.data.map(question => (
                <div key={question.pregunta}>
                  <Divider />
                  <FormControl sx={{ marginTop: 1 }}>
                    <Typography gutterBottom sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                      {question.tituloEntrenador}
                    </Typography>
                    <RadioGroup name={question.pregunta}>
                      {question.respuesta.opciones.map((opcion) => (
                        <FormControlLabel
                          key={opcion.id}
                          value={opcion.id}
                          control={<Radio onChange={() => console.log(opcion.id, opcion.textoEntrenador)} />}
                          label={opcion.textoEntrenador}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              ))}
            </>
            <Divider />
            <FormControl
              sx={{
                marginTop: 2,
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
              >
                ¿Con cuántos clientes te gustaría entrenar?
              </Typography>
              <Input
                name="cantClientes"
                label="Cantidad de Clientes"
                fullWidth
                type="number"
                error={formik.errors.cantClientes && formik.touched.cantClientes}
                helperText={formik.touched.cantClientes ? formik.errors.cantClientes : ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.cantClientes}
                inputProps={{ min: 0, max: 10 }}
                sx={{ width: "20%", marginBottom: "10px" }}
              />
            </FormControl>
            <div className="flex justify-end align-center">
              <Button
                size="large"
                sx={{
                  marginTop: 3,
                  textTransform: "none",
                }}
                variant="contained"
                type="submit"
                disabled={!formik.isValid}
              >
                Registrarse
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Box>
  );
}

export default RegisterData;