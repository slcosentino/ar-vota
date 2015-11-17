define(function(require) {
  var template = require('text!admin/templates/estadisticas-pregunta.html'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    initialize: function(options) {
      this.pregunta = options.pregunta;
      this.valores = options.valores;
      this.respuestasSeleccionadas = options.respuestasSeleccionadas;
      this.id_encuesta = options.id_encuesta;
    },

    render: function() {
      this.$el.html(this.template(this.pregunta));

      
      var valores = this.valores;
      var respuestasNuncaSeleccionadas = this.getRespuestasNuncaSeleccionadas();

      var pieChartView = new PieChartView({
       values: valores,
       respuestasNuncaSeleccionadas: respuestasNuncaSeleccionadas,
       id_encuesta: this.id_encuesta,
       pregunta: this.pregunta
     });
      this.childView = pieChartView;

      this.$('#chart-container').append(pieChartView.render().el);

      return this;
    },

    mostrarGrafico: function() {
      this.childView.mostrarGrafico();
    },

    getRespuestasNuncaSeleccionadas: function() {
      var respuestasNuncaSeleccionadasArray = [];
      for (var i = 0 ; i < this.respuestasSeleccionadas.length ; i++) {
        if (this.respuestasSeleccionadas[i] == false) {
          respuestasNuncaSeleccionadasArray.push(this.pregunta.respuestas[i]);
        }
      }
      return respuestasNuncaSeleccionadasArray;
    }
  });
});
