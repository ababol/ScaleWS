$(function ($, _, Backbone) {

  "use strict";

  var Measure, MeasureList, Measures, MeasureView, AppView;

  var socket = io.connect('http://localhost');

  window.socket = socket;

  //Override Backbone.sync with socket
  Backbone.sync = function (method, model, options) {
    var socket = window.socket;

    var create = function () {
      socket.emit('create',{});
      socket.once('create-answer', function(data){
        options.success(data);
      });
    };

    var read = function () {
      socket.emit('read',{});
      socket.once('read-answer', function(data){
        options.success(data);
      });
    };

    var update = function () {
      socket.emit('update',{});
      socket.once('update-answer', function(data){
        options.success(data);
      });
    };

    var destroy = function () {
      socket.emit('delete',{});
      socket.once('delete-answer', function(data){
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


  // Measure Model
  // ----------

  Measure = Backbone.Model.extend({
    idAttribute: "_id",

    defaults: function () {
      return {
        value: 0,
        type: 0,
        date: new Date()
      };
    }

  });

  // Measure Collection
  // ---------------

  MeasureList = Backbone.Collection.extend({

    model: Measure,

    url: function () {
      return "/measure" + ((this.id) ? '/' + this.id : '');
    },

    // Measures are sorted by their original insertion order.
    comparator: function (measure) {
      return measure.get('date');
    }

  });

  Measures = new MeasureList();

  // Measure Item View
  // --------------

  MeasureView = Backbone.View.extend({
    tagName:  "tr",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

  // The Application
  // ---------------

  AppView = Backbone.View.extend({

    initialize: function () {
      Measures.bind('add', this.addOne, this);
      Measures.bind('reset', this.addAll, this);
      Measures.bind('all', this.render, this);

      Measures.fetch();

    },

    addOne: function (measure) {
      var view = new MeasureView({model: measure});
      $("#measure-list").append(view.render().el);
    },

    // Add all items in the **Measures** collection at once.
    addAll: function () {
      Measures.each(this.addOne);
    }


  });

  var app = new AppView();
  
  //Updates collection when a new measure is added to the database 
  socket.on('newMeasure', function (data) {
    console.log(data);
    app.addOne(new Measure(JSON.parse(data)));
  });
  
  socket.on('news', function (data) {
    console.log(data);
  });
  socket.on('error', function (data) {
    console.log("Error !! ");
    console.log(data);
  });



}(jQuery, _, Backbone));
