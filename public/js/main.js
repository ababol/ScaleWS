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
  "js/collections/Measure.Collection",
  "js/views/App.View"
], function($, _, Backbone, d3, io, MeasureCollection, AppView) {
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
      readIO.emit('ask',{type:1});
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

  app.collection.add({
    "value": 80924,
    "type": 1,
    "_id": "52b219517201188b0a0004558",
    "__v": 0,
    "date": "2014-06-16T21:53:21.736Z"});


  politness.on('news', function (data) {
    console.log(data);
  });
});