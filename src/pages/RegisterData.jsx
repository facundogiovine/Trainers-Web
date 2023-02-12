import React from "react";
import * as Yup from "yup"
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
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import "dayjs/locale/es";

const RegisterData = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { sexo: 0, nombres: "", apellidos: "", fechaNacimiento: null },
    validationSchema: Yup.object({
      email: Yup.string().required("Ingrese un correo electrónico."),
      contrasenaRegistro: Yup.string().required("Ingrese su contraseña."),
      confirmarContrasena: Yup.string().when("contrasenaRegistro", {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("contrasenaRegistro")],
          "Las contraseñas no coinciden"
        )
      })
        .required("Confirme su contraseña."),
    }),
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
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
      <div className="flex items-center justify-center h-screen bg-blue-theme-200">
        <div className="shadow-xl rounded-lg p-6 bg-white object-contain">
          <form onSubmit={formik.handleSubmit} >
            <Typography
              gutterBottom
              variant="h6"
              component="h6"
              sx={{
                marginTop: 3,
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
                marginTop: 3,
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
                marginTop: 3,
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
                onChange={formik.handleChange} s
              >
                <MenuItem value={0}>Femenino</MenuItem>
                <MenuItem value={1}>Masculino</MenuItem>
                <MenuItem value={2}>Otro</MenuItem>
                <MenuItem value={3}>Prefiero no decirlo</MenuItem>
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
                marginTop: 3,
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
                shrink: true,
              }}
              sx={{
                marginTop: 3,
              }}
              variant="standard"
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
            <Divider />
            {/* PREGUNTA 1 */}
            <FormControl
              sx={{
                marginTop: 3,
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
              >
                ¿Cuál es tu objetivo al entrenar?
              </Typography>
              <RadioGroup
                aria-labelledby="pregunta-1"
                name="radio-buttons-group"
              >
                <FormControlLabel value={0} control={<Radio />} label="Perder o mantener peso." />
                <FormControlLabel value={1} control={<Radio />} label="Desarrollar musculatura." />
                <FormControlLabel value={2} control={<Radio />} label="Aprender o mejorar en un deporte." />
                <FormControlLabel value={2} control={<Radio />} label="Llevar una vida saludable." />
                <FormControlLabel value={2} control={<Radio />} label="Recuperarme de una lesión." />
              </RadioGroup>
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