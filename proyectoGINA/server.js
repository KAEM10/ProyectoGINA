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

// Maneja la solicitud POST desde el cliente
app.post('/consultaSesion', (req, res) => {
    const usuario = req.body.usuario;
    const contrasena = req.body.contrasena;
    // Realiza la consulta a la base de datos
    const consulta = `SELECT * FROM usuario WHERE usuario_login = '${usuario}' AND usuario_pwd = '${contrasena}'`;
    connection.query(consulta, [usuario, contrasena], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error al realizar la consulta' });
        } else {
            if (results.length > 0) {
                // Usuario y contraseña válidos
                // Genera un token de acceso
                const token = jwt.sign({ usuario: usuario }, 'secreto');
                res.status(200).json({ success: true, message: 'Inicio de sesión exitoso', token: token, usuario: results[0]});
            } else {
                // Usuario o contraseña inválidos
                res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
            }
        }
    });
});

app.get('/periodos', (req, res) => {
    const query = 'SELECT * FROM periodoacademico WHERE estado = "activo"';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).send('Error ejecutando la consulta');
        return;
      }
      res.json(results);
    });
  });

  app.get('/ambientes', (req, res) => {
    const query = 'SELECT * FROM ambienteaprendizaje';
  
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).send('Error ejecutando la consulta');
        return;
      }
      res.json(results);
    });
  });

  app.get('/horarioOcupado/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT dia, hora_inicio, hora_fin FROM horario WHERE id_ambiente = ?';
    
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).send('Error ejecutando la consulta');
        return;
      }
      res.json(results);
    });
  });
  app.get('/horarioOcupadoDoc/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT dia, hora_inicio, hora_fin FROM horario WHERE id_docente = ?';
    
    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error ejecutando la consulta:', err);
        res.status(500).send('Error ejecutando la consulta');
        return;
      }
      res.json(results);
    });
  });


  app.get('/horasDocente/:id', (req, res) => {
    const idDoc = req.params.id;
    const query = 'SELECT h.id_horario,a.codigo,a.nombre, h.dia, h.hora_inicio,h.hora_fin FROM horario h inner join ambienteaprendizaje a on h.id_ambiente= a.codigo where h.id_docente= ?';
    
    connection.query(query, [idDoc], (err, results) => {
      if (err) {
        console.error('Error ejecutando la consulta de horarios:', err);
        res.status(500).send('Error ejecutando la consulta');
        return;
      }
      res.json(results);
    });
  });
  
app.get('/cargarTablaPeriodo', (req, res) => {
    const query = `
        SELECT 
            id_periodo, 
            nombre, 
            DATE_FORMAT(fecha_inicio, '%Y-%m-%d') AS fecha_inicio, 
            DATE_FORMAT(fecha_final, '%Y-%m-%d') AS fecha_final, 
            estado 
        FROM periodoAcademico
    `;
    
    connection.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener periodo' });
        } else {
            res.json(results);
        }
    });
});


//rutas para obtener, crear, actualizar y eliminar usuarios
app.get('/cargarPeriodoAcademico/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const query = `SELECT id_periodo, nombre, DATE_FORMAT(fecha_inicio, '%Y-%m-%d') AS fecha_inicio, DATE_FORMAT(fecha_final, '%Y-%m-%d') AS fecha_final, estado FROM periodoAcademico WHERE nombre LIKE ?`;
    connection.query(query, [`${nombre}%`], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener periodoacademico' });
        } else {
            res.json(results);
        }
    });
});


app.post('/crearPeriodoAcademico', (req, res) => {
    const { nombre, fechaInicio, fechafin, estado } = req.body;
    connection.query('INSERT INTO periodoacademico (nombre, fecha_inicio, fecha_final, estado) VALUES (?, ?, ?, ?)', [nombre, fechaInicio, fechafin, estado], (error, results) => {
        if (error) throw error;
        res.json({ message: 'periodoAcademico creado', id: results.insertId });
    });
});

app.put('/actualizarPeriodoAcademico/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, fecha_inicio, fecha_final, estado } = req.body;
    connection.query('UPDATE periodoacademico SET nombre = ?, fecha_inicio = ?, fecha_final = ?, estado = ? WHERE id_periodo = ?', [nombre, fecha_inicio, fecha_final, estado, id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'periodoAcademico actualizado' });
    });
});

