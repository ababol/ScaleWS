var Measure = require('mongoose').model('measures');

exports.index = function(req, res){
  res.render('index', { title: 'ScaleWS' });
};

exports.measures = function (req, res) {
      //console.log('list', req.body);
      Measure.find({}, function (err, result) {
        if (!err) {
          res.send(result);
        } else {
          res.send(errMsg(err));
        }
      });
};