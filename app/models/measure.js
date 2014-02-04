module.exports = function(mongoose, sockets) {
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

    newMeasure = new this({
      value: value,
      type: type,
      date: date
    });
    newMeasure.save( function( err, comment, count ){
        console.log("save");
    });
    sockets.emit("newMeasure", JSON.stringify(newMeasure));
  };

  return this.model;
};
