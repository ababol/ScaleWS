module.exports = function(app, Backbone){

  return Backbone.ServerView.extend({    

    initialize :  function () {
      app.post('/cgi-bin/:page', this.router);
      app.post('/cgi-bin/:version/:page', this.router);
      if(!this.collection){
        console.log("ScaleView can't access to the collection");
      }
    },

    router : function() {
      return function (req, res) {
        var page = req.params.page,
        version = req.params.version || '';

        if (version !== '') version += '_';

        if (version === '' && page === 'index') {
          // avoid infinite loop
          fail();
        }else{
          var func = this[version + page]
          if(!func){
            console.log('Invalid request: ' + version + page );
            fail();
          }else{
            res.setHeader('Content-Type', 'text/plain');
            func(req,res,view);
          }
        }

        function fail() {
          res.send(404);
        }
      }
    },

    addMeasure : function(value, type, date){

      if (typeof(date) === 'undefined')
        date = new Date();

      this.collection.add({
        value: value,
        type: type,
        date: date
      });
    },

    

    maint : function(req, res){
      res.end('{"status":0}');
    },

    measure : function(req, res){
      // measure.create(Math.floor(100*Math.random()), Math.floor(10000*Math.random()));
      var measureScale = JSON.parse(req.body.measuregrps).measuregrps;
      for (var m in measureScale) {
        for (var n in measureScale[m].measures) {
          var tmp = measureScale[m].measures[n];
          console.log(tmp.type+" value : "+ tmp.value);
          this.addMeasure(tmp.value, tmp.type);
          // 0
          // 1 value : 84216 -- weight
          // 16 value : 522 -- BIA ou IBE => ce n'est pas la qualité de l'air -- Bioelectrical Impedance Analysis - Unit: body fat % plus le taux de graisse est élevé, plus la résistance à laquelle se heurte le signal électrique est grande.
          // 1
          // 11 value : 93 -- Heart
        }
      }
      res.end('{"status":0,"body":{"updatetime":'+Math.round(new Date().getTime()/1000)+'}}');
    },

    once : function(req, res){
      res.end('{"status":0,"body":{"once":"00d37f9b-0d05b260"}}');
    },

    session : function(req, res){
      if (req.body.action === 'new') {
        console.log("[DATA] Battery : "+req.body.batterylvl);
        this.addMeasure(req.body.batterylvl, 42);
        res.end('{"status":0,"body":{"sessionid":"4079-f5f75535-2f5ea8eb","sp":{"users":[{"id":2507298,"sn":"FED","wt":86.812,"ht":2,"agt":21.3,"sx":0,"fm":3,"cr":1385155190,"att":0}]},"ind":{"lg":"fr_FR","imt":1,"stp":1,"f":0,"g":98113},"syp":{"utc":'+Math.round(new Date().getTime()/1000)+'},"ctp":{"goff":3600,"dst":1396141200,"ngoff":7200}}}');
      }
      if (req.body.action === 'delete') {
        console.log("session end");
        res.end('{"status":0}');
      }
    },

    v2_measure : function(req, res){
      var measureScale = JSON.parse(req.body.measuregrps);
      console.log(measureScale);
      for (var m in measureScale) {
        for (var n in measureScale[m].measures) {
          var tmp = measureScale[m].measures[n];
          var value = Math.round(tmp.data.mantissa*Math.pow(10, tmp.data.exponent)*100)/100;
          var type = tmp.type;
          var time = Date(measureScale[m].meastime);
          this.addMeasure(value, type, time);
          // type 12 => temperature
          // type 35 => 655 => qualité air, taux CO2 en ppm
        }
      }
      res.end('{"status":0}');
    }

  });
};