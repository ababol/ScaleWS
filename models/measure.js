module.exports = function(mongoose) {
  var collection = 'measures';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var schema = new Schema({
    value: Number,
    type: Number,
    date: { type : Date, default : Date.now }
  });

  this.model = mongoose.model(collection, schema);

  // Public methods
  this.create = function(value, type, date) {
    if (typeof(date) === 'undefined')
      date = new Date();

    new this.model({
      value: value,
      type: type,
      date: date
    }).save( function( err, comment, count ){
        console.log("save");
      });
  };

  return this;
};
