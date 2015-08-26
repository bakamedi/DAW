var express 		= require('express');
var bodyParser     	= require('body-parser');
var morgan         	= require('morgan');
var methodOverride 	= require('method-override');

var soap 			= require('soap');

var app 			= express();


//var misc = require('./public/javascripts/val_login');


app.use(express.static(__dirname + '/public'));     	// set the static files location /public/img will be /img for users
app.use(morgan('dev'));	                  				// log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));    // parse application/x-www-form-urlencoded
app.use(bodyParser.json());    							// parse application/json
app.use(methodOverride());

app.get('/', function (req, res) {
  res.render('login.jade')
})



var url = 'http://ws.espol.edu.ec/saac/wsandroid.asmx?WSDL';
app.post('/inicio', function (req, res){
	var args = {authUser: req.body.Email, authContrasenia: req.body.Password};	
	soap.createClient(url, function(err, client) {
	  	client.autenticacion(args, function(err, result) { 
	  		re = result.autenticacionResult;
	  		if(re){
	  			res.render('perfil.jade',req.body.Email);
	  		}
	  		else{
	  			var f = misc.x();
	  			console.log(f);
	  			res.redirect('/');
	  		}
	  			
	  	});
	});
})

app.listen(8080);