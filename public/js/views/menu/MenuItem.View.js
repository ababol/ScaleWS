define([
  'jquery',
  'underscore',
  'backbone',
  'text!js/templates/MenuItem.Template.html'
], function ($, _, Backbone, MenuItemTemplate) {
  'use strict';

  return Backbone.View.extend({
    tagName: 'div',
    className: 'menuItem',
    template: _.template(MenuItemTemplate),
    events: {
      'click': 'toggleView'
    },

    initialize: function (conf) {
      this.$el.html(this.template(conf));
      return this;
    },

    toggleView: function(ev){
      var target = $(ev.target),
        type = target.data('type');

      target.toggleClass('selected');
      $(".type"+type).toggle();
    }
  });
});