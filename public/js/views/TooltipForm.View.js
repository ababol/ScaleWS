define([
  'jquery',
  'underscore',
  'backbone',
  'text!js/templates/TooltipForm.Template.html'
], function ($, _, Backbone, TooltipFormTemplate) {
  'use strict';

  return Backbone.View.extend({
    template: _.template(TooltipFormTemplate),
    events: {
      'click #updateValue': 'update',
      'click #removeValue': 'remove'
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    update: function() {
      var value = this.$el.find('#value').val(),
        date = this.$el.find('#date').val();

      if (this.model.get("value") != value || this.model.get("date") != date)
        this.model.set({date: date, value: value});
    },

    remove: function() {
      this.model.destroy();
    }
  });
});