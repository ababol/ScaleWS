module.exports = function(model){
  

  //------------------------------
  // Create
  //
  this.create = function(obj, callback) {
    var m = new model(obj);
    m.save(callback);
  };

  //------------------------------
  // Read
  //
  this.read = function(query, callback) {
    model.find(query, callback);
  };

  //------------------------------
  // Update
  //
  this.update = function(obj, callback) {
    model.findById(obj._id, function (err, result) {
      var key;
      for (key in obj) {
        result[key] = obj[key];
      }
      result.save(callback);
    });
  };

  //------------------------------
  // Delete
  //
  this.delete = function(obj, callback) {
    model.findById(obj.id, function (err, result) {
        result.remove();
        result.save(callback);
    });
  };

};