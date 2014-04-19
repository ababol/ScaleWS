module.exports = function (modelDb) {
  'use strict';

  var CrudController = require('./CrudController');
  var crudController = new CrudController(modelDb);

  return function (method, model, options) {

    var create = function () {
      crudController.create(model.attributes, function(err, data){
        console.log("create backboneSyncServer");
        options.success(data);
      });
    };

    var read = function () {
      crudController.read({}, function(err, data){
        console.log("read backboneSyncServer");
        options.success(data);
      });
    };

    var update = function () {
      crudController.update(model.attributes, function(err, data){
        console.log("update backboneSyncServer");
        options.success(data);
      });
    };

    var destroy = function () {
      crudController.delete(model.attributes, function(err, data){
        console.log("delete backboneSyncServer");
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
};