define([
  'jquery',
  'backbone',
  'underscore',
  'highstock',
  'js/views/measure/Measure.Abstract.View',
  'js/views/TooltipForm.View.js'
], function ($, Backbone, _, Highcharts, AbstractMeasureView, TooltipFormView) {
  'use strict';

  return AbstractMeasureView.extend({

    concreteConstructor: function(conf) {
      var self = this,
        tooltip = $('#tooltip'),
        theme = conf.theme;

      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });

      var chart = {
        chart: {
          renderTo: this.el,
          zoomType: 'x',
          events: {
            click: function(e) {
              var x = new Date(e.xAxis[0].value).toISOString(),
                y = Math.floor(e.yAxis[0].value*100)/100;

              // Add it
              self.collection.create({
                "type": self.type,
                "date": x,
                "value": y
              });

            }
          }
        },
        title: {
          text: conf.title
        },
        tooltip: {
          useHTML: true,
          formatter: function() {
            return "Date : "+Highcharts.dateFormat('%d-%m-%Y %H:%M:%S', this.x) +'<br/>'+
              "Valeur : "+Highcharts.numberFormat(this.y, 2);
          },
          followTouchMove: true,
          followPointer: false
        },
        plotOptions: {
          series: {
            allowPointSelect: true
          }
        },
        navigator: {
          adaptToUpdatedData: true
        },
        series:
          [{
            data : [],
            cursor: 'pointer',
            point: {
              events: {
                click: function(e) {
                  var view = new TooltipFormView({model: self.collection.get(e.currentTarget.id), collection : self.collection});
                  tooltip.html(view.render().el);
                  tooltip.fadeIn();
                }
              }
            }
          }]
      };
      $.extend(true, chart, theme); // true : deep extend
      this.chart = new Highcharts.StockChart(chart);
    },

    addOne: function (measure) {
      if (!this.rightType(measure.get("type"))) return;
      var date = new Date(measure.get("date")).getTime();

      this.chart.series[0].addPoint({id: measure.cid, x: date,y: measure.get("value")},true, false, true);
    },

    remove: function(measure) {
      if (!this.rightType(measure.get("type"))) return;

      this.chart.get(measure.cid).remove();
    },

    update: function(measure) {
      if (!this.rightType(measure.get("type"))) return;
      var date = new Date(measure.get("date")).getTime(),
        value = parseFloat(measure.get("value"), 2);

      this.chart.get(measure.cid).update({x: date,y: value}, true, true);
    }
  });
});