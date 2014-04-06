define([
  'jquery',
  'underscore',
  'backbone',
  'js/views/menu/MenuItem.View.js'
], function ($, _, Backbone, MenuItemView) {
  'use strict';

  return Backbone.View.extend({
    el: '#menu',

    initialize: function (conf) {
      _.each(conf, function(c) {
        this.$el.append(new MenuItemView(c).el);
      }, this);
    }
  });
});