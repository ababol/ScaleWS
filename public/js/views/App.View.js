define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/measure/MeasureText.View.js',
  'js/views/measure/HighChart.View.js',
  'js/views/menu/Menu.View.js',
  'js/config.js'
], function ($, _, Backbone, MeasureTextView, HighChartView, MenuView, Config) {
  'use strict';

  return Backbone.View.extend({
    initialize: function () {
      this.initViews();
      this.collection.fetch();
    },

    initViews: function() {
      // HighChart Views //
      _.each(Config.views.chart, function(c) {
        new HighChartView(c, this.collection);
      }, this);
      // MeasureView //
      _.each(Config.views.text, function(c) {
        new MeasureTextView(c, this.collection);
      }, this);
      // Menu View //
      new MenuView(Config.views.menu);
    }
  });
});