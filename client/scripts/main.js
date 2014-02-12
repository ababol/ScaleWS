var Backbone = require('backbone'),
  io = require('socket.io-client'),
  MeasureCollection = require('./collections/Measure.Collection'),
  AppView = require('./views/App.View');

var socket = io.connect('http://localhost');

window.socket = socket;

//Override Backbone.sync with socket
Backbone.sync = function (method, model, options) {
  var socket = window.socket;

  var create = function () {
    socket.emit('create',model.attributes);
  };

  var read = function () {
    socket.emit('read',{});
    socket.once('read-answer', function(data){
      options.success(data);
    });
  };

  var update = function () {
    socket.emit('update',model.attributes);
    socket.once('update-answer', function(data){
      consolo.log("update");
    });
  };

  var destroy = function () {
    console.log("delete1");
    socket.emit('delete',model.attributes._id);
    socket.once('delete-answer', function(data){
      console.log("delete");
    });
  };

  switch (method) {
    case 'create':
      create();
      break;
    case 'read':
      read();
      break;
    case 'update':
      update();
      break;
    case 'delete':
      break;
  }
};

var app = new AppView({
  collection: new MeasureCollection()
});
window.app = app;

//Updates collection when a new measure is added to the database
socket.on('newMeasure', function (data) {
  console.log(data);
  app.addOne(new Measure(JSON.parse(data)));
});

socket.on('news', function (data) {
  console.log(data);
});
socket.on('error', function (data) {
  console.log("Error !! ");
  console.log(data);
});