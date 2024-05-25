import axios from 'axios';

export const getProgramas = async () => {
    const response = await axios.get('/Programas.json');
    return response.data;
};


export const getCompetenciasByNombrePrograma = async (nombrePrograma) => {
    try {
        const response = await axios.get('/Programas.json');
        const programas = response.data;
        const programaEspecifico = programas.find(programa => programa.nombre === nombrePrograma);
        return programaEspecifico ? programaEspecifico.competencias : null;
    } catch (error) {
        console.error('Error fetching program:', error);
        throw error;
    }
};
