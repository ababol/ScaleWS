define([
  'jquery',
  'backbone',
  'd3',
  'js/config.js'
], function ($, Backbone, d3, Config) {
  'use strict';

  return Backbone.View.extend({
    initialize: function() {
      var self = this;
      this.svg = d3.select("#chart").append("svg:svg")
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
      var self = this;
      var circles = this.svg.selectAll("circle").data(data);

      circles.transition()
        .attr("cx", function(d) { return self.x(self.dateFn(d)) })
        .attr("cy", function(d) { return self.y(self.valueFn(d)) });

      circles.enter()
        .append("svg:circle")
        .attr("r", 4)
        .attr("cx", function(d) { return self.x(self.dateFn(d)) })
        .attr("cy", function(d) { return self.y(self.valueFn(d)) })
        .attr("cid", function(d) { return d.cid })
        .attr("date", function(d) { return d.get('date'); })
        .on("click", function(d) {
          d3.select("#chart .value").text("Date: " + d.get('date') + " value: " + d.get('value'))
        });
    },

    refresh: function (data) {
      this.renderDomains(data);
      this.renderAxes();
      this.renderData(data);
    }
  });
});