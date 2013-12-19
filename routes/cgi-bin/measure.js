module.exports = function(req, res, measure){
  var measureScale = JSON.parse(req.body.measuregrps).measuregrps;
  for (var m in measureScale) {
    for (var n in measureScale[m].measures) {
      var tmp = measureScale[m].measures[n];
      console.log(tmp.type+" value : "+ tmp.value);
      measure.create(tmp.value, tmp.type);
      // 0
      // 1 value : 84216 -- weight
      // 16 value : 522 -- BIA ou IBE => ce n'est pas la qualité de l'air -- Bioelectrical Impedance Analysis - Unit: body fat % plus le taux de graisse est élevé, plus la résistance à laquelle se heurte le signal électrique est grande.
      // 1
      // 11 value : 93 -- Heart
    }
  }
  res.end('{"status":0,"body":{"updatetime":'+Math.round(new Date().getTime()/1000)+'}}');
};
