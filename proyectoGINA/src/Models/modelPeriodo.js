import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getPeriodo = async (nombrePeriodo) => {
    const response = await axios.get(`${API_URL}/cargarPeriodoAcademico/${nombrePeriodo}`);
    return response.data;
};

export const getTablaPeriodo = async () => {
    const response = await axios.get(`${API_URL}/cargarTablaPeriodo`);
    return response.data;
};

export const createPeriodo = async (periodo) => {
    const response = await axios.post(`${API_URL}/crearPeriodoAcademico`, periodo);
    return response.data;
};

export const updatePeriodo = async (id, periodo) => {
    const response = await axios.put(`${API_URL}/actualizarPeriodoAcademico/${id}`, periodo);
    return response.data;
};

export const deletePeriodo = async (id) => {
    const response = await axios.delete(`${API_URL}/eliminarPeriodoAcademico/${id}`);
    return response.data;
};
