const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const multer = require('multer');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');

// Configura CORS
const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'proyectogina',
    user: 'root',
    password: '',
});

connection.connect(function (error) {
    if (error) {
        throw error;
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/assets/imagenes/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Renombrar el archivo para evitar colisiones
    }

});

const upload = multer({ storage: storage });

//rutas para obtener, crear, actualizar y eliminar usuarios
app.get('/periodoAcademico/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    connection.query('SELECT * FROM periodoacademico WHERE nombre = ?', [nombre], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener periodoacademico' });
        } else {
            res.json(results);
        }
    });
});


app.post('/periodoAcademico', (req, res) => {
    const { nombre, fechaInicio, fechafin, estado } = req.body;
    connection.query('INSERT INTO periodoacademico (nombre, fecha_inicio, fecha_final, estado) VALUES (?, ?, ?, ?)', [nombre, fechaInicio, fechafin, estado], (error, results) => {
        if (error) throw error;
        res.json({ message: 'periodoAcademico creado', id: results.insertId });
    });
});

app.put('/periodoAcademico/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, fecha_inicio, fecha_final, estado } = req.body;
    connection.query('UPDATE periodoacademico SET nombre = ?, fecha_inicio = ?, fecha_final = ?, estado = ? WHERE id_periodo = ?', [nombre, fecha_inicio, fecha_final, estado, id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'periodoAcademico actualizado' });
    });
});

app.delete('/periodoAcademico/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM periodoacademico WHERE id_periodo = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'periodoAcademico eliminado' });
    });
});



app.post('/crearDocente', (req, res) => {
    const { nombres, apellidos, tipoId, numeroId,tipoDocente,tipoContrato,area,estado,usuario } = req.body;
    connection.query('INSERT INTO docente (nombres, apellidos, tipo_identificacion, identificacion,tipo_docente,tipo_contrato,area_perteneciente,estado,id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [nombres, apellidos, tipoId, numeroId,tipoDocente,tipoContrato,area,estado,usuario], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Docente creado', id: results.insertId });
    });
});

app.post('/crearUsuario', (req, res) => {
    const {usuario,contra } = req.body;
    connection.query('INSERT INTO usuario (usuario_login,usuario_pwd) VALUES (?, ?)', [usuario,contra], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario creado', id: results.insertId });
    });
});

app.get('/cargarDocente/:parametro', (req, res) => {
    const parametro = req.params.parametro;
    

    const query = "SELECT * FROM docente WHERE nombres LIKE ? or apellidos LIKE ? or identificacion LIKE ?";
    connection.query(query, [`${parametro}%`,`${parametro}%`,`${parametro}%`], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener docente' });
        } else {
            res.json(results);
        }
    });
});


app.put('/actualizarDocente/:id', (req, res) => {
    const id = req.params.id;
    const { id_docente,nombres, apellidos, tipo_identificacion, identificacion,tipo_docente,tipo_contrato,area_perteneciente,estado,id_usuario} = req.body;
    connection.query('UPDATE docente SET nombres=?, apellidos=?, tipo_identificacion=?, identificacion=?,tipo_docente=?,tipo_contrato=?,area_perteneciente=?,estado=? WHERE id_docente = ?', [nombres, apellidos, tipo_identificacion, identificacion,tipo_docente,tipo_contrato,area_perteneciente,estado,id_docente], (error, results) => {
        if (error) throw error;
        res.json({ message: 'periodoAcademico actualizado' });
    });
});

app.delete('/borrarDocente/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM docente WHERE id_docente = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Docente eliminado' });
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
