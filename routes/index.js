var Measure = require('mongoose').model('measures');

exports.index = function(req, res){
  res.render('index', { title: 'ScaleWS' });
};

exports.measures = function (req, res) {
      //console.log('list', req.body);
	var id;
	if (req.params.id){
		id = {'id' : req.params.id};
	}else{
		id = {};
	}
	console.log(id);
	Measure.find(id, function (err, result) {
		if (!err) {
		  res.send(result);
		} else {
		  res.send(errMsg(err));
		}
	});	
	
};