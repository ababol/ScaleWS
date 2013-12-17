module.exports = function(req, res){
  var timestamp = Math.round(new Date().getTime()/1000);
  var measure = JSON.parse(req.body.measuregrps).measuregrps;
  for (var m in measure) {
    for (var n in measure[m].measures) {
      var tmp = measure[m].measures[n];
      console.log(tmp.type+" value : "+ tmp.value);
      // 0
      // 1 value : 84216 -- weight
      // 16 value : 522 -- BIA ou IBE => ce n'est pas la qualité de l'air -- Bioelectrical Impedance Analysis - Unit: body fat % plus le taux de graisse est élevé, plus la résistance à laquelle se heurte le signal électrique est grande.
      // 1
      // 11 value : 93 -- Heart
    }
  }
  res.end('{"status":0,"body":{"updatetime":'+timestamp+'}}');
};
