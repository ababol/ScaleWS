module.exports = function(mongoose) {
  var collection = 'measures';
  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var schema = new Schema({
    value: { type : Number, min : 0 },
    type: { type : Number, min : 0 },
    date: { type : Date, default : Date.now }
  });

  this.model = mongoose.model(collection, schema);

  return this;
};