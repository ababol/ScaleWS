require.config({
  baseUrl: "..",
  paths: {
    underscore: "bower_components/underscore/underscore",
    backbone: "bower_components/backbone/backbone",
    jquery: "bower_components/jquery/dist/jquery",
    text: 'bower_components/requirejs-text/text',
    socketio: "/socket.io/socket.io",
    highstock: "bower_components/highstock/highstock"
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    socketio: {
      exports: "io"
    },
    highstock: {
      exports: "Highcharts"
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

  $(document).ready(function() {
    var app = new AppView({
      collection: new MeasureCollection()
    });
    window.app = app;
  });



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