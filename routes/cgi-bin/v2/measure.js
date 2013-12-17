module.exports = function(req, res){
  console.log(req.body);
  // measuregrps: '[{"meastime":1387053012,"measures":[{"data":{"mantissa":202,"exponent":-1,"unit":11},"type":12},{"data":{"mantissa":655,"exponent":0,"unit":12},"type":35}]}]' }
  // type 12 => temperature
  // type 35 => 655 => qualité air, taux CO2 en ppm
  res.end('{"status":0}');
};
