define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/measure/Measure.Abstract.View',
  'text!js/templates/MeasureAverage.Template.html',
], function ($, _, Backbone, AbstractMeasureView, MeasureAverageTemplate) {
  
  return AbstractMeasureView.extend({
    template: _.template(MeasureAverageTemplate),
    last : null,
    average : null,

    concreteConstructor: function(conf) {
      this.el = $('#'+this.el);
      this.el.html(this.template({"type":conf.type ,"title": conf.title}));
      this.last = $("#"+this.el.attr('id') + ' p.last');
      this.average = $("#"+this.el.attr('id') + ' p.average');
    },
    addOne: function(measure) {
      this.last.html(Math.round(measure.get("value")));
      this.updateView();
    },
    remove: function(measure) {
      this.updateView();
      console.log("remove");
    },
    update: function(measure) {
      this.updateView();
      console.log("update");
    },
    updateView: function(){
      var lastValue = _.reduce(this.collection.models, function(min, c){
          if(c.get("type") != this.type)
            return min;
          if(min == null)
            return c;
          else if(min.get("date") > c.get("date"))
            return min;
          else
            return c;
        }, null, this);
      var averageValue =  _.reduce(this.collection.models, function(num, c){
          if(c.get("type") != this.type)
            return num;
		  return c.get("value") + num;
        }, 0, this) / this.collection.where({"type" : this.type}).length; 
      this.average.html("Average: " + Math.floor(averageValue));
      this.last.html("Last: " + Math.floor(lastValue.get("value")));
    }
  });
}); 