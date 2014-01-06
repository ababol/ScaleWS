
/**
 * Module dependencies.
 */
var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express();
var mongoose = require('mongoose');
var config = require('./config.js')(app, express, mongoose);
var measures = require('./models/measure')(mongoose);

// Routes
var scale = require('./routes/cgi-bin')(measures),
  routes = require('./routes')(measures);

// Client
app.get('/', routes);
// Scale
app.post('/cgi-bin/:page', scale);
app.post('/cgi-bin/:version/:page', scale);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});