module.exports = function (Backbone, MeasureModel) {
  'use strict';

  return Backbone.Collection.extend({
    model: MeasureModel,

    // Measures are sorted by their original insertion order.
    comparator: function (measure) {
      return measure.get('date');
    }
  });
};