$(function ($, _, Backbone) {

  "use strict";

  window.log = function(){
    log.history = log.history || [];   // store logs to an array for reference
    log.history.push(arguments);
    if(this.console) {
      arguments.callee = arguments.callee.caller;
      var newarr = [].slice.call(arguments);
      (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
    }
  };

  window.socket = io.connect('http://localhost');

   // We are going to put our app in the WS namespace.
  var WS = {};

  // Measure Model
  // ----------

  WS.App = Backbone.Router.extend({
    routes: {
      '': 'index',
      '/': 'index'
    },
    index: function () {
      var Measures = new WS.Measures();
      
      var list = new WS.MeasureList(Measures);
            
      Measures.fetch();
    }
  });

  WS.Measure = Backbone.Model.extend({
    idAttribute: "_id",

    defaults: function () {
      return {
        value: 0,
        type: 0,
        date: new Date()
      };
    },

    urlRoot: 'measure',
    noIoBind: false,
    socket:window.socket,
    initialize: function () {
      _.bindAll(this, 'serverChange', 'serverDelete', 'modelCleanup');
      
      /*!
       * if we are creating a new model to push to the server we don't want
       * to iobind as we only bind new models from the server. This is because
       * the server assigns the id.
       */
      if (!this.noIoBind) {
        this.ioBind('update', this.serverChange, this);
        this.ioBind('delete', this.serverDelete, this);
      }
    },
    serverChange: function (data) {
      // Useful to prevent loops when dealing with client-side updates (ie: forms).
      data.fromServer = true;
      this.set(data);
    },
    serverDelete: function (data) {
      if (this.collection) {
        this.collection.remove(this);
      } else {
        this.trigger('remove', this);
      }
      this.modelCleanup();
    },
    modelCleanup: function () {
      this.ioUnbindAll();
      return this;
    }
  });

  // Measure Collection
  // ---------------

  WS.Measures = Backbone.Collection.extend({
    model: WS.Measure,
    url: 'measures',
    socket:window.socket,
    initialize: function () {
      _.bindAll(this, 'serverCreate', 'collectionCleanup');
      this.ioBind('create', this.serverCreate, this);
    },
    serverCreate: function (data) {
      // make sure no duplicates, just in case
      var exists = this.get(data.id);
      if (!exists) {
        this.add(data);
      } else {
        data.fromServer = true;
        exists.set(data);
      }
    },
    collectionCleanup: function (callback) {
      this.ioUnbindAll();
      this.each(function (model) {
        model.modelCleanup();
      });
      return this;
    }
  });

  // Measure Item View
  // --------------
  WS.MeasureList = Backbone.View.extend({
    id: 'MeasureList',
    initialize: function(measures) {
      this.measures = measures;
      measures.bind('add', this.addMeasure, this);
      this.render();
    },
    render: function () {
      var self = this;
      
      this.measures.each(function (measure) {
        self.addMeasure(measure);
      });
      
      return this;
    },
    addMeasure: function (measure) {
      var view = new MeasureView({model: measure});
      $("#measure-list").append(view.render().el);
    }
  });
  WS.MeasureListItem = Backbone.View.extend({
    tagName:  "tr",
    initialize: function (model) {
      this.model = model;
      this.render();
    },
    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });

// When the page is ready, create a new app and trigger the router.
$(document).ready(function () {
  window.app = new WS.App();
  Backbone.history.start();
});  

}(jQuery, _, Backbone));
