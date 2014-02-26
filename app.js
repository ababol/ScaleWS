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


/*----MVC----*/
//
//Model
var model = require('./app/models/measure')(mongoose, sockets);
//
//Controller
var CrudController = require('./app/controllers/CrudController');
var controller = new CrudController(model);
//
//Views
var socketView = require('./app/networkView/socketView')(controller, socketio);
var apiView  = require('./app/networkView/apiView')(controller, app, "/measure");


/*---- Routes----*/
//
//Client
var client = require('./app/routes');
client.init(app);
//
// Scale
var scale = require('./app/routes/cgi-bin');
scale.init(app, model);