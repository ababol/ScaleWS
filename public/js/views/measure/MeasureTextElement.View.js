define([
  'jquery',
  'underscore',
  'backbone',
  'text!js/templates/MeasureTextElement.Template.html'
], function ($, _, Backbone, MeasureTextElementTemplate) {
  'use strict';

  return Backbone.View.extend({
    tagName: 'tr',
    template: _.template(MeasureTextElementTemplate),

    render: function () {
      var date = new Date(this.model.get('date'));
      this.model.set('date', date);
      this.$el.html(this.template(this.model.toJSON())).attr('id', 'text-cid-'+this.model.cid);
      return this;
    }
  });
});