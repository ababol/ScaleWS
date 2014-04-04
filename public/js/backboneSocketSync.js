define([
  'jquery',
  'backbone',
  'socketio'
  ], function ($, Backbone, io) {

    var createIO = io.connect('/create');
    var readIO = io.connect('/read');
    var updateIO = io.connect('/update');
    var deleteIO = io.connect('/delete');
    window.update = updateIO;

    return function (method, model, options) {

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

  });
