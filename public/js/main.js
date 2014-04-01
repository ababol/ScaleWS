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
  'jquery',
  'underscore',
  'backbone',
  'socketio',
  'js/backboneSocketSync',
  'js/collections/Measure.Collection',
  'js/views/App.View'
], function($, _, Backbone, io, backboneSocketSync, MeasureCollection, AppView) {

  $(document).ready(function() {
    
    var mainIO = io.connect('/main');
    //Override Backbone.sync with socket
    Backbone.sync = backboneSocketSync;
    var collection = new MeasureCollection();
    var app = new AppView({
      collection: collection
    });
    window.app = app;
  

    mainIO.on('news', function (data) {
      console.log(data);
    });
    mainIO.on('change', function(data){
      console.log(data);
    });
    mainIO.on('add', function(data){
      collection.add(data);
    });
    mainIO.on('remove', function(data){
      collection.remove(data);
    });


  });



});