define([
  'backbone',
  'js/models/Measure.Model'
], function (Backbone, MeasureModel) {
  'use strict';

  return Backbone.Collection.extend({
    model: MeasureModel,

    url: function () {
      return "/measure" + ((this.id) ? '/' + this.id : '');
    },

    // Measures are sorted by their original insertion order.
    comparator: function (measure) {
      return measure.get('date');
    }
  });
});