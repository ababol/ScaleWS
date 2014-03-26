define([
  'jquery',
  'backbone',
  'd3',
  'js/views/Measure.View.js',
  'js/views/Chart.View.js'
], function ($, Backbone, d3, MeasureView, ChartView) {
  'use strict';

  return Backbone.View.extend({
    initialize: function () {
      console.log(this);
      this.chart = new ChartView();
      this.collection.bind('add', this.addOne, this);
      this.collection.bind('reset', this.addAll, this);
      this.collection.bind('all', this.render, this);

      this.collection.fetch();
    },

    addOne: function (measure) {
      console.log("addOne");
      var view = new MeasureView({model: measure});
      $("#measure-list").append(view.render().el);

      this.chart.refresh(this.collection.models);

//      app.collection.add({
//        "value": 92924,
//        "type": 1,
//        "_id": "52b219517201188b0a0004554",
//        "__v": 0,
//        "date": "2014-03-16T21:53:21.736Z"});
    },

    // Add all items in the **Measures** collection at once.
    addAll: function () {
      this.collection.each(this.addOne);
    }
  });
});