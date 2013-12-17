
/**
 * Module dependencies.
 */

var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express();
  app.mongoose = require('mongoose');
var config = require('./config.js')(app, express);

// DB Model -- Not used yet
var models = {};
models.measures = require('./models/measure')(app.mongoose).model;

// Routes
var scale = require('./routes/cgi-bin'),
  routes = require('./routes');

// Client
app.get('/', routes.index);
// Scale
app.post('/cgi-bin/:page', scale);
app.post('/cgi-bin/:version/:page', scale);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});