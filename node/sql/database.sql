create database rapidin;
use rapidin;

create table usuario(
usuario varchar(20) NOT NULL,
nombre varchar(45) ,
apellido varchar(45),
placa varchar(8),
capacidadCarro int,
bio varchar(140),
PRIMARY KEY (usuario)
);

create table ruta(
idRuta INT not null AUTO_INCREMENT ,
usuario varchar(20) not null ,
nombreRuta varchar(45),
diaSemana varchar(45),
hora varchar(45),
PRIMARY KEY(idRuta),
foreign key (usuario) references usuario(usuario)
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
usuario varchar(20) not null,
nombreDestino varchar(45),
destinoPosX varchar(15),
destinoPosY varchar(15),
PRIMARY KEY(idDestino),
foreign key (usuario) references usuario(usuario)
);

create table seguidores_siguiendo(
idSeguidorSiguiente INT not null AUTO_INCREMENT,
idUsuario1Siguiendo varchar(20) not null,
idUsuario2Seguidor varchar(20) not null,
PRIMARY KEY(idSeguidorSiguiente),
foreign key(idUsuario1Siguiendo) references usuario(usuario),
foreign key(idUsuario2Seguidor ) references usuario(usuario)
);

create table mensaje(
idMensaje INT not null AUTO_INCREMENT,
idUsuarioRemitente varchar(20) not null,
idUsuarioRemisor varchar(20) not null,
contenido varchar(280),
fecha varchar(10),
ubicacionActual varchar(45),
PRIMARY KEY(idMensaje)
);

create table viaje(
idViaje INT not null AUTO_INCREMENT,
usuario varchar(20) not null,
idRuta INT not null,
fecha varchar(10),
PRIMARY KEY(idViaje), 
foreign key(usuario) references usuario(usuario),
foreign key(idRuta) references ruta(idRuta)
);

create table pasajero(
idPasajero INT not null AUTO_INCREMENT,
usuario INT not null ,
idViaje INT not null ,
PRIMARY KEY(idPasajero),
foreign key(idViaje) references viaje(idViaje),
foreign key(usuario) references usuario(usuario)
);
