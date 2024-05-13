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
app.get('/periodoAcademico', (req, res) => {
    connection.query('SELECT * FROM usuarios', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            res.json(results);
        }
    });
});


app.post('/periodoAcademico', (req, res) => {
    const { nombre, email, pass } = req.body;
    connection.query('INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)', [nombre, email, pass], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario creado', id: results.insertId });
    });
});

app.put('/periodoAcademico/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, email } = req.body;
    connection.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario actualizado' });
    });
});

app.delete('/periodoAcademico/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'Usuario eliminado' });
    });
});
