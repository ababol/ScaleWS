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

    constructor : function (conf, collection) {
      AbstractMeasureView.prototype.constructor.call(this, conf, collection);

      var self = this,
        tooltip = $('#tooltip'),
        theme = conf.theme;
      this.chart = new Highcharts.StockChart({
        chart: {
          renderTo: this.el,
          zoomType: 'x',
          type: 'line',
          backgroundColor: theme.bgColor,
          events: {
            click: function(e) {
              var x = new Date(e.xAxis[0].value).toISOString(),
                y = e.yAxis[0].value;

              // Add it
              self.collection.create({
                "type": self.type,
                "date": x,
                "value": y
              });

            }
          }
        },
        yAxis: {
          gridLineColor: theme.yAxisColor
        },
        title: {
          text: conf.title,
          style: theme.title.style
        },
        tooltip: {
          useHTML: true,
          formatter: function() {
            return "Date : "+Highcharts.dateFormat('%d-%m-%Y %H:%M:%S', this.x) +'<br/>'+
              "Valeur : "+Highcharts.numberFormat(this.y, 2);
          }
        },
        plotOptions: {
          series: {
            allowPointSelect: true
//            marker: {
//              states: {
//                select: {
//                  borderColor: 'red',
//                  color: null,
//                  enabled: true
//                }
//              }
//            }
          }
        },
        scrollbar: theme.scrollbar,
        rangeSelector: theme.rangeSelector,
        navigator: {
          adaptToUpdatedData: true
        },
        series:
          [{
            name: 'Valeur',
            color: theme.lineColor,
            animation: {
              duration: theme.animationDuration
            },
            data : [],
            cursor: 'pointer',
            point: {
              events: {
                click: function(e) {
                  var view = new TooltipFormView({model: self.collection.get(e.currentTarget.id)});
                  tooltip.html(view.render().el);
                  tooltip.fadeIn();
                }
              }
            }
          }]
      });
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