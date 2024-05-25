import { getProgramas } from '../Models/modelPrograma';
import { getCompetenciasByNombrePrograma } from '../Models/modelPrograma'; // Asegúrate de importar la función correcta

export default {
    data() {
        return {
            programas: [],
            program: '',
            competencias: []
        };
    },
    methods: {
        async cargarProgramas() {
            try {
                const data = await getProgramas(); // Esperar la promesa
                this.programas = data;
            } catch (error) {
                console.error('Error al cargar programas:', error);
            }
        },
        async cargarCompetencias(programaNombre) {
            try {
                const competencias = await getCompetenciasByNombrePrograma(programaNombre);
                this.competencias = competencias ? competencias : [];
            } catch (error) {
                console.error('Error al cargar competencias:', error);
            }
        }
    },
};
