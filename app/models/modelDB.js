module.exports = function(mongoose, model) {
  var collectionName = model.getCollectionName();
  var schema = new mongoose.Schema(model.getSchemaLayout());

  var model = mongoose.model(collectionName, schema);

  return model;
};
