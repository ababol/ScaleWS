module.exports = function (modelDb) {
  'use strict';

  var CrudController = require('./CrudController');
  var crudController = new CrudController(modelDb);

  return function (method, model, options) {

    var create = function () {
      crudController.create(model.attributes, function(){
        console.log("create backboneSyncServer");
      });
    };

    var read = function () {
      crudController.read({}, function(err, data){
        options.success(data);
      });
    };

    var update = function () {
      crudController.update(model.attributes, function(err, data){
        console.log("update backboneSyncServer");
      });
    };

    var destroy = function () {
      crudController.delete(model.attributes, function(err, data){
        console.log("delete backboneSyncServer");
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
};