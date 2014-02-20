/**
 * Module dependencies.
 */
var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express(),
  io = require('socket.io');
var mongoose = require('mongoose');
var config = require('./config.js')(app, express, mongoose);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var socketio = io.listen(server);
socketio.set('log level', 1);
var sockets= socketio.sockets;

var measures = require('./app/models/measure')(mongoose, sockets);


//CRUD functions
var create = function (socket, data) {
  try{
    measures.create(data.value, data.type); //emit a newMeasure to the client
  }catch(err){
    socket.emit('error', err);
  }
};

var read = function (socket, query) {
  measures.find(query, function (err, result) {
    if (!err) {
      socket.emit('answer',result);
    } else {
      socket.emit('error', err);
    }
  });        
};

var update = function (socket, element) {
  measures.db.collections.measures.save(element, function(err, result){
    if(err){
      socket.emit('error', err);
    }else{
      socket.emit('answer',result);
    }
  });
};

var destroy = function (socket, id) {
  measures.db.collections.measures.remove({_id : id},function(err, result){
    if(err){
      socket.emit('error', err);
    }else{
      socket.emit('answer',result);
    }
  }); 
};





socketio.of('/politness').on('connection', function (socket) {
  //politeness
  socket.emit('news', "hello you !");
  socket.broadcast.emit('news', "new user connected");

});

socketio.of('/create').on('connection', function(socket){
  socket.on('ask', function (query){
    create(socket,query);
  });
});

socketio.of('/read').on('connection', function(socket){
  socket.on('ask', function (query){
    read(socket,query);
  });
});

socketio.of('/update').on('connection', function(socket){
   socket.on('ask', function (query){
    update(socket,query);
  });
});

socketio.of('/delete').on('connection', function(socket){
  socket.on('ask', function (query){
    destroy(socket,query);
  });
});





// Routes
var scale = require('./app/routes/cgi-bin')(measures),
  routes = require('./app/routes');

// Client
routes.init(app, measures);
// Scale
app.post('/cgi-bin/:page', scale);
app.post('/cgi-bin/:version/:page', scale);
