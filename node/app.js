var express 		= require('express');
var bodyParser     	= require('body-parser');
var morgan         	= require('morgan');
var methodOverride 	= require('method-override');
var sessions = require("client-sessions");
var soap 			= require('soap');

var app 			= express();


//var misc = require('./public/javascripts/val_login');


app.use(express.static(__dirname + '/public'));     	// set the static files location /public/img will be /img for users
app.use(morgan('dev'));	                  				// log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    							// parse application/json
app.use(methodOverride());

app.use(sessions({
  cookieName: 'carPoolSession', // cookie name dictates the key name added to the request object
  secret: 'tDSg8Iw8hcODgqK6olqL2vUiCqxoKPt1LgBWv8G6wSvTA0d7IV3ZWfbf5oENpcO', // should be a large unguessable string
  duration: 30 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 15 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

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
        res.render('perfil.jade')
})

var url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';
app.post('/inicio', function (req, res){
	var args = {authUser: req.body.Email, authContrasenia: req.body.Password};	
	soap.createClient(url, function(err, client) {
	  	client.autenticacion(args, function(err, result) { 
	  		re = result.autenticacionResult;
	  		if(re){
                                req.carPoolSession.username = req.body.Email; //Coloco el username en el session
	  			res.render('perfil.jade',req.body.Email);
	  		}
	  		else{
	  			res.redirect('/');
	  		}
	  			
	  	});
	});
})

app.listen(8080);
