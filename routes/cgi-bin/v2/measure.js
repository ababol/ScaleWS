module.exports = function(req, res, measure){
  var measureScale = JSON.parse(req.body.measuregrps);
  console.log(measureScale);
  for (var m in measureScale) {
    for (var n in measureScale[m].measures) {
      var tmp = measureScale[m].measures[n];
      var value = Math.round(tmp.data.mantissa*Math.pow(10, tmp.data.exponent)*100)/100;
      var type = tmp.type;
      var time = Date(measureScale[m].meastime);
      measure.create(value, type, time);
      // type 12 => temperature
      // type 35 => 655 => qualité air, taux CO2 en ppm
    }
  }
  res.end('{"status":0}');
};
