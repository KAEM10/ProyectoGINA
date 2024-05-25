import { getAmbiente } from '@/Models/modelAmbiente';
import {
    getPeriodosActivos,
    getAmbientes,
    getHorario,
    getHorarioDoc,
} from '../Models/modelHorario';

export default {
    data() {
        return {
            periodos: [],
            ambientes: [],
            horariosOcupados:[],
            horariosOcupados2:[],
            editId: '',
        };
    },
    methods: {
        async obtenerPeriodosActivos(){
            try {
                const data = await getPeriodosActivos();
                this.periodos = data;
            } catch (error) {
                console.error('Error al cargar periodos:', error);
            }
        },
        async obtenerAmbientes(){
            try {
                const data = await getAmbientes();
                this.ambientes = data;
            } catch (error) {
                console.error('Error al cargar periodos:', error);
            }
        },
        async obtenerHorariosOcupados(id){
            try {
                const data = await getHorario(id);
                this.horariosOcupados = data;
            } catch (error) {
                console.error('Error al cargar periodos:', error);
            }
        },
        async obtenerHorariosOcupadosDocente(id){
            try {
                const data = await getHorarioDoc(id);
                this.horariosOcupados2=data;
            } catch (error) {
                console.error('Error al cargar periodos:', error);
            }
        }

        
        
        
    }
    
}