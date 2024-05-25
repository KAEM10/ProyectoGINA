import {consultaSesion} from '../Models/modelHome';

export default {
    name: 'home',
    data() {
        return {
            login: "",
            password: "",
            error: "",
            error_msg: "",
            usuario_header: []
        }
    },
    mounted(){
        localStorage.removeItem('token');
    },
    methods: {
        async verificar_credenciales() {
            const usuario = {
                usuario: this.login,
                contrasena: this.password
            };
            try {
                const data = await consultaSesion(usuario);
                if (data.error) {
                    this.error = true;
                    this.error_msg = data.error_msg;
                } else {
                    this.error = false;
                    localStorage.token=data.token;
                    if(localStorage.token!="undefined"){
                        this.usuario_header = data.usuario;
                        console.log(this.usuario_header);
                        if(data.usuario.rol=="coordinador"){
                            this.$router.push('periodoAcademico');
                        }else{
                            this.$router.push('horarioDocente');
                        }
                    }
                }
            } catch (error) {
                console.error('Error al cargar periodos:', error);
            }
        }
    }
}