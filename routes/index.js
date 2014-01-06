module.exports = function(measures) {
  return function (req, res) {
    measures.find({}, function(err, allMeasures){
      res.render('index', {
        title: 'ScaleWS',
        measures: allMeasures
      });
    });
  }
}