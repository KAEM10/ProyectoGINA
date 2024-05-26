-- Inserts para periodoAcademico (Periodos de 3 meses y 6 meses)
INSERT INTO periodoAcademico (nombre, fecha_inicio, fecha_final, estado)
VALUES ('Periodo 1', '2024-09-01', '2024-11-30', 'activo'),
       ('Periodo 2', '2025-01-01', '2025-03-31', 'inactivo'),
       ('Periodo 3', '2025-06-01', '2025-08-31', 'activo'),
       ('Periodo 4', '2026-01-01', '2026-03-31', 'activo'),
       ('Periodo 5', '2026-06-01', '2026-08-31', 'inactivo'),
       ('Periodo 6', '2027-01-01', '2027-03-31', 'activo'),
       ('Periodo 7', '2027-06-01', '2027-08-31', 'activo'),
       ('Periodo 8', '2028-01-01', '2028-03-31', 'activo'),
       ('Periodo 9', '2028-06-01', '2028-08-31', 'inactivo'),
       ('Periodo 10', '2029-01-01', '2029-03-31', 'activo'),
       ('Periodo 11', '2024-09-01', '2025-02-28', 'activo'),
       ('Periodo 12', '2025-01-01', '2025-06-30', 'inactivo'),
       ('Periodo 13', '2025-06-01', '2025-11-30', 'activo'),
       ('Periodo 14', '2026-01-01', '2026-06-30', 'activo'),
       ('Periodo 15', '2026-06-01', '2026-11-30', 'inactivo'),
       ('Periodo 16', '2027-01-01', '2027-06-30', 'activo'),
       ('Periodo 17', '2027-06-01', '2027-11-30', 'activo'),
       ('Periodo 18', '2028-01-01', '2028-06-30', 'activo'),
       ('Periodo 19', '2028-06-01', '2028-11-30', 'inactivo'),
       ('Periodo 20', '2029-01-01', '2029-06-30', 'activo');

-- Inserts para usuario
INSERT INTO usuario (usuario_login, usuario_pwd, rol)
VALUES ('user1', 'password1', 'coordinador'),
       ('user2', 'password2', 'docente'),
       ('user3', 'password3', 'docente'),
       ('user4', 'password4', 'docente'),
       ('user5', 'password5', 'docente'),
       ('user6', 'password6', 'docente'),
       ('user7', 'password7', 'docente'),
       ('user8', 'password8', 'docente'),
       ('user9', 'password9', 'docente'),
       ('user10', 'password10', 'docente');

-- Inserts para ambienteAprendizaje
INSERT INTO ambienteAprendizaje (codigo, nombre, tipo, capacidad_estudiantes, ubicacion)
VALUES ('A01', 'Sala de conferencias', 'Presencial', 50, 'Edificio principal'),
       ('A02', 'Laboratorio de informática', 'Virtual', 30, 'Edificio de sistemas'),
       ('A03', 'Aula 101', 'Presencial', 40, 'Edificio A'),
       ('A04', 'Aula 201', 'Presencial', 35, 'Edificio A'),
       ('A05', 'Sala de reuniones', 'Virtual', 20, 'Edificio principal'),
       ('A06', 'Aula 301', 'Presencial', 45, 'Edificio B'),
       ('A07', 'Aula 401', 'Presencial', 50, 'Edificio B'),
       ('A08', 'Laboratorio de química', 'Presencial', 25, 'Edificio C'),
       ('A09', 'Sala de estudio', 'Virtual', 15, 'Edificio de biblioteca'),
       ('A10', 'Aula 501', 'Presencial', 30, 'Edificio C');

-- Inserts para programa
INSERT INTO programa (nombre, estado)
VALUES ('Ingeniería de Sistemas', 'activo'),
       ('Ingeniería Civil', 'activo'),
       ('Ingeniería Industrial', 'activo'),
       ('Ingeniería Electrónica', 'inactivo'),
       ('Ingeniería Mecánica', 'activo'),
       ('Ingeniería Ambiental', 'activo'),
       ('Ingeniería Química', 'activo'),
       ('Ingeniería de Telecomunicaciones', 'activo'),
       ('Ingeniería Eléctrica', 'activo'),
       ('Ingeniería de Software', 'activo');

