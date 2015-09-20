var express         = require('express');
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var methodOverride  = require('method-override');
var sessions        = require("client-sessions");
var soap            = require('soap');
var db_handler      = require('./db_handler');
//uploading files with multer
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, req.carPoolSession.username+".png");
  }
});
var upload = multer({ storage: storage });

var POLLING_INTERVAL = 3000;
var pollingTimer;

var app             = express();
var http            = require('http').Server(app);
var io              = require('socket.io')(http);
var PORT            = 8080;
var usuariosOnline  = {};

var usuariosOnline = {};

io.on('connection', function(socket){
	
	socket.on("inicioSesion",function(username){
        var gr = {nick: username, id: socket.id};
          if(usuariosOnlineMensaje.length==0){
            usuariosOnlineMensaje.push(gr);
          }
          else{
            var i = 0,bandera=0;
            for(i=0;i<usuariosOnlineMensaje.length;i++){
              var name = usuariosOnlineMensaje[i].nick;
              if(name==username){
                //usuariosOnline.push(gr);
                bandera=1;
                console.log("nuevo usuario");
              }
              else{
                console.log("el usuario ya esta");
              }
            }
            if(bandera!=1){
              usuariosOnlineMensaje.push(gr);
            }
          }
          console.log(usuariosOnlineMensaje)
      });

     socket.on("loginUser",function(username){

          console.log(username);
          socket.username = username;
          usuariosOnline[username] = socket.username;

          console.log(usuariosOnline);

          socket.emit("message","yo","Bienvenido " + socket.username + ", te has conectado correctamente");
          socket.broadcast.emit("message","conectado","El usuario "+socket.username + "se ha conectado al chat.");

          io.sockets.emit("updateSidebarUsers",usuariosOnline);
    });

    socket.on('addNewMEssage', function(message){
          socket.emit('message',"msg", "Yo: " +message + ".");
          socket.broadcast.emit("message","msg",socket.username+ "dice: "+ message);
    });

    //cuando el usuario cierra o actualiza el navegador
    socket.on("disconnect", function(){
      //si el usuario, por ejemplo, sin estar logueado refresca la
      //página, el typeof del socket username es undefined, y el mensaje sería
      //El usuario undefined se ha desconectado del chat, con ésto lo evitamos
      if(typeof(socket.username) == "undefined")
      {
        return;
      }
      //en otro caso, eliminamos al usuario
      delete usuariosOnline[socket.username];
      //actualizamos la lista de usuarios en el chat, zona cliente
      io.sockets.emit("updateSidebarUsers", usuariosOnline);
      //emitimos el mensaje global a todos los que están conectados con broadcasts
      socket.broadcast.emit("refreshChat", "desconectado", "El usuario " + socket.username + " se ha desconectado del chat.");
    });

    socket.on('notificacion',function (de,para,mensaje,tipo){
      console.log(de);
      console.log(para);
      console.log(mensaje);
      console.log("-----------------------------");
          var i = 0;
          for(i=0;i<usuariosOnlineMensaje.length;i++){
                  console.log("++++++++++++++++++++++++++++++");
                  console.log(usuariosOnlineMensaje[i].nick);
                  console.log(usuariosOnlineMensaje[i].id);
                  var nom = usuariosOnlineMensaje[i].nick;
                  if(nom==para){
                      console.log("*********************");
                      var usu = usuariosOnlineMensaje[i].id;

                      var fecha = new Date();
                      var hora = new Date();
                      var dd = fecha.getDate();
                      var mm = fecha.getMonth()+1; //hoy es 0!
                      var yyyy = fecha.getFullYear();

                      hora = hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
                      fecha = yyyy+"-"+ mm+'-'+dd;
                      var ubicacion = "";
                      var leido = 0;
                      
                      console.log(usu);
                      //guardar en la base el mensaje
                      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                      var mensajeTotal = new db_handler.mensajeria(de,para,mensaje,fecha,hora,ubicacion,tipo,leido);
                      console.log(mensajeTotal);
                      db_handler.enviar_mensaje(mensajeTotal,function(queryRes){
                        console.log(queryRes);
                      });
                      //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
                      socket.broadcast.to(usu).emit("notificarMensajePrivado",mensaje,tipo,de);
                      console.log("*********************");
                  }
                console.log("++++++++++++++++++++++++++++++");
          }
    });

});
/*
var pollingLoop = function () {
  var mensajeria = new db_handler.mensajeria(req.carPoolSession.username,'hjupiter','llevame','12-12-2015','null','1','0');
    db_handler.enviar_mensaje(mensajeria,function(queryRes){
      res.redirect('/inicio');
    });
};
*/


app.use(express.static(__dirname + '/public'));       // set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public/images'));
app.use(morgan('dev'));                           // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                 // parse application/json
app.use(methodOverride());
//app.use(bodyParser.({uploadDIr:'./uploads'}));

