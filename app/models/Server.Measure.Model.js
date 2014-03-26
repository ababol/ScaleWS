module.exports = function (MeasureModel) {
  'use strict';
  MeasureModel.getSchemaLayout = function(){
    return {
      value: Number,
      type: Number,
      date: { type : Date, default : Date.now }
    };  
  };
  MeasureModel.getCollectionName = function(){
    return 'measure';
  };
  return MeasureModel;
};