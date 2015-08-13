var express = require('express');

 app = express();

//BEGIN MARIA
var inspect = require('util').inspect;
var Client = require('mariasql');
var dbName;
var c = new Client();
c.connect({
      host: '127.0.0.1',
        user: 'root',
          password: 'tevasaquedarendaw'
});

c.on('connect', function() {
       console.log('Client connected');
        })
 .on('error', function(err) {
        console.log('Client error: ' + err);
         })
 .on('close', function(hadError) {
        console.log('Client closed');
         });

//c.end();

//FIN MARIA
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

app.use(express.logger('dev'))

app.use(express.static(__dirname + '/public'))

app.listen(8080);
