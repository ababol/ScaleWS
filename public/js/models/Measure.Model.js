define([
  'backbone'
], function (Backbone) {
  'use strict';

  return Backbone.Model.extend({
    defaults: function () {
      return {
        value: 0,
        type: 0,
        date: new Date()
      };
    }
  });
});