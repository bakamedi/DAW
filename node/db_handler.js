var inspect = require('util').inspect;

function executeQuery(connection, queryString, callback){
    var queryResult = [];
        connection.query(queryString)
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
             .on('end', function endDBExecutionCallback() {
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
    this.toDBString = function(){
        var str = "\"" + this.nombre + '\", \"' + this.apellido + '\", \"' + username + '\", \"' + placa + '\", ' + capacidad + ', \"' + bio + '\"';
        str.replace('--', '');
        str.replace(';', '');
        return str;
    };
      
  }, 
  crear_usuario: function (connection, usuario, callback) {
    var queryStr = 'call rapidin.crear_usuario(' + usuario.toDBString() + ')';
    executeQuery(connection, queryStr, callback);
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
   }
};
