import { getAmbiente } from '@/Models/modelAmbiente';
import {
    getPeriodosActivos,
    getAmbientes,
    getHorario,
    getHorarioDoc,
    getDocenteContrato,
    createHorario,
    listaHoras
} from '../Models/modelHorario';

export default {
    data() {
        return {
            docenteContrato: '',
            docenteCT: '',
            periodos: [],
            ambientes: [],
            horariosOcupados:[],
            horariosOcupados2:[],
            horariosOcupadosDoc:[],
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
        async obtenerHorariosOcupadosVistaDoc(id){
            try {
                const data = await listaHoras(id);
                this.horariosOcupadosDoc = data;
            } catch (error) {
                console.error('Error al cargar periodos:', error);
            }
        },
        async obtenerDocenteContrato(id){
            try {
                const data = await getDocenteContrato(id);
                this.docenteContrato = data[0];
                this.docenteCT=this.docenteContrato.tipo_contrato;
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
        },
        async agregarHorario(horario) {
            try {
              await createHorario(horario);
              alert("Horario creado con éxito");
            } catch (error) {
               console.log(error)
            }
          },

        
        
        
    }
    
}