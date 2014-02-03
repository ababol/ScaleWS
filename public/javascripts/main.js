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
  var app = new AppView({
    collection: new MeasureCollection()
  });

  var socket = io.connect('http://localhost');

  socket.on('newMeasure', function (data) {
    console.log(data);
    app.addOne(new Measure(JSON.parse(data)));
  });

  socket.on('news', function (data) {
    console.log(data);
  });
  socket.on('Create', function (data) {
    console.log("Create !! ");
    console.log(data);
  });
  socket.on('Error', function (data) {
    console.log("Error !! ");
    console.log(data);
  });
  window.socket = socket;
});