app.use(sessions({
  cookieName: 'carPoolSession', // cookie name dictates the key name added to the request object
  secret: 'tDSg8Iw8hcODgqK6olqL2vUiCqxoKPt1LgBWv8G6wSvTA0d7IV3ZWfbf5oENpcO', // should be a large unguessable string
  duration: 30 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 15 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));


app.get('/chat', function (req, res) {
  /*if(req.carPoolSession.username != null)
        res.redirect('/inicio');
  else*/
        res.render('chat.jade',{user: req.carPoolSession.username});
});


/**
* Pagina de login
**/
app.get('/', function (req, res) {
  if(req.carPoolSession.username){
    res.redirect('/inicio');
  }
  else{
    res.render('login.jade');
  }
});

/**
* Pagina de perfil
**/
app.get('/inicio', function (req, res) {
  if(!req.carPoolSession.username){
    res.redirect('/');
  }
  else{
    var user = new db_handler.user('', '', req.carPoolSession.username, '', '','');
    db_handler.obtener_usuario(req.carPoolSession.username,function(queryRes){
      db_handler.obtener_lista_seguidores(user,function(querySeguidores){
        db_handler.obtener_usuarios(function(queryUsuarios){
            res.render('perfil.jade',{listaPerfil : queryRes,
                                      usuarioGlobal : req.carPoolSession.username,
                                      listaSeguidor : querySeguidores,
                                      listaUsuarios : queryUsuarios});
          });
        });
      });
  }
});

app.get('/inicio/:id',function (req,res){
  if(!req.carPoolSession.username){
    res.redirect('/');
  }
  else{
    var user = new db_handler.user('', '', req.params.id, '', '','');
    db_handler.obtener_usuario(req.params.id,function (queryRes){
      db_handler.obtener_lista_seguidores(req.params.id,function (querySeguidores){
        db_handler.obtener_usuarios(function (queryUsuarios){
            res.render('perfil.jade',{listaPerfil : queryRes,
                                      usuario : req.params.id,
                                      usuarioGlobal : req.carPoolSession.username, 
                                      listaSeguidor : querySeguidores,
                                      listaUsuarios : queryUsuarios});
          });
        });
      });
  }
});

app.get('/editar',function (req,res){
  if(!req.carPoolSession.username){
    res.redirect('/');
  }
  else{
      db_handler.obtener_usuario(req.carPoolSession.username,function(queryRes){
           res.render('editar_perfil.jade',{listaPerfil : queryRes,usuario : req.carPoolSession.username});
      });
  }
});

app.get('/subirImagen',function (req,res){
  console.dir(req.files);
  res.render('subirImagen.jade');
});

app.post('/subir', upload.single('file'), function (req, res, next) {
    //res.send({message:'Archivo guardado', file:req.file});
    res.redirect('/inicio');
});

app.get('/registro', function (req, res) {
  res.render('registro.jade');
});

app.post('/actualiza',function (req,res){
  if(!req.carPoolSession.username){
        res.redirect('/');
  }else{
      var user = new db_handler.user( req.body.nombre,
                                      req.body.apellido,
                                      req.carPoolSession.username,
                                      req.body.placa,
                                      req.body.capacidadCarro,
                                      req.body.bio);
      db_handler.update_usuario(user,function(queryRes){
          db_handler.obtener_usuario(req.carPoolSession.username,function(queryRes){
              res.redirect('/inicio');
          });
      });
    }
});

app.post('/enviar_notificacion_llevame/:id',function (req,res){
  var llevameON = new db_handler.mensajeria(req.carPoolSession.username,
                                            req.body.usuarioSeguidor,
                                            'llevame',
                                            '',
                                            '',
                                            1,
                                            0);
  db_handler.enviar_mensaje(llevameON,function (req,res){
    res.redirect('/inicio');
  });
});

app.get('/llevame',function (req, res){
  if(!req.carPoolSession.username){
        res.redirect('/');
  }else{
    var mensajeria = new db_handler.mensajeria(req.carPoolSession.username,'hjupiter','llevame','12-12-2015','null','1','0');
    db_handler.enviar_mensaje(mensajeria,function(queryRes){
      res.redirect('/inicio');
    });
  }
});

/**
* logout
* Esto deberia de ser un post, pero por ahora por conveniencia es un get.
**/
app.post('/logout', function (req, res) {
  if(req.carPoolSession.username){
        req.carPoolSession.reset();
  }
  res.redirect('/');
});

var url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';
app.post('/crear', function (req, res){
     /*var args = {authUser: req.body.inUsuario, authContrasenia: req.body.inContraseña};
     var argsCrear = {usuario: req.body.inUsuario};
     soap.createClient(url, function(err, client) {
          client.autenticacion(args, function(err, result) {
               re = result.autenticacionResult;
               if(re){
                    db_handler.verificar_usuario(mariaClient,req.body.inUsuario,function(queryRes){
                      if(queryRes[0].FALSE){*/
                        var usrname = req.body.inUsuario.toLowerCase();
                        var argsCrear = {usuario: usrname};
                        soap.createClient(url, function(err , client){
                          client.wsInfoUsuario(argsCrear, function(err, result){
                            var Nombres = "";
                            var Apellidos = "";
                            var user;
                            if(result.wsInfoUsuarioResult === undefined){
                              user = new db_handler.user(Nombres, Apellidos, usrname, req.body.inPlaca, req.body.inCapacidad,req.body.inBiografia);
                              db_handler.crear_usuario(user,function(queryRes){
                                   res.redirect('/');
                              });
                            }
                            else{
                              Nombres = result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO.NOMBRES;
                              Apellidos = result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO.APELLIDOS;
                              //var bio = "--";
                             var imagenRuta = "/uploads/user.jpg";
                              user = new db_handler.user(Nombres, Apellidos, usrname, req.body.inPlaca, req.body.inCapacidad,req.body.inBiografia,imagenRuta);
                              db_handler.crear_usuario(user,function(queryRes){
                                   res.redirect('/');
                              });
                            }
                          });
                        });/*
                      }
                      else{
                        res.redirect('/registro?error=' + 2);
                      }
                    })
               }
               else{
                    res.redirect('/registro?error=' + 1);
               }

          });
     });*/
});
/*
app.post('/inicio', function (req, res){
  var args = {authUser: req.body.Email, authContrasenia: req.body.Password};
  soap.createClient(url, function(err, client) {
      client.autenticacion(args, function(err, result) {
        re = result.autenticacionResult;
        if(re){
                    //req.carPoolSession.username = req.body.Email; //Coloco el username en el session
                         var user = new db_handler.user("Hector", "Jupiter", "hjupiter", "GKT-723", "123");
                         db_handler.crear_usuario(mariaClient, user, function(queryRes){
                              console.log("asdsadsa");
                         })
          //res.render('perfil.jade',req.body.Email);
                               // });
        }
        else{
          res.redirect('/?error=' + 1);
        }

      });
  });
})
*/

app.post('/inicio', function (req, res){
    var usrname = req.body.Email.toLowerCase();
     var args = {authUser: usrname, authContrasenia: req.body.Password};
     soap.createClient(url, function(err, client) {
            client.autenticacion(args, function(err, result) {
                re = result.autenticacionResult;
                if(re){
                      db_handler.verificar_usuario(usrname,function(queryRes){
                          if(queryRes[0].FALSE){
                              res.render('registro.jade',{usu: usrname,con:req.body.Password});
                          }
                          else{
                              req.carPoolSession.username = usrname; 
                              res.redirect('/inicio/?');  
                          }
                      });
                }
                else{
                    res.redirect('/?error=' + 1);
                }

            });
     });
});


app.get('/pass', function (req, res){
    if(!req.carPoolSession.username)
        res.redirect('/');
    else
        res.render('pasajero.jade');
});

app.get('/driver', function (req, res){
    if(!req.carPoolSession.username)
        res.redirect('/');
    else
        res.render('driver.jade');
});

app.post('/nuevaRuta', function (req, res){
    if(!req.carPoolSession.username)
        res.redirect('/');
    else{
        db_handler.insertar_ruta(req.carPoolSession.username, req.body.nombre, req.body.dias, req.body.hora, JSON.parse(req.body.array),function(queryRes){
        });
        res.end('{"success" : "Updated Successfully", "status" : 200}');
    }
});

app.get('/misRutas', function (req, res){
     if(!req.carPoolSession.username)
        res.redirect('/');
     else{
        db_handler.getMisRutas(req.carPoolSession.username, function misRutasCallback(queryRes){
            res.end('{"status" : 200, "array" : ' + JSON.stringify(queryRes) +  '}');
        });
     }
});
app.get('/rutasCerca', function (req, res){
        db_handler.getRutasCerca(req.query.day, req.query.time, req.query.startX, req.query.startY, req.query.endX, req.query.endY, function misRutasCallback(queryRes){
            res.end('{"status" : 200, "array" : ' + JSON.stringify(queryRes) +  '}');
        });
});

app.get('/seguir', function (req, res) {
  if(!req.carPoolSession.username){
    res.redirect('/');
  }
  else{
    //var user = new db_handler.user('req.carPoolSession.Nombre','req.carPoolSession.apellido','','','','req.carPoolSession.bio');
    db_handler.obtener_seguidor(req.carPoolSession.username,function(queryResult){
      res.render('seguir.jade', {listaSeguidor : queryResult,usuario: req.carPoolSession.username});
      
    });
  }
});


app.get('/guardar/:id', function (req, res){
     if(!req.carPoolSession.username)
        res.redirect('/');
    else{
        
        db_handler.agregar_seguidor(req.params.id,req.carPoolSession.username,function(queryRes){
        });
        res.redirect('/seguir');
        console.log(req.params.id);
        console.log(req.carPoolSession.username);
    }
});

app.get('/siguiendo', function (req, res) {
  if(!req.carPoolSession.username){
    res.redirect('/');
  }
  else{
    //var user = new db_handler.user('req.carPoolSession.Nombre','req.carPoolSession.apellido','','','','req.carPoolSession.bio');
    db_handler.obtener_siguiendo(req.carPoolSession.username,function(queryResult){
      res.render('siguiendo.jade', {listaSiguiendo : queryResult});
      
    });
  }
});

http.listen(PORT, function() {
  console.log('el Servidor esta escuchando en el puerto %s',PORT);
});
