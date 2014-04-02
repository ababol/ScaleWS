/*global define*/
'use strict';

define([], function () {
  var lineColor = "#3e6288";

  return {
    bgColor: "#101214",
    lineColor: lineColor,
    yAxisColor: "rgba(255,255,255, 0.03)",
    animationDuration: 2000,
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
      trackBorderColor: 'silver'
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
          color: lineColor,
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
            fill: lineColor,
            style: {
              fillColor: '#F00',
              enabled: 'true'
            }
          },
          fillColor:  '#00F'
        }
      },
      inputBoxBorderColor: 'gray',
      inputBoxWidth: 120,
      inputBoxHeight: 18,
      inputStyle: {
        color: lineColor,
        fontWeight: 'bold'
      },
      labelStyle: {
        color: 'silver',
        fontWeight: 'bold'
      }
    }
  };
});
