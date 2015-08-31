var credentials     = require('./credentials');

/** MongoDB Stuff */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rapidin');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('MongoDB connected');
});

var RouteSchema = new mongoose.Schema({
    userId : String,
    name : String,
    points : [{x : Number, y : Number}]
});

var Route = mongoose.model('Route', RouteSchema);

/** End MongoDB */

/** MariaSQL stuff */

var Client = require('mariasql');
var mariaClient = new Client();
mariaClient.connect({
     host: '127.0.0.1',
     user: credentials.getUser(),
     password: credentials.getPassword()
});

mariaClient.on('connect', function() {
  console.log('Client connected');
  })
  .on('error', function(err) {
  console.log('Client error: ' + err);
   })
  .on('close', function(hadError) {
  console.log('Client closed');
 });

var inspect = require('util').inspect;

/** End MariaSQL */
function executeQuery(queryString, object, callback){
    var queryResult = [];
        mariaClient.query(queryString, object)
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

   ruta: function(iduser, nombre, dias, hora) {
    this.iduser = iduser;
    this.nombre = nombre;
    this.dias = dias;
    this.hora = hora;
  },  
  crear_usuario: function (usuario, callback) {
    var queryStr = 'call rapidin.crear_usuario(:nombre, :apellido, :username, :placa, :capacidad, :bio)';
    var object = { nombre : usuario.nombre,
                apellido : usuario.apellido,
                username : usuario.username,
                placa : usuario.placa,
                capacidad : usuario.capacidad,
                bio : usuario.bio
    };
    executeQuery(queryStr, object, callback);
  },

  verificar_usuario: function (username, callback) {
      var queryStr = 'call rapidin.verificar_usuario(:username)';
      var object = {username : username};
      executeQuery(queryStr, object, callback);
   },

  obtener_usuario: function (usuario,callback){
      var queryStr = 'call rapidin.obtener_usuario(:username)';
      var object = {username : usuario.username};
      executeQuery(queryStr,object,callback);
   },

  update_usuario: function(usuario, callback){
    var queryStr = 'call rapidin.update_usuario(:nombre, :apellido, :username, :placa, :capacidadCarro,:bio)';
    var object = { 
        nombre          : usuario.nombre,
        apellido        : usuario.apellido,
        username        : usuario.username,
        placa           : usuario.placa,
        capacidadCarro  : usuario.capacidad,
        bio             : usuario.bio
    };
    executeQuery(queryStr, object, callback);
   },

  insertar_ruta: function(route, puntos, callback){
    var queryStr = 'call rapidin.insertar_ruta(:username, :nombre, :dias, :hora)';
    var object = { 
        username        : route.iduser,
        nombre          : route.nombre,
        dias            : route.dias,
        hora            : route.hora
    };
    executeQuery(queryStr, object, callback);
    var newRoute = new Route({
        userId : route.iduser,
        name : route.nombre,
        points : puntos
   });
   newRoute.save(function (err, newRoute){
       if(err){
           console.log("Error  al guardar con mongoose");
           return console.error(err);
       } else {
           console.log("stored " + newRoute);
       }
   });
  }

};



