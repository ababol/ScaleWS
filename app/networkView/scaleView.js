module.exports = function(app, _, Backbone){
  return Backbone.ServerView.extend({
    initialize:  function () {
      app.post('/cgi-bin/once', this.once.bind(this));
      app.post('/cgi-bin/session', this.session.bind(this));
      app.post('/cgi-bin/maint', this.maint.bind(this));
      app.post('/cgi-bin/measure', this.measure.bind(this));
      app.post('/cgi-bin/v2/measure', this.measureAir.bind(this));
      app.post('/cgi-bin/v2/weather', this.weather.bind(this));

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
      var measureScale = JSON.parse(req.body.measuregrps).measuregrps;
      _.each(measureScale, function(measures) {
        _.each(measures.measures, function(measure) {
          this.saveMeasure(measure.value, measure.type, measures.meastime*1000);
        }, this);
      }, this);
      // 0
      // 1 value: 84216 -- weight
      // 16 value: 522 -- BIA ou IBE => ce n'est pas la qualité de l'air -- Bioelectrical Impedance Analysis - Unit: body fat % plus le taux de graisse est élevé, plus la résistance à laquelle se heurte le signal électrique est grande.
      // 1
      // 11 value: 93 -- Heart
      res.end('{"status":0,"body":{"updatetime":'+Math.round(new Date().getTime()/1000)+'}}');
    },

    once: function(req, res){
      res.end('{"status":0,"body":{"once":"00d37f9b-0d05b260"}}');
    },

    session: function(req, res){
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

    measureAir: function(req, res){
      var measureScale = JSON.parse(req.body.measuregrps);
      _.each(measureScale, function(measures) {
        _.each(measures.measures, function(measure) {
          var value = Math.round(measure.data.mantissa*Math.pow(10, measure.data.exponent)*100)/100;
          this.saveMeasure(value, measure.type, measures.meastime*1000);
        }, this);
      }, this);
      res.end('{"status":0}');
    },

    weather: function(req, res) {
      res.end('{{"status":0,"body":{"series":[]}}');
    }

  });
};