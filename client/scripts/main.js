var Backbone = require('backbone'),
  io = require('socket.io-client'),
  MeasureCollection = require('./collections/Measure.Collection'),
  AppView = require('./views/App.View');

var politness = io.connect('/politness');
var createIO = io.connect('/create');
var readIO = io.connect('/read');
var updateIO = io.connect('/update');
var deleteIO = io.connect('/delete');
window.update = updateIO;

//Override Backbone.sync with socket
Backbone.sync = function (method, model, options) {
  
  var create = function () {
    createIO.emit('ask',model.attributes);
  };

  var read = function () {
    readIO.emit('ask',{});
    readIO.once('answer', function(data){
      options.success(data);
    });
  };

  var update = function () {
    updateIO.emit('ask',model.attributes);
    updateIO.once('answer', function(data){
      console.log("update");
    });
  };

  var destroy = function () {
    deleteIO.emit('ask',model.attributes._id);
    deleteIO.once('answer', function(data){
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
// socket.on('newMeasure', function (data) {
//   console.log(data);
//   app.addOne(new Measure(JSON.parse(data)));
// });

// socket.on('error', function (data) {
//   console.log("Error !! ");
//   console.log(data);
// });


politness.on('news', function (data) {
  console.log(data);
});