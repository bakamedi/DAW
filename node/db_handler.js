var inspect = require('util').inspect;

function executeQuery(connection, queryString, object, callback){
    var queryResult = [];
        connection.query(queryString, object)
                .on('result', function(res) {
                    res.on('row', function(row) {
                             console.log('Result row: ' + inspect(row));
                             queryResult.push(row)
                           })
                       .on('error', function(err) {
                                console.log('Result error: ' + inspect(err));
                           })
                          .on('end', function(info) {
                                   console.log('Result finished successfully');
                            })
                })
             .on('end', function endDBExecutionCallback() {
              console.log(queryResult);
                 callback(queryResult);
             });
    }

module.exports = {
 
  user: function(nombre, apellido, username, placa, capacidad, bio) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.placa = placa;
    this.capacidad = capacidad;
    this.bio = bio;
          
  },
     
  crear_usuario: function (connection, usuario, callback) {
    var queryStr = 'call rapidin.crear_usuario(:nombre, :apellido, :username, :placa, :capacidad, :bio)';
    var object = { nombre : usuario.nombre,
                apellido : usuario.apellido,
                username : usuario.username,
                placa : usuario.placa,
                capacidad : usuario.capacidad,
                bio : usuario.bio
    };
    executeQuery(connection, queryStr, object, callback);
  },

  verificar_usuario: function (connection, username, callback) {
      var queryStr = 'call rapidin.verificar_usuario(:username)';
      var object = {username : username};
      executeQuery(connection,queryStr, object, callback);
   },

   obtener_usuario: function (connection, usuario,callback){
    var queryStr = 'call rapidin.obtener_usuario(:username)';
    var object = {username : usuario.username};
    executeQuery(connection,queryStr,object,callback);
   },

   update_usuario: function(connection, usuario, callback){
    var queryStr = 'call rapidin.update_usuario(:nombre, :apellido, :username, :placa, :capacidadCarro)';
    var object = { 
        nombre : usuario.nombre,
        apellido : usuario.apellido,
        username : usuario.username,
        placa : usuario.placa,
        capacidadCarro : usuario.capacidadCarro,
    };
    executeQuery(connection, queryStr, object, callback);
   }
};



