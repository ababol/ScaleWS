require.config({
  baseUrl: "..",
  paths: {
    "app": "javascripts",
    "underscore": "vendor/underscore-1.5.2.min",
    "backbone": "vendor/backbone-1.1.0.min",
    "d3": "vendor/d3.v3-4.1",
    "jquery": "vendor/jquery-2.0.3.min",
    "socketio": "/socket.io/socket.io"
  },
  shim: {
    "underscore": {
      exports: "_"
    },
    "backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    "d3": {
      exports: "d3"
    },
    "socketio": {
      exports: "io"
    }
  }
});

require([
  "jquery",
  "underscore",
  "backbone",
  "d3",
  "socketio",
  "app/collections/Measure.Collection",
  "app/views/App.View"
], function(
  $,
  _,
  Backbone,
  d3,
  io,
  MeasureCollection,
  AppView
) {
  var socket = io.connect('http://localhost');

  window.socket = socket;

  //Override Backbone.sync with socket
  Backbone.sync = function (method, model, options) {
    var socket = window.socket;

    var create = function () {
      socket.emit('create',{});
      socket.once('create-answer', function(data){
        options.success(data);
      });
    };

    var read = function () {
      socket.emit('read',{});
      socket.once('read-answer', function(data){
        options.success(data);
      });
    };

    var update = function () {
      socket.emit('update',{});
      socket.once('update-answer', function(data){
        options.success(data);
      });
    };

    var destroy = function () {
      socket.emit('delete',{});
      socket.once('delete-answer', function(data){
        options.success(data);
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
        destroy();
        break;
    }
  };

  var app = new AppView({
    collection: new MeasureCollection()
  });

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
});