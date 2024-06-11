USE Proyecto2;

CREATE TABLE Usuarios (
    id_usuario      INT PRIMARY KEY AUTO_INCREMENT,
    nombre          VARCHAR(35) NOT NULL,
    correo          VARCHAR(50) NOT NULL,
    dpi             BIGINT NOT NULL,
    password        VARCHAR(255) NOT NULL
);

CREATE TABLE Publicaciones (
    id_publicacion  INT PRIMARY KEY AUTO_INCREMENT,
    descripcion     TEXT NOT NULL,
    fecha		    DATETIME DEFAULT CURRENT_TIMESTAMP(),
    id_usuario      INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

CREATE TABLE Comentario (
    id_comentario  INT PRIMARY KEY AUTO_INCREMENT,
    comentario     TEXT NOT NULL,
    fecha		   DATETIME DEFAULT CURRENT_TIMESTAMP(),
    id_usuario      INT NOT NULL,
    id_publicacion      INT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
    FOREIGN KEY (id_publicacion) REFERENCES Publicaciones(id_publicacion)
);

CREATE TABLE Etiquetas (
    id_etiqueta     INT PRIMARY KEY AUTO_INCREMENT,
    nombre          VARCHAR(50) NOT NULL,
    repeticiones    INT NOT NULL
);

CREATE TABLE Etiquetas_publicaciones (
    id_etiqueta     INT NOT NULL,
    id_publicacion  INT NOT NULL,
    PRIMARY KEY (id_etiqueta, id_publicacion),
    FOREIGN KEY (id_etiqueta) REFERENCES Etiquetas(id_etiqueta),
    FOREIGN KEY (id_publicacion) REFERENCES Publicaciones(id_publicacion)
);

CREATE TABLE amigos (
    usuario_id1 INT,
    usuario_id2 INT,
    PRIMARY KEY (usuario_id1, usuario_id2),
    CHECK (usuario_id1 <> usuario_id2),
    FOREIGN KEY (usuario_id1) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (usuario_id2) REFERENCES Usuarios(id_usuario)
);
