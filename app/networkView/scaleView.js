module.exports = function(app, Backbone){
  return Backbone.ServerView.extend({
    initialize:  function () {
      app.post('/cgi-bin/once', this.once);
      app.get('/cgi-bin/session', this.session);
      app.post('/cgi-bin/maint', this.maint);
      app.post('/cgi-bin/measure', this.measure);
      app.post('/cgi-bin/v2/measure', this.measurev2);
      app.post('/cgi-bin/v2/weather', this.weather);

      if(!this.collection){
        console.log("ScaleView can't access to the collection");
      }
    },

    saveMeasure: function(value, type, date){
      if (typeof(date) === 'undefined')
        date = new Date();

      this.collection.create({
        value: value,
        type: type,
        date: date
      });
    },

    maint: function(req, res){
      res.end('{"status":0}');
    },

    measure: function(req, res){
      // measure.create(Math.floor(100*Math.random()), Math.floor(10000*Math.random()));
      var measureScale = JSON.parse(req.body.measuregrps).measuregrps;
      console.log(measureScale);
      for (var m in measureScale) {
        for (var n in measureScale[m].measures) {
          var tmp = measureScale[m].measures[n];
          console.log(tmp.type+" value: "+ tmp.value);
          this.saveMeasure(tmp.value, tmp.type);
          // 0
          // 1 value: 84216 -- weight
          // 16 value: 522 -- BIA ou IBE => ce n'est pas la qualité de l'air -- Bioelectrical Impedance Analysis - Unit: body fat % plus le taux de graisse est élevé, plus la résistance à laquelle se heurte le signal électrique est grande.
          // 1
          // 11 value: 93 -- Heart
        }
      }
      res.end('{"status":0,"body":{"updatetime":'+Math.round(new Date().getTime()/1000)+'}}');
    },

    once: function(req, res){
      res.end('{"status":0,"body":{"once":"00d37f9b-0d05b260"}}');
    },

    session: function(req, res){
      console.log(this.session())
      res.end('{"status":0}');
      if (req.body.action === 'new') {
        console.log("[DATA] Battery: "+req.body.batterylvl);
        this.saveMeasure(req.body.batterylvl, 42);
        res.end('{"status":0,"body":{"sessionid":"4079-f5f75535-2f5ea8eb","sp":{"users":[{"id":2507298,"sn":"FED","wt":86.812,"ht":2,"agt":21.3,"sx":0,"fm":3,"cr":1385155190,"att":0}]},"ind":{"lg":"fr_FR","imt":1,"stp":1,"f":0,"g":98113},"syp":{"utc":'+Math.round(new Date().getTime()/1000)+'},"ctp":{"goff":3600,"dst":1396141200,"ngoff":7200}}}');
      }
      if (req.body.action === 'delete') {
        console.log("session end");
        res.end('{"status":0}');
      }
    },

    measurev2: function(req, res){
      var measureScale = JSON.parse(req.body.measuregrps);
      console.log(measureScale);
      for (var m in measureScale) {
        for (var n in measureScale[m].measures) {
          var tmp = measureScale[m].measures[n];
          var value = Math.round(tmp.data.mantissa*Math.pow(10, tmp.data.exponent)*100)/100;
          var type = tmp.type;
          var time = Date(measureScale[m].meastime);
          this.saveMeasure(value, type, time);
          // type 12 => temperature
          // type 35 => 655 => qualité air, taux CO2 en ppm
        }
      }
      res.end('{"status":0}');
    },

    weather: function(req, res) {
      res.end('{{"status":0,"body":{"series":[]}}');
    }

  });
};