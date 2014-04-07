/*global define*/
'use strict';

define([], function () {
  var lineColor = "#6F9CC7";
  var green = "#C5DE71";
  var white = "#CCC";

  return {
    chart: {
      backgroundColor: "#323232",
      type: 'line',
      yAxis: {
        gridLineColor: "rgba(255,255,255, 0.03)"
      }
    },
    scrollbar: {
      barBackgroundColor: '#262626',
      barBorderRadius: 7,
      barBorderWidth: 0,
      buttonBackgroundColor: '#262626',
      buttonBorderWidth: 0,
      buttonArrowColor: '#595959',
      buttonBorderRadius: 7,
      rifleColor: '#595959',
      trackBackgroundColor: '#323232',
      trackBorderWidth: 0,
      trackBorderColor: '#595959'
    },
    title: {
      style: {
        color: green,
        font: '20px "Helvetica", sans-serif'
      }
    },
    credits: {
      enabled: false
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
          color: white
        },
        states: {
          hover: {
            fill: 'none',
            style: {
              color: white
            }
          },
          select: {
            fill: lineColor,
            style: {
              fillColor: '#F00',
              enabled: 'true'
            }
          },
          fillColor:  '#00F'
        }
      },
      inputBoxBorderColor: '#262626',
      inputBoxWidth: 120,
      inputBoxHeight: 18,
      inputStyle: {
        color: white
      },
      labelStyle: {
        color: white
      }
    },
    series: [{
      name: 'Valeur',
      color: lineColor,
      animation: {
        duration: '2000'
      }
    }]
  };
});
