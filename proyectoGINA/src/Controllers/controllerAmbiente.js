import {
    getAmbiente,
    getTablaAmbiente,
    createAmbiente,
    updateAmbiente,
    deleteAmbiente
    } from '../Models/modelAmbiente';

export default {
    data() {
        return {
            ambientes: [],
            codigo: '',
            nombre: '',
            capacidad: '',
            estudiantes: '',
            ubicacion: '',
            fechas: [],
            tipo: '',
            tipos: [{ id: 1, nombre: 'Virtual' }, { id: 2, nombre: 'Presencial' }],
            editId: '',
            nombrePeriodo: '',
            fechaInicio: '',
            fechaFin: '',
            tablaVacia: true,
            showCrearAmbiente: false,
            showGestionarAmbiente: false,
        };
    },
    methods: {
        cambiarEstadoAmbiente(accion) {
            this.cargarTabla();
            this.limpiaCampos();
            this.showCrearAmbiente = (accion === 'crear');
            this.showGestionarAmbiente = (accion === 'gestionar');
        },
        onEditOrCancel(ambiente) {
            this.editId = ambiente ? ambiente.codigo : '';
        },
        limpiaCampos() {
            this.codigo = '';
            this.nombreAmbiente = '';
            this.capacidad = '';
            this.estudiantes = '';
            this.ubicacion = '';
            this.tipo = [];
            this.ambientes = [];
        },
        validarEliminar(id) {
            if (confirm("¿Está seguro que desea eliminar el periodo académico?")) {
                this.eliminarAmbiente(id);
            }
        },
        async cargarTabla() {
            try {
                const data = await getTablaAmbiente();
                this.ambientes = data;
                this.tablaVacia = data.length === 0;;
            } catch (error) {
                console.error('Error al cargar Ambientes:', error);
            }
        },
        async cargarAmbiente(parametro) {
            try {
                if (parametro == "") {
                    console.warn("parametro vacio");
                    this.cargarTabla();
                } else {
                    const data = await getAmbiente(parametro);
                    this.ambientes = data;
                    this.tablaVacia = data.length === 0;
                }

            } catch (error) {
                console.error('Error al cargar Docentes:', error);
            }
        },
        async agregarAmbiente() {
            try {
                const nuevoAmbiente = {
                    nombre: this.nombre,
                    capacidad: this.capacidad,
                    estudiantes: this.estudiantes,
                    ubicacion: this.ubicacion,
                    tipo: this.tipo
                };
                await createAmbiente(nuevoAmbiente);
                this.limpiaCampos();
            } catch (error) {
                console.error('Error al agregar ambiente:', error);
            }
        },
        async actualizarAmbiente(ambiente) {
            try {
                const ambienteActualizado = {
                    nombre: ambiente.nombre,
                    capacidad: ambiente.capacidad,
                    estudiantes: ambiente.estudiantes,
                    ubicacion: ambiente.ubicacion,
                    tipo: ambiente.tipo
                };
                await updateAmbiente(ambiente.codigo, ambienteActualizado);
                this.onEditOrCancel();
                this.cargarAmbiente(ambiente.nombre);
            } catch (error) {
                console.error('Error al actualizar ambiente:', error);
            }
        },
        async eliminarAmbiente(id) {
            try {
                await deleteAmbiente(id);
                const index = this.ambientes.findIndex(ambiente => ambiente.codigo === id);
                if (index !== -1) {
                    this.ambientes.splice(index, 1);
                }
                alert("Periodo eliminado con exito");
            } catch (error) {
                console.error('Error al eliminar ambiente:', error);
            }
        }
    }
};