import {
    getPeriodo,
    getTablaPeriodo,
    createPeriodo,
    updatePeriodo,
    deletePeriodo
} from '../Models/modelPeriodo';

export default {
    data() {
        return {
            periodos: [],
            fechas: [],
            estados: ['activo', 'inactivo'],
            editId: '',
            nombrePeriodo: '',
            fechaInicio: '',
            fechaFin: '',
            tablaVacia: true,
            showCrearPeriodo: false,
            showGestionarPeriodo: false,
        };
    },
    methods: {
        onEditOrCancel(periodo) {
            this.editId = periodo ? periodo.id_periodo : '';
            this.actualizarFechaFin(periodo.fecha_inicio);
        },
        limpiaCampos(){
            this.nombrePeriodo = '';
            this.fechaInicio = '';
            this.fechaFin = '';
        },
        actualizarFechaFin(fecha) {
            if (!fecha) return;

            const fechaInicio = new Date(fecha);
            this.fechas = [];

            // Función para obtener la fecha correcta sumando meses
            const sumarMeses = (fecha, meses) => {
                const nuevaFecha = new Date(fecha);
                nuevaFecha.setMonth(nuevaFecha.getMonth() + meses);

                // Verificar si la fecha resultante es válida para el mes y año
                if (nuevaFecha.getDate() !== fecha.getDate()) {
                    // Ajustar al último día del mes anterior
                    nuevaFecha.setDate(0);
                }

                const dia = nuevaFecha.getDate().toString().padStart(2, '0');
                const mes = (nuevaFecha.getMonth() + 1).toString().padStart(2, '0');
                return `${nuevaFecha.getFullYear()}-${mes}-${dia}`;
            };
            
            // Fecha de fin en 3 meses
            this.fechas.push(sumarMeses(fechaInicio, 3));

            // Fecha de fin en 6 meses
            this.fechas.push(sumarMeses(fechaInicio, 6));

            // Seleccionar la primera fecha por defecto
            this.fechaFin = this.fechas[0];
        },
        cambiarEstadoPeriodo(accion) {
            this.cargarTabla();
            this.limpiaCampos();
            this.showCrearPeriodo = (accion === 'crear');
            this.showGestionarPeriodo = (accion === 'gestionar');
        },
        validarEliminar(id){
            if(confirm("¿Está seguro que desea eliminar el periodo académico?")){
                this.eliminarPeriodo(id);
            }
        },
        async cargarTabla() {
            try {
                const data = await getTablaPeriodo();
                this.periodos = data;
                this.tablaVacia = data.length === 0;
            } catch (error) {
                console.error('Error al cargar periodos:', error);
            }
        },
        async consultarPeriodos(nombrePeriodo) {
            try {
                if (nombrePeriodo=="") {
                    console.warn('El nombre del periodo académico es requerido');
                    this.cargarTabla();
                }else{
                    const data = await getPeriodo(nombrePeriodo);
                    this.periodos = data;
                    this.tablaVacia= data.length === 0;
                }
                
            } catch (error) {
                console.error('Error al cargar periodos:', error);
            }
        },
        async agregarPeriodos() {
            const periodo = {
                nombre: this.nombrePeriodo,
                fecha_inicio: this.fechaInicio,
                fecha_fin: this.fechaFin,
                estado: 'activo'
            };

            try {
                const data = await createPeriodo(periodo);
                this.periodos.push(data);
                alert("Periodo creado con exito");
                this.limpiaCampos();
            } catch (error) {
                console.error('Error al agregar periodo academico:', error);
            }
        },
        async actualizarPeriodo(periodo) {
            try {
                await updatePeriodo(periodo.id_periodo, periodo);
                this.onEditOrCancel();
                console.log(periodo);
            }
            catch (error) {
                console.error('Error al actualizar periodo academico:', error);
            }
        },
        async eliminarPeriodo(id) {
            try {
                await deletePeriodo(id);
                const index = this.periodos.findIndex(periodo => periodo.id_periodo === id);
                if (index !== -1) {
                    this.periodos.splice(index, 1);
                }
                alert("Periodo eliminado con exito");
            } catch (error) {
                console.error('Error al eliminar periodo academico:', error);
            }
        }
    }
};