import {
    getProgramas
} from '../Models/modelPrograma';

export default {

    data() {
        return {
            programas: [],
            programa: null,
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
        },
        /*obtenerPrograma(nombre){
            this.cargarProgramas;
            console.log(this.programas.length);
            // Inicializar una variable para almacenar el programa encontrado
            let programaEncontrado = null;
            
            // Iterar sobre la lista de programas
            for (let i = 0; i < this.programas.length; i++) {
                // Verificar si el nombre del programa actual coincide con el nombre proporcionado
                if (this.programas[i].nombre === nombre) {
                    // Asignar el programa actual a la variable programaEncontrado
                    console.log(programas[i])
                    programaEncontrado = this.programas[i];
                    // Romper el bucle una vez que se encuentra el programa
                    break;
                }
            }
            this.programa=programaEncontrado;
        }*/
    }
    
}