define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/measure/Measure.Abstract.View',
  'text!js/templates/MeasureText.Template.html',
  'js/views/measure/MeasureTextElement.View'
], function ($, _, Backbone, AbstractMeasureView, MeasureTextTemplate, MeasureTextElement) {
  'use strict';

  return AbstractMeasureView.extend({
    template: _.template(MeasureTextTemplate),

    concreteConstructor: function(conf) {
      this.el = $('#'+this.el);
      this.el.html(this.template({"title": conf.title}));
    },

    addOne: function (measure) {
      if (!this.rightType(measure.get("type"))) return;

      var view = new MeasureTextElement({model: measure});
      this.el.append(view.render().el);
    },

    remove: function(measure) {
      if (!this.rightType(measure.get("type"))) return;

      this.el.find('#text-cid-'+measure.cid).remove();
    },

    update: function(measure) {
      if (!this.rightType(measure.get("type"))) return;

      var date = measure.get("date"),
        value = measure.get("value"),
        el = this.el.find('#text-cid-'+measure.cid);

      el.find('.date').html(date);
      el.find('.value').html(value);
    }
  });
});