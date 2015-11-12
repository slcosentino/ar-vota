define(function(require) {
  var template = require('text!admin/templates/pie-chart.html');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #boton': 'mostrarGrafico'
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
      this.ctx = $("#chart-area",this.el)[0].getContext("2d");
      this.chart = new Chart(this.ctx).Pie(this.pieData);
    }
  });
});
