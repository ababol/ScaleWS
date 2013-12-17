module.exports = function(req, res){
  if (req.body.action === 'new') {
    var timestamp = Math.round(new Date().getTime()/1000);
    console.log("[DATA] Battery : "+req.body.batterylvl);
    res.end('{"status":0,"body":{"sessionid":"4079-f5f75535-2f5ea8eb","sp":{"users":[{"id":2507298,"sn":"FED","wt":86.812,"ht":2,"agt":21.3,"sx":0,"fm":3,"cr":1385155190,"att":0}]},"ind":{"lg":"fr_FR","imt":1,"stp":1,"f":0,"g":98113},"syp":{"utc":'+timestamp+'},"ctp":{"goff":3600,"dst":1396141200,"ngoff":7200}}}');
  }
  if (req.body.action === 'delete') {
    console.log("session end");
    res.end('{"status":0}');
  }
};