define(function(require) {
  var template = require('text!admin/templates/detalle-respuesta.html'),
      DetalleRespuesta = require('admin/collections/DetalleRespuesta');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    initialize: function(options){
      this.id_encuesta = options.id_encuesta;
      this.nro_pregunta = options.nro_pregunta;
      this.tipo = options.tipo;
      this.pregunta = options.pregunta;
      this.respuesta = options.respuesta;

      this.labels = [];
      this.dataset = {};
      this.data = [];

      this.detalles = new DetalleRespuesta();
    },

    render: function() {
      console.log(this.respuesta);
      this.$el.html(this.template({ respuesta: this.respuesta}));
      var respuestas = this.pregunta.respuestas;

      this.listenTo(this.detalles, 'reset', this.parseDetalles);

      this.detalles.url = this.detalles.url + '?id_encuesta='  + this.id_encuesta +
        '&nro_pregunta=' + this.nro_pregunta +
        '&nro_respuesta=' + respuestas[i].nro_respuesta;

      this.detalles.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });

      return this;
    },

    parseDetalles: function() {

      this.detalles.each(function(detalle) {
        this.parseDetalle(detalle);
      }, this);

      this.dataset.label = 'Detalle de respuestas';
      this.dataset.fillColor = 'rgba(151,187,205,0.5)';
      this.dataset.strokeColor = 'rgba(151,187,205,0.8)';
      this.dataset.highlightFill = 'rgba(151,187,205,0.75)';
      this.dataset.highlightStroke = 'rgba(151,187,205,1)';
      this.dataset.data = this.data;

      var view = this;
      setTimeout(function(){
        view.mostrarGrafico();
      }, 1000);
    },

    parseDetalle: function(detalle) {
      this.labels.push(detalle.get('zona'));
      this.data.push(detalle.get('cantidad'));
    },

    mostrarGrafico: function() {
      this.ctx = this.$("#chart-area")[0].getContext("2d");
      this.chart = new Chart(this.ctx).Bar(this.getBarData(), this.getBarOptions());
      this.$('#legend-container').html(this.chart.generateLegend());
    },

    getBarOptions: function() {
      return options = {
        tooltipTemplate: '<%= value %> respuestas'
      };
    },

    getBarData: function() {
      return data = {
        labels: this.labels,
        datasets: [this.dataset]
      };
    }

  });
});
