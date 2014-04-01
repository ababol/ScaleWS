/*global define*/
'use strict';

define([], function () {
  var chartBgColor = "#101214",
    chartLineColor = "#3e6288";

  return {
    chart: {
      0: {
        el: "chart-weight",
        title: "Weight Chart",
        backgroundColor: chartBgColor,
        chartLineColor: chartLineColor,
        type: 1
      },
      1: {
        el: "chart-temperature",
        title: "Temperature Chart",
        backgroundColor: chartBgColor,
        chartLineColor: chartLineColor,
        type: 12
      },
      2: {
        el: "chart-air",
        title: "Air Chart",
        backgroundColor: chartBgColor,
        chartLineColor: chartLineColor,
        type: 35
      },
      3: {
        el: "chart-pulse",
        title: "Pulse Chart",
        backgroundColor: chartBgColor,
        chartLineColor: chartLineColor,
        type: 11
      }
    }
  };
});
