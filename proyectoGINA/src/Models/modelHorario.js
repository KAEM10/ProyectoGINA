import axios from 'axios';

const API_URL = 'http://localhost:3000';


export const getPeriodosActivos = async () => {
    const response = await axios.get(`${API_URL}/periodos`);
    return response.data;
};

export const getAmbientes = async () => {
    const response = await axios.get(`${API_URL}/ambientes`);
    return response.data;
};
export const getDocenteContrato=async (id) => {
    const response= await axios.get(`${API_URL}/cargarDocenteContrato/${id}`);
    return response.data;
}
export const getHorario = async (id) => {
    const response = await axios.get(`${API_URL}/horarioOcupado/${id}`);
    return response.data;
};
export const getHorarioDoc = async (id) => {
    const response = await axios.get(`${API_URL}/horarioOcupadoDoc/${id}`);
    return response.data;
};
export const createHorario = async (horario) => {
    const response = await axios.post(`${API_URL}/crearHorario`, horario);
    return response.data;
  };

  export const listaHoras = async (id) => {
    const response = await axios.get(`${API_URL}/horasDocente/${id}`);
    return response.data;
  };