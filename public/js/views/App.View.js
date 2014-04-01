define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/measure/MeasureText.View.js',
  'js/views/measure/HighChart.View.js',
  'js/config.js'
], function ($, _, Backbone, MeasureTextView, HighChartView, Config) {
  'use strict';

  return Backbone.View.extend({
    initialize: function () {
      this.initViews();
      this.collection.fetch();
    },

    initViews: function() {
      _.each(Config.views.chart, function(c) {
        new HighChartView(c, this.collection);
      }, this);
      _.each(Config.views.text, function(c) {
       new MeasureTextView(c, this.collection);
      }, this);
    }
  });
});