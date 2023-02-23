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
                onChange={formik.handleChange}
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
            <Divider/>
            {/* PREGUNTA 1 */}
            <FormControl
              sx={{
                marginTop: 1,
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
              >
                ¿Cuál es tu especialidad?
              </Typography>
              <RadioGroup
                aria-labelledby="pregunta-1"
                name="radio-buttons-group"
              >
                <FormControlLabel value={0} control={<Radio />} label="Gimnasia." />
                <FormControlLabel value={1} control={<Radio />} label="Deporte." />
                <FormControlLabel value={2} control={<Radio />} label="Recuperacion." />
              </RadioGroup>
            </FormControl>
            
            <Divider />
            <FormControl
              sx={{
                marginTop: 1,
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
              >
                ¿Cuál es tu horario de trabajo?
              </Typography>
              <RadioGroup
                name="radio-buttons-group"
              >
                <FormControlLabel value={0} control={<Radio />} label="Mañana." />
                <FormControlLabel value={1} control={<Radio />} label="Tarde." />
                <FormControlLabel value={2} control={<Radio />} label="Noche." />
                <FormControlLabel value={3} control={<Radio />} label="Todo el dia." />
              </RadioGroup>
            </FormControl>
            <Divider />
            <FormControl
              sx={{
                marginTop: 1,
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
              >
                ¿Con qué modalidad entrenas?
              </Typography>
              <RadioGroup
                name="radio-buttons-group"
              >
                <FormControlLabel value={0} control={<Radio />} label="Presencial." />
                <FormControlLabel value={1} control={<Radio />} label="Virtual." />
                <FormControlLabel value={2} control={<Radio />} label="Mixto." />
                <FormControlLabel value={3} control={<Radio />} label="No tengo preferencia." />
              </RadioGroup>
            </FormControl>
            <Divider />
            <FormControl
              sx={{
                marginTop: 1,
              }}
            >
              <Typography
                gutterBottom
                sx={{
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
              >
                ¿En donde entrenas?
              </Typography>
              <RadioGroup
                name="radio-buttons-group"
              >
                <FormControlLabel value={0} control={<Radio />} label="En un gimnasio." />
                <FormControlLabel value={1} control={<Radio />} label="Al aire libre." />
                <FormControlLabel value={2} control={<Radio />} label="A domicilio." />
                <FormControlLabel value={3} control={<Radio />} label="En un club deportivo." />
              </RadioGroup>
            </FormControl>
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