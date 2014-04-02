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

  MeasureModel.getCategoriesMasks = function(){
    return {
      weight : {type : 1}, //74892
      heart : {type : 11},
      temperature: {type : 12},
      fat : {type : 16},
      airquality : {type : 35}
    };
  };
  return MeasureModel;
};