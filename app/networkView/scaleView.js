module.exports = function(Backbone){

  return Backbone.ServerView.extend({    

    initialize :  function () {
    },

    addMeasure : function(value, type, date){

      if (typeof(date) === 'undefined')
        date = new Date();
      
      this.collection.add({
        value: value,
        type: type,
        date: date
      });
    }
  });
};