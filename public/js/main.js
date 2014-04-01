require.config({
  baseUrl: "..",
  paths: {
    underscore: "bower_components/underscore/underscore",
    backbone: "bower_components/backbone/backbone",
    d3: "bower_components/d3/d3",
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
    d3: {
      exports: "d3"
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
  "js/collections/Measure.Collection",
  "js/views/App.View"
], function($, _, Backbone, d3, io, MeasureCollection, AppView) {
  var mainIO = io.connect('/main');
  var createIO = io.connect('/create');
  var readIO = io.connect('/read');
  var updateIO = io.connect('/update');
  var deleteIO = io.connect('/delete');
  window.update = updateIO;

  //Override Backbone.sync with socket
  Backbone.sync = function (method, model, options) {
    console.log("sync");
    var create = function () {
      console.log("createEmit");
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
  })
});