var inspect = require('util').inspect;

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
    // whatever
    queryResult = [];
    console.log(usuario.toDBString());
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

  }
};
