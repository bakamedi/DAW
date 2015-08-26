use rapidin ;

drop procedure if exists crear_usuario;

DELIMITER $$ 

create procedure crear_usuario(nombre VARCHAR(45), apellido VARCHAR(45), usuario VARCHAR(20), placa VARCHAR(7), capacidad INT, bio VARCHAR(140))
begin
    insert into usuario values(default, nombre, apellido, usuario, placa, capacidad, bio);
END;
$$

DELIMITER ;
