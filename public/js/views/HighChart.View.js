define([
  'jquery',
  'backbone',
  'underscore',
  'highstock',
  'js/views/TooltipForm.View.js'
], function ($, Backbone, _, Highcharts, TooltipFormView) {
  'use strict';

  return Backbone.View.extend({

    constructor : function (chartConf, collection) {
      this.type = chartConf.type;
      this.el = chartConf.el;
      this.collection = collection;

      var self = this,
        tooltip = $('#tooltip');
      this.chart = new Highcharts.StockChart({
        chart: {
          renderTo: this.el,
          zoomType: 'x',
          type: 'line',
          backgroundColor: chartConf.backgroundColor,
          events: {
            click: function(e) {
              var x = new Date(e.xAxis[0].value).toISOString(),
                y = e.yAxis[0].value;

              // Add it
              self.collection.add({
                "type": self.type,
                "date": x,
                "value": y
              });

            },
            drilldown: function (e) {
              console.log(e);
            }
          }
        },
        yAxis: {
          gridLineColor: 'rgba(255,255,255, 0.03)'
        },
        title: {
          text: chartConf.title
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
        scrollbar: {
          barBackgroundColor: 'gray',
          barBorderRadius: 7,
          barBorderWidth: 0,
          buttonBackgroundColor: 'gray',
          buttonBorderWidth: 0,
          buttonArrowColor: 'yellow',
          buttonBorderRadius: 7,
          rifleColor: 'yellow',
          trackBackgroundColor: 'white',
          trackBorderWidth: 1,
          trackBorderColor: 'silver',
          trackBorderRadius: 7
        },
        rangeSelector: {
          selected: 1,
          inputDateFormat: '%d-%m-%Y',
          buttons: [{
            count: 1,
            type: 'week',
            text: '1w'
          }, {
            type: 'month',
            count: 1,
            text: '1m'
          }, {
            type: 'all',
            text: 'All'
          }],
          buttonTheme: { // styles for the buttons
            fill: 'none',
            stroke: 'none',
            'stroke-width': 0,
            r: 8,
            style: {
              color: chartConf.chartLineColor,
              fontWeight: 'bold'
            },
            states: {
              hover: {
                fill: 'none',
                style: {
                  color: 'white'
                }
              },
              select: {
                fill: chartConf.chartLineColor,
                style: {
                  fillColor: '#F00',
                  enabled: 'true'
                }
              },
              fillColor:  '#00dddddF'
            }
          },
          inputBoxBorderColor: 'gray',
          inputBoxWidth: 120,
          inputBoxHeight: 18,
          inputStyle: {
            color: chartConf.chartLineColor,
            fontWeight: 'bold'
          },
          labelStyle: {
            color: 'silver',
            fontWeight: 'bold'
          }
        },
        navigator: {
          adaptToUpdatedData: true
        },
        series:
          [{
            name: 'Valeur',
            color: chartConf.chartLineColor,
            animation: {
              duration: 2000
            },
            data : [],
            cursor: 'pointer',
            point: {
              events: {
                click: function(e) {
                  tooltip.show();
                  var view = new TooltipFormView({model: self.collection.get(e.currentTarget.id)});
                  tooltip.html(view.render().el);
                }
              }
            }
          }]
      });
    },


    refresh: function (measure) {
      var date = new Date(measure.get("date")).getTime();
      this.chart.series[0].addPoint({id: measure.cid, x: date,y: measure.get("value")},true, false, true);
      //this.chart.redraw(true);
    },

    remove: function(id) {
      console.log(id);
      this.chart.get(id).remove();
    },

    update: function(measure) {
      var date = new Date(measure.get("date")).getTime(),
        value = parseInt(measure.get("value"));
      this.chart.get(measure.cid).update({x: date,y: value}, true, true);
    }
  });
});