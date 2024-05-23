import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getDocente = async (parametro) => {
  const response = await axios.get(`${API_URL}/cargarDocente/${parametro}`);
  return response.data;
};

export const getTablaDoc = async () => {
  const response = await axios.get(`${API_URL}/cargarTablaDoc`);
  return response.data;
};

export const createDocente = async (docente) => {
  const response = await axios.post(`${API_URL}/crearDocente`, docente);
  return response.data;
};

export const updateDocente = async (id, docente) => {
  const response = await axios.put(`${API_URL}/actualizarDocente/${id}`, docente);
  return response.data;
};

export const deleteDocente = async (id) => {
  const response = await axios.delete(`${API_URL}/borrarDocente/${id}`);
  return response.data;
};

export const createUsuario = async (usuario) => {
  const response = await axios.post(`${API_URL}/crearUsuario`, usuario);
  return response.data;
};
