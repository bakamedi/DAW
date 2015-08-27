var inspect = require('util').inspect;

module.exports = {
 
  user: function(nombre, apellido, username, placa, capacidad) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.username = username;
    this.placa = placa;
    this.capacidad = capacidad;
    this.toDBString = function(){
        var str = "\"" + this.nombre + '\", \"' + this.apellido + '\", \"' + this.username + '\", \"' + this.placa + '\", \"' + this.capacidad + '\"';
        str.replace('--', '');
        str.replace(';', '');
        return str;
    };
      
  }, 
  crear_usuario: function (connection, usuario, callback) {
    // whatever
    queryResult = [];
    console.log(usuario.toDBString());
    console.log("sdfsdfsa");
    connection.query('call rapidin.crear_usuario(' + usuario.toDBString() + ')')
            .on('result', function(res) {
                res.on('row', function(row) {
                         console.log('Result row: ' + inspect(row));
                         queryResult.push(row.Database)
                       })
                   .on('error', function(err) {
                            console.log('Result error: ' + inspect(err));
                       })
                      .on('end', function(info) {
                               console.log('Result finished successfully');
                        })
            })
         .on('end', function () {
             callback(queryResult);
         });
  },
  userSolo: function(username) {
    this.username = username;
    this.toDBString = function(){
        var str = "\"" + username + '\"';
        str.replace('--', '');
        str.replace(';', '');
        return str;
    };
      
  }, 
verificar_usuario: function (connection, usuario, callback) {
    // whatever
    queryResult = [];
    console.log(usuario.toDBString());
    console.log("sdfsdfsa");
    connection.query('call rapidin.obtener_usuario(' + usuario.toDBString() + ')')
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
         .on('end', function () {
          console.log(queryResult);
             callback(queryResult);
         });

  }
};
