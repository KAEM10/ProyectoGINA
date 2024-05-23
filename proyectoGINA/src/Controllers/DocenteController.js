// frontend/src/controllers/docenteController.js

import {
    getDocente,
    getTablaDoc,
    createDocente,
    updateDocente,
    deleteDocente,
    createUsuario
  } from '../Models/DocenteModel';
  
  export default {
    data() {
      return {
        editId: '',
        nombres: '',
        apellidos: '',
        tipoId: '',
        tiposIDs: [
          { id: 1, nombre: 'CC' },
          { id: 2, nombre: 'CE' },
          { id: 3, nombre: 'PASAPORTE' }
        ],
        numeroId: '',
        tipoDocente: '',
        tiposDocentes: [
          { id: 1, nombre: 'Tecnico' },
          { id: 2, nombre: 'Profesional' }
        ],
        tipoContrato: '',
        tiposContratos: [
          { id: 1, nombre: 'PT' },
          { id: 2, nombre: 'CNT' }
        ],
        area: '',
        estado: '',
        tiposEstados: [
          { id: 1, nombre: 'activo' },
          { id: 2, nombre: 'inactivo' }
        ],
        idUsuario: 0,
        usuario: '',
        contrasena: '',
        docentes: [],
        usuarios: [],
        parametro: '',
        tablaVacia: true,
        showUserMenu: false,
        showPeriodoDocOptions: false,
        showCrearDocente: false,
        showGestorDocente: false
      };
    },
    methods: {
      async cargarDocente(parametro) {
        try {
          if (parametro === "") {
            console.warn("parametro vacio");
            this.cargarTabla();
          } else {
            const data = await getDocente(parametro);
            this.docentes = data;
            this.tablaVacia = data.length === 0;
          }
        } catch (error) {
          console.error('Error al cargar Docentes:', error);
        }
      },
      async cargarTabla() {
        try {
          const data = await getTablaDoc();
          this.docentes = data;
          this.tablaVacia = data.length === 0;
        } catch (error) {
          console.error('Error al cargar Docentes:', error);
        }
      },
      async agregarDocente() {
        try {
          const idUsuario = await this.agregarUsuario();
          const nuevoDocente = {
            nombres: this.nombres,
            apellidos: this.apellidos,
            tipoId: this.tipoId,
            numeroId: this.numeroId,
            tipoDocente: this.tipoDocente,
            tipoContrato: this.tipoContrato,
            area: this.area,
            estado: this.estado,
            usuario: idUsuario
          };
          await createDocente(nuevoDocente);
          this.limpiaCampos();
          alert("Docente creado con éxito");
        } catch (error) {
            if(error.message=="Request failed with status code 409"){
                alert("La identificacion esta repetida");
            }else{
                alert(error.message);
            }
        }
      },
      async agregarUsuario() {
        try {
          const nuevoUsuario = {
            usuario: this.usuario,
            contra: this.contrasena
          };
          const data = await createUsuario(nuevoUsuario);
          this.idUsuario = data.id;
          this.usuarios.push(data);
          return data.id;
        } catch (error) {
          console.error('Error al agregar Usuario:', error);
          throw error;
        }
      },
      async actualizarDocente(docente) {
        try {
          await updateDocente(docente.id_docente, docente);
          this.onEditOrCancel();
          this.cargarDocente(this.parametro);
        } catch (error) {
          console.error('Error al actualizar el docente:', error);
        }
      },
      async borrarDocente(id) {
        try {
          await deleteDocente(id);
          const index = this.docentes.findIndex(docente => docente.id_docente === id);
          if (index !== -1) {
            this.docentes.splice(index, 1);
          }
          alert("Docente eliminado con éxito");
        } catch (error) {
          console.error('Error al eliminar docente:', error);
        }
      },
      validarEliminar(id) {
        if (confirm("¿Está seguro que desea eliminar el docente?")) {
          this.borrarDocente(id);
        }
      },
      onEditOrCancel(docente) {
        this.editId = docente ? docente.id_docente : '';
      },
      limpiaCampos() {
        this.nombres = '';
        this.apellidos = '';
        this.tipoId = '';
        this.numeroId = '';
        this.tipoDocente = '';
        this.tipoContrato = '';
        this.area = '';
        this.estado = '';
        this.usuario = '';
        this.contrasena = '';
        this.docentes = [];
      },
      cambiarEstadoDocente(accion) {
        this.cargarTabla();
        this.limpiaCampos();
        this.showCrearDocente = (accion === 'crear');
        this.showGestorDocente = (accion === 'gestionar');
      }
    }
  };
  