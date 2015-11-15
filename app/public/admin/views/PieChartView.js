define(function(require) {
  var template = require('text!admin/templates/pie-chart.html');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    initialize: function(options){
      this.values = options.values;
    },

    render: function() {
      this.$el.html(this.template());
      this.pieData = this.values;

      return this;
    },

    mostrarGrafico: function() {
      this.ctx = this.$("#chart-area")[0].getContext("2d");
      this.chart = new Chart(this.ctx).Pie(this.pieData);
      this.$('#legend-container').html(this.chart.generateLegend());
    }
  });
});
