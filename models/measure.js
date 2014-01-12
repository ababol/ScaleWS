module.exports = function(mongoose) {
  var collection = 'measure';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var schema = new Schema({
    value: Number,
    type: Number,
    date: { type : Date, default : Date.now }
  });

  this.model = mongoose.model(collection, schema);

  // Public methods
  this.model.create = function(value, type, date) {
    if (typeof(date) === 'undefined')
      date = new Date();

    new this({
      value: value,
      type: type,
      date: date
    }).save( function( err, comment, count ){
        console.log("save");
    });
  };

  return this.model;
};
