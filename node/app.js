var express     = require('express');
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var methodOverride  = require('method-override');
var sessions        = require("client-sessions");
var soap      = require('soap');
var db_handler      = require ('./db_handler');
var credentials      = require ('./credentials');
var app       = express();


//var misc = require('./public/javascripts/val_login');


app.use(express.static(__dirname + '/public'));       // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                           // log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                 // parse application/json
app.use(methodOverride());

app.use(sessions({
  cookieName: 'carPoolSession', // cookie name dictates the key name added to the request object
  secret: 'tDSg8Iw8hcODgqK6olqL2vUiCqxoKPt1LgBWv8G6wSvTA0d7IV3ZWfbf5oENpcO', // should be a large unguessable string
  duration: 30 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 15 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

//BEGIN MARIA
var Client = require('mariasql');
var mariaClient = new Client();
mariaClient.connect({
     host: '127.0.0.1',
     user: 'root',
     password: 'root'
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




//FIN MARIA

/**
* Pagina de login
**/
app.get('/', function (req, res) {
  if(req.carPoolSession.username != null)
        res.redirect('/inicio');
  else
        res.render('login.jade')
})

/**
* Pagina de perfil
**/
app.get('/inicio', function (req, res) {
  if(req.carPoolSession.username == null)
        res.redirect('/');
  else
      var user = new db_handler.user('', '', req.carPoolSession.username, '', '','');
      db_handler.obtener_usuario(mariaClient,user,function(queryRes){
           res.render('perfil.jade',{listaPerfil : queryRes});
      });
})

app.get('/editar',function (req,res){
  var user = new db_handler.user('', '', req.carPoolSession.username, '', '','');
      db_handler.obtener_usuario(mariaClient,user,function(queryRes){
           res.render('editar_perfil.jade',{listaPerfil : queryRes});
      });
});

app.get('/registro', function (req, res) {
  res.render('registro.jade');
});

app.post('/actualiza',function (req,res){
  if(req.carPoolSession.username == null)
        res.redirect('/');
  else
      var user = new db_handler.user( req.body.nombre,
                                      req.body.apellido,
                                      req.carPoolSession.username,
                                      req.body.placa,
                                      req.body.capacidadCarro);
      db_handler.update_usuario(mariaClient,user,function(queryRes){
          var user = new db_handler.user('', '', req.carPoolSession.username, '', '','');
          db_handler.obtener_usuario(mariaClient,user,function(queryRes){
              res.redirect('/inicio');
          });
      });
});

/**
* logout
* Esto deberia de ser un post, pero por ahora por conveniencia es un get.
**/
app.get('/logout', function (req, res) {
  if(req.carPoolSession.username != null)
        req.carPoolSession.reset();  
  res.redirect('/')
})

var url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';
app.post('/crear', function (req, res){
     var args = {authUser: req.body.inUsuario, authContrasenia: req.body.inContraseña}; 
     var argsCrear = {usuario: req.body.inUsuario};
     soap.createClient(url, function(err, client) {
          client.autenticacion(args, function(err, result) { 
               re = result.autenticacionResult;
               if(re){
                    db_handler.verificar_usuario(mariaClient,req.body.inUsuario,function(queryRes){
                      if(queryRes[0].FALSE){
                        soap.createClient(url, function(err , client){
                          client.wsInfoUsuario(argsCrear, function(err, result){
                              var Nombres = result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO.NOMBRES;
                              var Apellidos = result.wsInfoUsuarioResult.diffgram.NewDataSet.INFORMACIONUSUARIO.APELLIDOS;
                              var bio = "--";
                              var user = new db_handler.user(Nombres, Apellidos, req.body.inUsuario, req.body.inPlaca, req.body.inCapacidad,bio);
                              db_handler.crear_usuario(mariaClient,user,function(queryRes){
                                   res.redirect('/');
                              })
                          })
                        })
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
     });
})
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
     db_handler.verificar_usuario(mariaClient,req.body.Email,function(queryRes){
          if(queryRes[0].FALSE){
               res.redirect('/inicio');
               //el usuario no esta registrado
          }
          else{
               //usuario registrado
               var args = {authUser: req.body.Email, authContrasenia: req.body.Password}; 
               soap.createClient(url, function(err, client) {
                    client.autenticacion(args, function(err, result) { 
                         re = result.autenticacionResult;
                         if(re){
                              req.carPoolSession.username = req.body.Email; 
                              res.redirect('/inicio/?');
                         }
                         else{
                              res.redirect('/?error=' + 1);
                         }
                    });
               });
          }
          
     });
})

app.listen(8080);