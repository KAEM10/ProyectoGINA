import axios from 'axios';

const API_URL = 'http://localhost:3000';


export const consultaSesion = async (usuario) => {
    const response = await axios.post(`${API_URL}/consultaSesion`, usuario);
    return response.data;
};