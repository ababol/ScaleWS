var Backbone = require("backbone"),
  MeasureModel = require('../models/Measure.Model');

module.exports = Backbone.Collection.extend({
    model: MeasureModel,

    url: function () {
      return "/measure" + ((this.id) ? '/' + this.id : '');
    },

    // Measures are sorted by their original insertion order.
    comparator: function (measure) {
      return measure.get('date');
    }
});