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