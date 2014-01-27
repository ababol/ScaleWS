$(function ($, _, Backbone) {

  "use strict";

  var Measure, MeasureList, Measures, MeasureView, AppView;

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
  

  var socket = io.connect('http://localhost');

  socket.on('newMeasure', function (data) {
    console.log(data);
    app.addOne(new Measure(JSON.parse(data)));
  });
  
  socket.on('news', function (data) {
    console.log(data);
  });
  socket.on('Create', function (data) {
    console.log("Create !! ");
    console.log(data);
  });
  socket.on('Error', function (data) {
    console.log("Error !! ");
    console.log(data);
  });
  window.socket = socket;
}(jQuery, _, Backbone));
