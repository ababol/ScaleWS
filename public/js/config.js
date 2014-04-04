/*global define*/
'use strict';

define(['styles/js/dark-light-theme.js'], function (dark) {
  return {
    views: {
      chart: {
        0: {
          el: "chart-weight",
          title: "Weight Chart",
          theme: dark,
          type: 1
        },
        1: {
          el: "chart-temperature",
          title: "Temperature Chart",
          theme: dark,
          type: 12
        },
        2: {
          el: "chart-air",
          title: "Air Chart",
          theme: dark,
          type: 35
        },
        3: {
          el: "chart-pulse",
          title: "Pulse Chart",
          theme: dark,
          type: 11
        }
      },
      text: {
        0: {
          el: "text-weight",
          title: "Weight Table",
          type: 1
        },
        1: {
          el: "text-temperature",
          title: "Temperature Table",
          type: 12
        },
        2: {
          el: "text-pulse",
          title: "Pulse Table",
          type: 11
        }
      }
    }
  };
});
