define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  return Backbone.View.extend({
    constructor: function(conf, collection) {
      this.type = conf.type;
      this.el = conf.el;
      this.title = conf.title;
      this.collection = collection;

      this.collection.on('add', this.addOne, this);
      this.collection.on('all', this.render, this);
      this.collection.on('remove', this.remove, this);
      this.collection.on('change', this.update, this);
      //this.constructorbis();
    },

    constructorbis: function() {
      throw 'OVERRIDE!0';
    },

    rightType: function(type) {
      return type === this.type;
    },

    addOne: function() {
      throw "Need to Override the addOne method";
    },
    remove: function() {
      throw "Need to Override the remove method";
    },
    update: function() {
      throw "Need to Override the update method";
    },
    switchOn : function(){
      if(typeof(this.el) == "string" && this.el.search("#") != 0)
        $("#"+this.el).removeAttr('style');
      else if(typeof(this.el) == "string" && this.el.search("#") == 0)
        $(this.el).removeAttr('style');
      else
        this.el.removeAttr('style');
    },
    switchOff : function(){
      if(typeof(this.el) == "string" && this.el.search("#") != 0)
        $("#"+this.el).css("display", "none");
      else if(typeof(this.el) == "string" && this.el.search("#") == 0)
        $(this.el).css("display", "none");
      else
        this.el.css("display", "none");
    }
  });
});