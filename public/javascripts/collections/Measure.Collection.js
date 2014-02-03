define([
  "jquery",
  "underscore",
  "backbone",
  "app/models/Measure.Model"
], function(
  $,
  _,
  Backbone,
  MeasureModel
) {
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