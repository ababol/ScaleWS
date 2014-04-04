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
      _.each(Config.views.chart, function(c) {
        this.views.push(new HighChartView(c, this.collection));
      }, this);
      _.each(Config.views.text, function(c) {
        this.views.push(new MeasureTextView(c, this.collection));
      }, this);
    },

    switchViews: function(ev){
      var $target = $(ev.target);
      var name = $target.attr("id");
      window.target = $target;
      if($target.hasClass("selected")){
        $target.removeClass("selected");
        _.each(this.views,function(v){
          if(v.title.toUpperCase().search(this.name.toUpperCase()) != -1){
            v.switchOff();
          }
        } ,{name: name});
      }else{
        $target.addClass("selected");
        _.each(this.views,function(v){
          if(v.title.toUpperCase().search(this.name.toUpperCase()) != -1){
            v.switchOn();
          }
        } ,{name: name});
      }
    }
  });
});