import Cookies from "js-cookie";

export const obtenerEntrenador = () => {
  let entrenador = Cookies.get('entrenador');
  if (entrenador) {
    return JSON.parse(entrenador);
  }
  return null;
};

export const obtenerFechaIso = () => {
  let date = new Date();
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}Z`;
}
