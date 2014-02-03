define([
  "jquery",
  "underscore",
  "backbone"
], function(
  $,
  _,
  Backbone
) {
  return Backbone.View.extend({
    tagName:  "tr",

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});