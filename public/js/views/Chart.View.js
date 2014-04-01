define([
  'jquery',
  'backbone',
  'd3',
  'js/config.js'
], function ($, Backbone, d3, Config) {
  'use strict';

  return Backbone.View.extend({

    constructor : function (chartConf) {
      var self = this;
      this.type = chartConf.type;
      this.el = chartConf.el;
      this.svg = d3.select(this.el).append("svg:svg")
        .attr("width", Config.d3.width)
        .attr("height", Config.d3.height);

      this.format = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ");
      this.valueFn = function(d) { return d.get('value') };
      this.dateFn = function(d) { return self.format.parse(d.get('date')) };

      this.x = d3.time.scale()
        .range([6, Config.d3.width-Config.d3.m.right]);

      this.y = d3.scale.linear()
        .range([Config.d3.height-Config.d3.m.bottom, 6]);
    },

    renderDomains: function(data) {
      this.x.domain(d3.extent(data, this.dateFn));
      this.y.domain(d3.extent(data, this.valueFn));
    },

    renderAxes: function() {
      this.renderXAxis();
      this.renderYAxis();
    },

    renderXAxis: function() {
      var self = this;

      var labelsX = this.svg.selectAll("text")
        .data(this.x.ticks(4), function(id) { return id; });

      labelsX.enter().append("svg:text")
        .attr("x", function(d) { return self.x(d); })
        .attr("y", Config.d3.height-Config.d3.m.bottom)
        .attr("text-anchor", "middle")
        .attr("dy", ".71em")
        .text(d3.time.format("%d/%m"));

      labelsX.exit().remove();
    },

    renderYAxis: function() {
      var self = this;
      var rulesY = this.svg.selectAll("g.rule").data(this.y.ticks(5), function(id) { return id; });

      rulesY.transition()
        .attr("transform", function(d) { return "translate(0," + self.y(d) + ")"; });

      var g = rulesY.enter().append("svg:g")
        .attr("class", "rule")
        .attr("transform", function(d) { return "translate(0," + self.y(d) + ")"; });

      rulesY.append("svg:text")
        .attr("x", Config.d3.width - Config.d3.m.right + 6)
        .attr("dy", ".35em")
        .text(d3.format(",d"));

      g.append("svg:line")
        .attr("x2", Config.d3.width- Config.d3.m.right)
        .style("stroke", "#000")
        .style("stroke-opacity", .7);

      rulesY.exit().remove();
    },

    renderData: function(data) {
      console.log("renderData");
      var self = this;
      var gAll = this.svg.selectAll("g.circle").data(data, function(d) { return d.id; });
      // _.data.sort(date) // faire itérateur avant après

      var g = gAll.enter().append("svg:g")
        .attr("class", "circle")
        .on("click", function(d) {
          d3.select("#chart .value").text("Date: " + d.get('date') + " value: " + d.get('value'))
        });

      var circle = g.append("svg:circle")
        .attr("r", 4)
        .attr("cx", function(d) { return self.x(self.dateFn(d)) })
        .attr("cy", function(d) { return self.y(self.valueFn(d)) });

      var line = g.append("svg:line")
        .style("stroke", "black")
        .attr("x1", function(d,i) { return i > 0 ? self.x(self.dateFn(data[i-1])) : self.x(self.dateFn(d)); })
        .attr("y1", function(d,i) { return i > 0 ? self.y(self.valueFn(data[i-1])) : self.y(self.valueFn(d)); })
        .attr("x2", function(d) { return self.x(self.dateFn(d)) })
        .attr("y2", function(d) { return self.y(self.valueFn(d)) });

      gAll.exit().remove();

      var circles = this.svg.selectAll("circle");
      circles.transition()
        .attr("cx", function(d) { return self.x(self.dateFn(d)) })
        .attr("cy", function(d) { return self.y(self.valueFn(d)) });

      var lines = this.svg.selectAll("g.circle line");
      lines.transition()
        .attr("x1", function(d,i) { return i > 0 ? self.x(self.dateFn(data[i-1])) : self.x(self.dateFn(d)); })
        .attr("y1", function(d,i) { return i > 0 ? self.y(self.valueFn(data[i-1])) : self.y(self.valueFn(d)); })
        .attr("x2", function(d) { return self.x(self.dateFn(d)) })
        .attr("y2", function(d) { return self.y(self.valueFn(d)) });
    },

    refresh: function (data) {
      data = data.where({type: this.type});
      this.renderDomains(data);
      this.renderAxes();
      this.renderData(data);
    }
  });
});