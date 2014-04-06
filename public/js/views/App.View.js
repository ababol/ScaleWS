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
    views :[],
    el: $(".menu"),
    events: {
      'click': 'switchViews'
    },
    initialize: function () {
      this.initViews();
      this.collection.fetch();
    },

    initViews: function() {
      // HighChart Views //
      _.each(Config.views.chart, function(c) {
        this.views.push(new HighChartView(c, this.collection));
      }, this);
      // MeasureView //
      _.each(Config.views.text, function(c) {
        this.views.push(new MeasureTextView(c, this.collection));
      }, this);
      // Menu Views //
      new MenuView(Config.views.menu);
    }
  });
});