import {
    getProgramas
} from '../Models/modelPrograma';

export default {

    data() {
        return {
            programas: [],
            competencias: []
        };
    },
    methods:{
        async cargarProgramas() {
            try {
              
                const data = await getProgramas();
                
                this.programas = data;  
            } catch (error) {
              console.error('Error al cargar programas:', error);
            }
        }
    }
    
}