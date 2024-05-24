import axios from 'axios';

export const getProgramas = async () => {
    const response = await axios.get('/Programas.json');
    return response.data;
};