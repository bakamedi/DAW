create database rapidin;
use rapidin;

create table usuario(
idUsuario INT NOT NULL AUTO_INCREMENT ,
nombre varchar(45) ,
apellido varchar(45),
usuario varchar(45) ,
placa varchar(45),
imagen varchar(45) null,
capacidadCarro int null,
PRIMARY KEY (idUsuario)
);

create table ruta(
idRuta INT not null AUTO_INCREMENT ,
idUsuario INT not null ,
nombreRuta varchar(45),
diaSemana varchar(45),
hora varchar(45),
PRIMARY KEY(idRuta),
foreign key (idUsuario) references usuario(idUsuario)
);

create table puntoRuta(
idPunto INT not null AUTO_INCREMENT ,
idRuta INT not null,
puntoX varchar(15),
puntoY varchar(15),
tipo varchar(10),
PRIMARY KEY(idPunto),
foreign key (idRuta) references ruta(idRuta)
);

create table destino(
idDestino INT not null AUTO_INCREMENT,
idUsuario INT not null,
nombreDestino varchar(45),
destinoPosX varchar(15),
destinoPosY varchar(15),
PRIMARY KEY(idDestino),
foreign key (idUsuario) references usuario(idUsuario)
);

create table seguidores_siguiendo(
idSeguidorSiguiente INT not null AUTO_INCREMENT,
idUsuario1Siguiendo INT not null,
idUsuario2Seguidor INT not null,
PRIMARY KEY(idSeguidorSiguiente),
foreign key(idUsuario1Siguiendo) references usuario(idUsuario),
foreign key(idUsuario2Seguidor ) references usuario(idUsuario)
);

create table mensaje(
idMensaje INT not null AUTO_INCREMENT,
idUsuarioRemitente INT not null,
idUsuarioRemisor INT not null,
contenido varchar(280),
fecha varchar(10),
ubicacionActual varchar(45),
PRIMARY KEY(idMensaje)
);

create table viaje(
idViaje INT not null AUTO_INCREMENT,
idUsuario INT not null,
idRuta INT not null,
fecha varchar(10),
PRIMARY KEY(idViaje), 
foreign key(idUsuario) references usuario(idUsuario),
foreign key(idRuta) references ruta(idRuta)
);

create table pasajero(
idPasajero INT not null AUTO_INCREMENT,
idUsuario INT not null ,
idViaje INT not null ,
PRIMARY KEY(idPasajero),
foreign key(idViaje) references viaje(idViaje),
foreign key(idUsuario) references usuario(idUsuario)
);
