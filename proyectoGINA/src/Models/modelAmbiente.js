import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getAmbiente = async (parametro) => {
    const response = await axios.get(`${API_URL}/cargarAmbiente/${parametro}`);
    return response.data;
};

export const getTablaAmbiente = async () => {
    const response = await axios.get(`${API_URL}/cargarTablaAmbiente`);
    return response.data;
};

export const createAmbiente = async (ambiente) => {
    const response = await axios.post(`${API_URL}/crearAmbiente`, ambiente);
    return response.data;
};

export const updateAmbiente = async (id, ambiente) => {
    const response = await axios.put(`${API_URL}/actualizarAmbiente/${id}`, ambiente);
    return response.data;
};

export const deleteAmbiente = async (id) => {
    const response = await axios.delete(`${API_URL}/borrarAmbiente/${id}`);
    return response.data;
};
