
/**
 * Module dependencies.
 */
var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express();
var mongoose = require('mongoose');
var config = require('./config.js')(app, express, mongoose);
var models = {};
models.measures = require('./models/measure')(mongoose);

// Routes
var scale = require('./routes/cgi-bin')(models.measures),
  routes = require('./routes');

// Client
app.get('/', routes.index);
app.get('/measures/', routes.measures);
app.get('/measures/:id', routes.measures);
// Scale
app.post('/cgi-bin/:page', scale);
app.post('/cgi-bin/:version/:page', scale);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});