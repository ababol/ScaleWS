require.config({
  baseUrl: "..",
  paths: {
    "underscore": "bower_components/underscore/underscore",
    "backbone": "bower_components/backbone/backbone",
    "d3": "bower_components/d3/d3",
    "jquery": "bower_components/jquery/dist/jquery",
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
  "js/backboneSocketSync",
  "js/collections/Measure.Collection",
  "js/views/App.View"
], function($, _, Backbone, d3, io, backboneSocketSync, MeasureCollection, AppView) {
  var mainIO = io.connect('/main');

  //Override Backbone.sync with socket
  Backbone.sync = backboneSocketSync;

  var app = new AppView({
    collection: new MeasureCollection()
  });
  window.app = app;



  mainIO.on('news', function (data) {
    console.log(data);
  });
  mainIO.on('change', function(data){
    console.log(data);
  });
  mainIO.on('add', function(data){
    console.log(data);
  });
  mainIO.on('remove', function(data){
    console.log(data);
  });
});