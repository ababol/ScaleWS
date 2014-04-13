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
      if(this.rightType(measure.get("type")))
        this.updateView();
    },
    remove: function(measure) {
      if(this.rightType(measure.get("type")))
        this.updateView();
    },
    update: function(measure) {
      if(this.rightType(measure.get("type")))
        this.updateView();
    },
    updateView: function(){
      var lastValue = _.reduce(this.collection.where({"type" : this.type}), function(min, c){
          if(min === null)
            return c;
          else if(min.get("date") > c.get("date"))
            return min;
          else
            return c;
        }, null, this);
      
      var averageValue =  _.reduce(this.collection.where({"type" : this.type}), function(num, c){
		      return c.get("value") + num;
        }, 0, this) / this.collection.where({"type" : this.type}).length; 
      
      if(averageValue)
        this.average.html("Average: " + Math.floor(averageValue));
      else
        this.average.html("No value");
      if(lastValue)
        this.last.html("Last: " + Math.floor(lastValue.get("value")));
      else
        this.last("No value");
    }
  });
}); 