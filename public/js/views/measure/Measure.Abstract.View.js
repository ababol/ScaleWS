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
      $('#'+this.el).addClass('type'+this.type);

      this.collection.on('add', this.addOne, this);
      this.collection.on('all', this.render, this);
      this.collection.on('remove', this.remove, this);
      this.collection.on('change', this.update, this);

      this.concreteConstructor(conf);
    },
    concreteConstructor: function(conf) {
      throw "Need to override the concreteConstructor method";
    },
    addOne: function() {
      throw "Need to override the addOne method";
    },
    remove: function() {
      throw "Need to override the remove method";
    },
    update: function() {
      throw "Need to override the update method";
    },
    rightType: function(type) {
      return type === this.type;
    }
  });
});