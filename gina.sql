DROP TABLE IF EXISTS horario;
DROP TABLE IF EXISTS programaCompetencia;
DROP TABLE IF EXISTS competencia;
DROP TABLE IF EXISTS programa;
DROP TABLE IF EXISTS ambienteAprendizaje;
DROP TABLE IF EXISTS docente;
DROP TABLE IF EXISTS periodoAcademico;
DROP TABLE IF EXISTS usuario;

CREATE TABLE periodoAcademico (
    id_periodo INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_final DATE NOT NULL,
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('activo', 'inactivo'))
);

CREATE TABLE usuario(
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    usuario_login VARCHAR(100) NOT NULL,
    usuario_pwd VARCHAR(50) NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('docente', 'coordinador'))
);

CREATE TABLE ambienteAprendizaje (
    codigo VARCHAR(50) PRIMARY KEY NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Virtual', 'Presencial')),
    capacidad_estudiantes INT NOT NULL,
    ubicacion VARCHAR(255) NOT NULL
);

CREATE TABLE programa (
    id_programa INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('activo', 'inactivo'))
);

CREATE TABLE competencia (
    id_competencia INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Genericas', 'Especificas')),
    nombre VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('activo', 'inactivo'))
);

CREATE TABLE programaCompetencia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_programa INT,
    id_competencia INT,
    FOREIGN KEY (id_programa) REFERENCES programa(id_programa) ON DELETE CASCADE,
    FOREIGN KEY (id_competencia) REFERENCES competencia(id_competencia) ON DELETE CASCADE
);

CREATE TABLE docente (
    id_docente INT PRIMARY KEY AUTO_INCREMENT,
    nombres VARCHAR(255) NOT NULL,
    apellidos VARCHAR(255) NOT NULL,
    tipo_identificacion VARCHAR(50) NOT NULL CHECK (tipo_identificacion IN ('CC', 'CE', 'PASAPORTE')),
    identificacion VARCHAR(50) NOT NULL UNIQUE,
    tipo_docente VARCHAR(50) NOT NULL CHECK (tipo_docente IN ('Tecnico', 'Profesional')),
    tipo_contrato VARCHAR(50) NOT NULL CHECK (tipo_contrato IN ('PT', 'CNT')),
    area_perteneciente VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL CHECK (estado IN ('activo', 'inactivo')),
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE horario (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_periodo INT,
    id_docente INT,
    id_competencia INT,
    id_ambiente VARCHAR(50),
    dia VARCHAR(255),
    hora_inicio TIME,
    hora_fin TIME,
    FOREIGN KEY (id_periodo) REFERENCES periodoAcademico(id_periodo) ON DELETE CASCADE,
    FOREIGN KEY (id_docente) REFERENCES docente(id_docente) ON DELETE CASCADE,
    FOREIGN KEY (id_competencia) REFERENCES competencia(id_competencia) ON DELETE CASCADE,
    FOREIGN KEY (id_ambiente) REFERENCES ambienteAprendizaje(codigo) ON DELETE CASCADE
);
