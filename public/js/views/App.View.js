define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/Measure.View.js',
  'js/views/HighChart.View.js',
  'js/config.js'
], function ($, _, Backbone, MeasureView, HighChartView, Config) {
  'use strict';

  return Backbone.View.extend({
    initialize: function () {
      this.initCharts();
      this.collection.on('add', this.addOne, this);
      this.collection.on('reset', this.addAll, this);
      this.collection.on('all', this.render, this);
      this.collection.on('remove', this.remove, this);
      this.collection.on('change', this.update, this);

      this.collection.fetch();
    },

    initCharts: function() {
      this.chart = [];
      _.each(Config.chart, function(c, i) {
        this.chart[i] = new HighChartView(c, this.collection);
      }, this);
    },

    addChartMeasure: function(measure) {
      _.each(this.chart, function(c) {
        if (measure.get("type") == c.type) {
          c.refresh(measure);
        }
      }, this);
    },

    addOne: function (measure) {
      var view = new MeasureView({model: measure});
      $("#measure-list").append(view.render().el);

      this.addChartMeasure(measure);
    },

    // Add all items in the **Measures** collection at once.
    addAll: function () {
      this.collection.each(this.addOne);
    },

    remove: function(measure) {
      console.log(measure);
      _.each(this.chart, function(c) {
        if (measure.get("type") == c.type) {
          c.remove(measure.cid);
        }
      }, this);
    },

    update: function(measure) {
      _.each(this.chart, function(c) {
        if (measure.get("type") == c.type) {
          c.update(measure);
        }
      }, this);
    }
  });
});