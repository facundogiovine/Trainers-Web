export const obtenerEntrenador = () => {
    return JSON.parse(Cookies.get('entrenador'));
};

export const obtenerFechaIso = () => {
    let date = new Date();
    return `${date.getFullYear()}-${date.getMonth().toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}-03:00`;
}