app.delete('/eliminarPeriodoAcademico/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM periodoacademico WHERE id_periodo = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'periodoAcademico eliminado' });
    });
});



app.post('/crearDocente', (req, res) => {
    const { nombres, apellidos, tipoId, numeroId, tipoDocente, tipoContrato, area, estado, usuario } = req.body;
    
    connection.query(
        'INSERT INTO docente (nombres, apellidos, tipo_identificacion, identificacion, tipo_docente, tipo_contrato, area_perteneciente, estado, id_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [nombres, apellidos, tipoId, numeroId, tipoDocente, tipoContrato, area, estado, usuario], 
        (error, results) => {
            if (error) {
                // Manejar error de duplicación
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'El docente ya existe' });
                }
                // Manejar otros tipos de errores
                return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
            }
            res.status(201).json({ message: 'Docente creado', id: results.insertId });
        }
    );
});


app.post('/crearHorario', (req, res) => {
    const {idPeriodo, idDocente, idCompetencia,idAmbiente, dia, horaInicio, horaFin } = req.body;
    console.log(idPeriodo, idDocente)
    connection.query(
        'INSERT INTO horario (id_periodo, id_docente, id_competencia,id_ambiente, dia, hora_inicio, hora_fin) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [idPeriodo, idDocente, idCompetencia,idAmbiente, dia, horaInicio, horaFin], 
        (error, results) => {
            if (error) {
                // Manejar error de duplicación
                if (error.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ message: 'El horario ya existe' });
                }
                // Manejar otros tipos de errores
                return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
            }
            res.status(201).json({ message: 'Horario creado', id: results.insertId });
        }
    );
});


app.post('/crearUsuario', (req, res) => {
    const {usuario,contra } = req.body;
    connection.query('INSERT INTO usuario (usuario_login,usuario_pwd,rol) VALUES (?, ?, ?)', [usuario,contra,'docente'], (error, results) => {
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

app.get('/docenteById/:id', (req, res) => {
    const idUser = req.params.id;
    
    const query = "SELECT * FROM docente WHERE 	id_usuario= ?";
    connection.query(query, [idUser], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener docente por Id' });
        } else {
            res.json(results);
        }
    });
});

app.get('/cargarDocenteContrato/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    const query = "SELECT tipo_contrato FROM docente WHERE id_docente=?";
    connection.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener docente' });
        } else {
            
            console.log(results);
            res.json(results);
            
        }
        
    });
});
app.get('/cargarTablaDoc', (req, res) => {
    connection.query('SELECT * FROM docente', (error, results) => {
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


app.get('/cargarTablaAmbiente', (req, res) => {
    connection.query('SELECT * FROM ambienteaprendizaje', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener ambientes' });
        } else {
            res.json(results);
        }
    });
});


app.post('/crearAmbiente', (req, res) => {
    const { codigo, nombre, tipo, capacidad_estudiantes, ubicacion} = req.body;
    connection.query('INSERT INTO ambienteaprendizaje (codigo, nombre, tipo, capacidad_estudiantes, ubicacion) VALUES (?, ?, ?, ?, ?)', [codigo, nombre, tipo, capacidad_estudiantes, ubicacion], (error, results) => {
        if (error) throw error;
        res.json({ message: 'ambienteaprendizaje creado', id: results.insertId });
    });
});



app.get('/cargarAmbiente/:parametro', (req, res) => {
    const parametro = req.params.parametro;
    

    const query = "SELECT * FROM ambienteaprendizaje WHERE codigo LIKE ? or nombre LIKE ?";
    connection.query(query, [`${parametro}%`,`${parametro}%`], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener docente' });
        } else {
            res.json(results);
        }
    });
});


app.put('/actualizarAmbiente/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, tipo, capacidad_estudiantes, ubicacion} = req.body;
    connection.query('UPDATE ambienteaprendizaje SET nombre=?, tipo=?, capacidad_estudiantes=?, ubicacion=? WHERE codigo = ?', [nombre, tipo, capacidad_estudiantes, ubicacion,id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'ambienteaprendizaje actualizado' });
    });
});

app.delete('/borrarAmbiente/:id', (req, res) => {
    const id = req.params.id;
    connection.query('DELETE FROM ambienteaprendizaje WHERE codigo = ?', [id], (error, results) => {
        if (error) throw error;
        res.json({ message: 'ambienteaprendizaje eliminado' });
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});