use rapidin ;

drop procedure if exists crear_usuario;
DELIMITER $$ 
create procedure crear_usuario(nombre VARCHAR(45), apellido VARCHAR(45), usuario VARCHAR(20), placa VARCHAR(8), capacidad INT, bio VARCHAR(140))
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
CREATE PROCEDURE obtener_usuario(usuername VARCHAR(20))
begin
    select usuario,nombre,apellido,placa,capacidadCarro,bio from usuario where usuario=usuario;
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
	insert into ruta values(NULL, idUsuario,nombre,dias,hora);
END;
$$
DELIMITER ;
