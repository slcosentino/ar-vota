define(function(require) {
  var template = require('text!admin/templates/pie-chart.html');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    initialize: function(options){
      this.values = options.values;
      this.respuestasNuncaSeleccionadas = options.respuestasNuncaSeleccionadas;
    },

    render: function() {
      this.$el.html(this.template());
      this.pieData = this.values;

      return this;
    },

    mostrarGrafico: function() {
      this.ctx = this.$("#chart-area")[0].getContext("2d");
      this.chart = new Chart(this.ctx).Pie(this.pieData, this.getPieOptions());
      this.$('#legend-container').html(this.chart.generateLegend());

      this.$('#observaciones-container').html('<b>Respuestas sin selecciones <b><br>');
      if (this.respuestasNuncaSeleccionadas.length < 1) {
        console.log('vacio');
        this.$('#observaciones-container').append('(No hay)');
      } else {
        for (var i = 0 ; i < this.respuestasNuncaSeleccionadas.length ; i++) {
          this.$('#observaciones-container').append(this.respuestasNuncaSeleccionadas[i].texto + '<br>' );
      }
      }
    },

    getPieOptions: function() {
      return options = {
        tooltipTemplate: '<%= value %> %',
        legendTemplate: 
          '<ul class=\"<%=name.toLowerCase()%>-legend\">' +
            '<% for (var i=0; i<segments.length; i++){%>' +
              '<li>' +
                '<span style=\"background-color:<%=segments[i].fillColor%>\"></span>' +
                  '<%if(segments[i].label){%>' +
                    '<%=segments[i].label%>: <b><%=segments[i].value%> %</b>' +
                  '<%}%>' +
              '</li>' +
            '<%}%>' +
          '</ul>'
      };
    }
  });
});
