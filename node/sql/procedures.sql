use rapidin ;

drop procedure if exists crear_usuario;
DELIMITER $$ 
create procedure crear_usuario(nombre VARCHAR(45), apellido VARCHAR(45), usuario VARCHAR(20), placa VARCHAR(7), capacidad INT, bio VARCHAR(140))
begin
    insert into usuario (nombre,apellido,usuario,placa,capacidadCarro,bio) values(nombre, apellido, usuario, placa, capacidad,bio);
END;
$$
DELIMITER ;

drop procedure if exists obtener_usuario;
DELIMITER $$ 
create procedure obtener_usuario(usuarioInput VARCHAR(20))
begin
    select nombre,apellido,placa,capacidadCarro from usuario where usuario=usuarioInput;
END;
$$
DELIMITER ;

drop procedure if exists verificar_usuario;
DELIMITER $$ 
CREATE PROCEDURE verificar_usuario(username VARCHAR(20))
begin
	if ((select count(*) from usuario where usuario = username)>0) then
		select true;
	else
		select false;
	end if;
end;
$$
DELIMITER ;

drop procedure if exists obtener_usuario;
DELIMITER $$
CREATE PROCEDURE obtener_usuario(username VARCHAR(20))
begin
    select usuario,nombre,apellido,placa,capacidadCarro,bio from usuario where usuario=usuario and usuario = username;
end;
$$
DELIMITER ;

drop procedure if exists update_usuario;
DELIMITER $$
create procedure update_usuario(nombre VARCHAR(45),apellido VARCHAR(45),username VARCHAR(20),placa VARCHAR(10),capacidad INT,bio VARCHAR(140))
begin
	update usuario set nombre=nombre ,apellido=apellido ,placa=placa ,capacidadCarro=capacidad ,bio=bio where usuario=username;
END;
$$
DELIMITER ;

drop procedure if exists insertar_ruta;
DELIMITER $$
create procedure insertar_ruta(idUsuario VARCHAR(20),nombre VARCHAR(45),dias VARCHAR(14),hora SMALLINT)
begin
	insert into ruta (idUsuario,nombre,dias,hora) values(idUsuario,nombre,dias,hora);
END;
$$
DELIMITER ;

drop procedure if exists enviar_mensaje;
DELIMITER $$
create procedure enviar_mensaje(idUsuarioRemitente VARCHAR(20),
							    idUsuarioRemisor VARCHAR(20),
							    contenido VARCHAR(280),
							    fecha VARCHAR(10),
							    ubicacionActual VARCHAR(45),
							    tipo INT,
							    leido INT)
begin
	insert into mensaje(idUsuarioRemitente,idUsuarioRemisor,contenido,fecha,ubicacionActual,tipo,leido) values(idUsuarioRemitente,idUsuarioRemisor,contenido,fecha,ubicacionActual,tipo,leido);
END;
$$
DELIMITER ;

drop procedure if exists notificar_mensaje;
DELIMITER $$
create procedure notificar_mensaje(idUsuarioRemitente VARCHAR(20))
begin
	select count(tipo) from mensaje where idUsuarioRemitente = idUsuarioRemitente and leido = 0;
END;
$$
DELIMITER ;
/////////////////////////////

drop procedure if exists obtener_lista_seguidores;
DELIMITER $$
create procedure obtener_lista_seguidores(username VARCHAR(20))
begin
	select DISTINCT seguidores_siguiendo.idUsuario2Seguidor
	from usuario join seguidores_siguiendo
	where usuario.usuario = seguidores_siguiendo.idUsuario1Siguiendo and usuario.usuario = username;
END;
$$
DELIMITER ;

drop procedure if exists obtener_usuarios;
DELIMITER $$
create procedure obtener_usuarios()
begin
	select usuario.usuario,usuario.nombre,usuario.apellido,usuario.placa,usuario.capacidadCarro,usuario.bio
	from usuario;
END;
$$
DELIMITER ;