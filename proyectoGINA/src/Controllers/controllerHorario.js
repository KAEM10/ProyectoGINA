import { getAmbiente } from '@/Models/modelAmbiente';
import {
    getPeriodosActivos,
    getAmbientes,
    getHorario
} from '../Models/modelHorario';

export default {
    data() {
        return {
            periodos: [],
            ambientes: [],
            horariosOcupados:[],
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
        }
        
    }
}