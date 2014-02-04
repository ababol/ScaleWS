var Backbone = require("backbone");

module.exports = Backbone.Model.extend({
  idAttribute: "_id",

  defaults: function () {
    return {
      value: 0,
      type: 0,
      date: new Date()
    };
  }
});