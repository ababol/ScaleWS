require.config({
  baseUrl: '..',
  paths: {
    underscore: 'bower_components/underscore/underscore',
    backbone: 'bower_components/backbone/backbone',
    jquery: 'bower_components/jquery/dist/jquery',
    text: 'bower_components/requirejs-text/text',
    socketio: '/socket.io/socket.io',
    highstock_orig: 'bower_components/highstock/highstock',
    highstock: 'bower_components/touch-tooltip-fix-highchart/touch-tooltip-fix'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    socketio: {
      exports: 'io'
    },
    highstock: {
      deps: ['highstock_orig'],
      exports: 'Highcharts'
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
    window.collection = collection;
    var app = new AppView({
      collection: collection
    });
    window.app = app;
  

    mainIO.on('news', function (data) {
      console.log(data);
    });

    mainIO.on('change:_id', function(data){
      var models = collection.where({value: data.value, type : data.type});
      if(models.length == 1)
        models[0].set("_id", data._id);
      else if(models.length > 1){
        for(var m in models){
          if(models[m].get("date") && typeof(models[m].get("date")) != "string" && models[m].get("date").toISOString() == data.date)
            models[m].set("_id", data._id);
        }
      }
    });

    mainIO.on('change', function(data){
      console.log("change : " + data.value);
      var model = collection.where({_id: data._id})[0];
      if(model)
        model.set(data);
    });

    mainIO.on('add', function(data){
      mask = {};
      var hasDate = false;
      for(var attr in data){
        if(attr != "date")
          mask[attr] = data[attr];
        else
          hasDate = true;
      }
      var assumptions = collection.where(mask);
      var alreadyExist = false;
      if(!hasDate && assumptions.length == 1)
        alreadyExist = true;
      else{
        for(var ass in assumptions){
          if(assumptions[ass].get("date") && typeof(assumptions[ass].get("date")) != "string" && assumptions[ass].get("date").toISOString() == data.date)
            alreadyExist = true;
        }
      }
      if(!alreadyExist)
        collection.add(data);
    });

    mainIO.on('remove', function(data){
      var m = collection.where({_id : data._id});
      if(m.length == 1)
        collection.remove(m[0]);
    });
  });
});
