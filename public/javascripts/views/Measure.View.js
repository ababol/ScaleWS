var $ = require("jquery"),
  _ = require("underscore"),
  Backbone = require("backbone");
Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName:  "tr",

  // Cache the template function for a single item.
  template: _.template($('#item-template').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});