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
      'click #removeValue': 'remove',
      'click #close': 'hide'
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    update: function() {
      var value = this.$el.find('#value').val(),
        date = this.$el.find('#date').val();

      if (this.model.get("value") !== value || this.model.get("date") !== date) {
        this.model.set({date: date, value: value});
        Backbone.sync('update', this.model);
      }
    },

    hide: function() {
      this.$el.parent().fadeOut();
      this.$el.remove();
    },

    remove: function() {
      Backbone.sync('delete', this.model);
      this.model.destroy({success: function(model, response) {
      }});
      this.hide();
    }
  });
});