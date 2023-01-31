import Cookies from "js-cookie";

export const obtenerEntrenador = () => {
    return JSON.parse(Cookies.get('entrenador'));
};