-- Inserts para competencia
INSERT INTO competencia (tipo, nombre, estado)
VALUES ('Genericas', 'Comunicación efectiva', 'activo'),
       ('Genericas', 'Trabajo en equipo', 'activo'),
       ('Especificas', 'Programación orientada a objetos', 'activo'),
       ('Especificas', 'Diseño de bases de datos', 'activo'),
       ('Especificas', 'Ingeniería de software', 'activo'),
       ('Genericas', 'Pensamiento crítico', 'inactivo'),
       ('Especificas', 'Redes de computadoras', 'activo'),
       ('Especificas', 'Inteligencia artificial', 'activo'),
       ('Especificas', 'Gestión de proyectos', 'activo'),
       ('Genericas', 'Resolución de problemas', 'activo');

-- Inserts para programaCompetencia
INSERT INTO programaCompetencia (id_programa, id_competencia)
VALUES (1, 3),
       (1, 4),
       (1, 5),
       (2, 3),
       (2, 4),
       (2, 6),
       (3, 3),
       (3, 4),
       (3, 5),
       (3, 9);

-- Inserts para docente
INSERT INTO docente (nombres, apellidos, tipo_identificacion, identificacion, tipo_docente, tipo_contrato, area_perteneciente, estado, id_usuario)
VALUES ('Juan', 'Perez', 'CC', '123456789', 'Profesional', 'PT', 'Ingeniería de Sistemas', 'activo', 1),
       ('Maria', 'Gomez', 'CC', '987654321', 'Profesional', 'CNT', 'Ingeniería Civil', 'activo', 2),
       ('Carlos', 'Lopez', 'CE', '654321987', 'Profesional', 'CNT', 'Ingeniería Industrial', 'activo', 3),
       ('Laura', 'Martinez', 'CC', '456789123', 'Tecnico', 'PT', 'Ingeniería de Sistemas', 'activo', 4),
       ('Pedro', 'Garcia', 'CC', '789123456', 'Profesional', 'CNT', 'Ingeniería Civil', 'activo', 5),
       ('Ana', 'Rodriguez', 'CC', '321654987', 'Tecnico', 'CNT', 'Ingeniería Industrial', 'activo', 6),
       ('Luis', 'Hernandez', 'CC', '159357456', 'Profesional', 'PT', 'Ingeniería de Sistemas', 'activo', 7),
       ('Sara', 'Sanchez', 'CC', '357159864', 'Profesional', 'CNT', 'Ingeniería Civil', 'activo', 8),
       ('Jorge', 'Diaz', 'CC', '753159864', 'Tecnico', 'PT', 'Ingeniería Industrial', 'activo', 9),
       ('Elena', 'Ramirez', 'CC', '951753456', 'Profesional', 'CNT', 'Ingeniería de Sistemas', 'activo', 10);

-- Inserts para horario
-- Inserts para horario con bloques de tiempo específicos
INSERT INTO horario (id_periodo, id_docente, id_competencia, id_ambiente, dia, hora_inicio, hora_fin)
VALUES (1, 1, 3, 'A01', 'Lunes', '07:00:00', '09:00:00'),
       (2, 2, 4, 'A02', 'Martes', '09:00:00', '11:00:00'),
       (3, 3, 5, 'A03', 'Miércoles', '11:00:00', '13:00:00'),
       (4, 4, 6, 'A04', 'Jueves', '14:00:00', '16:00:00'),
       (5, 5, 7, 'A05', 'Viernes', '16:00:00', '18:00:00'),
       (6, 6, 8, 'A06', 'Lunes', '18:00:00', '20:00:00'),
       (7, 7, 9, 'A07', 'Martes', '07:00:00', '09:00:00'),
       (8, 8, 10, 'A08', 'Miércoles', '09:00:00', '11:00:00'),
       (9, 9, 1, 'A09', 'Jueves', '11:00:00', '13:00:00'),
       (10, 10, 2, 'A10', 'Viernes', '14:00:00', '16:00:00'),
       (1, 1, 3, 'A01', 'Lunes', '16:00:00', '18:00:00'),
       (2, 2, 4, 'A02', 'Martes', '18:00:00', '20:00:00'),
       (3, 3, 5, 'A03', 'Miércoles', '07:00:00', '09:00:00'),
       (4, 4, 6, 'A04', 'Jueves', '09:00:00', '11:00:00'),
       (5, 5, 7, 'A05', 'Viernes', '11:00:00', '13:00:00'),
       (6, 6, 8, 'A06', 'Lunes', '14:00:00', '16:00:00'),
       (7, 7, 9, 'A07', 'Martes', '16:00:00', '18:00:00'),
       (8, 8, 10, 'A08', 'Miércoles', '18:00:00', '20:00:00'),
       (9, 9, 1, 'A09', 'Jueves', '07:00:00', '09:00:00'),
       (10, 10, 2, 'A10', 'Viernes', '09:00:00', '11:00:00');