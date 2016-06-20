var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic("./views/pages").listen(8080, function(){
  
}));

