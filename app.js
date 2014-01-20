
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

var sockets = io.listen(server).sockets;
sockets.on('connection', function (socket) {
		socket.emit('news', "hello you !")
	  socket.broadcast.emit('news', "new user connected");
});

var measures = require('./models/measure')(mongoose, sockets);

// Routes
var scale = require('./routes/cgi-bin')(measures),
  routes = require('./routes');

// Client
routes.init(app, model);
// Scale
app.get('/cgi-bin/:page', scale);
app.post('/cgi-bin/:version/:page', scale);
