
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

var measures = require('./models/measure')(mongoose, sockets);

sockets.on('connection', function (socket) {
  //politeness
  socket.emit('news', "hello you !");
  socket.broadcast.emit('news', "new user connected");

  //CRUD
  socket.on('Read', function (query){
    measures.find(query, function (err, result) {
      if (!err) {
        socket.emit('Create',result);
      } else {
        socket.emit('Error', err);
      }
    });
  });
});




// Routes
var scale = require('./routes/cgi-bin')(measures),
  routes = require('./routes');

// Client
routes.init(app, model);
// Scale
app.post('/cgi-bin/:page', scale);
app.post('/cgi-bin/:version/:page', scale);
