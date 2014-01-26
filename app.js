
/**
 * Module dependencies.
 */
var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express(),
  io = require('socket.io')
var mongoose = require('mongoose');
var config = require('./config.js')(app, express, mongoose);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = io.listen(server);
var measures = require('./models/measure')(mongoose, io.sockets);

io.sockets.on('connection', function (socket) {
  
  /**
   * measures:read
   *
   * called when we .fetch() our collection
   * in the client-side router
   */

  socket.on('measures:read', function (data, callback) {

    callback(null, measures.find());
  });


});  


// Routes
var scale = require('./routes/cgi-bin')(measures),
  routes = require('./routes');

// Client
routes.init(app, model);
// Scale
app.get('/cgi-bin/:page', scale);
app.post('/cgi-bin/:version/:page', scale);
