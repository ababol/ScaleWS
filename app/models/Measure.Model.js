module.exports = function (Backbone) {
  'use strict';

  return Backbone.Model.extend({
    idAttribute: "_id",

    defaults: function () {
      return {
        value: 0,
        type: 0,
        date: new Date()
      };
    }
  });
};