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
      this.$el.html(this.template({
        respuesta: this.respuesta,
        tipo: this.tipo
      }));
      var respuestas = this.pregunta.respuestas;

      if (this.tipo === 'zona'){
        this.listenTo(this.detalles, 'reset', this.parseDetallesZona);
      } else if (this.tipo === "edad"){
        this.listenTo(this.detalles, 'reset', this.parseDetallesEdad);
      }

      this.detalles.url = this.detalles.url + '/' + this.tipo + '?id_encuesta='  + this.id_encuesta +
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

    parseDetallesZona: function() {

      this.detalles.each(function(detalle) {
        this.parseDetalleZona(detalle);
      }, this);

      this.dataset.label = 'Detalle de respuestas';
      this.dataset.fillColor = 'rgba(151,187,205,0.5)';
      this.dataset.strokeColor = 'rgba(151,187,205,0.8)';
      this.dataset.highlightFill = 'rgba(151,187,205,0.75)';
      this.dataset.highlightStroke = 'rgba(151,187,205,1)';
      this.dataset.data = this.data;

      var view = this;
      setTimeout(function(){
        view.mostrarGraficoZona();
      }, 1000);
    },

    parseDetalleZona: function(detalle) {
      var totalRespuesta = 0;
      this.detalles.each(function(detalle) {
        totalRespuesta = totalRespuesta + detalle.get('cantidad');
      }, this);

      this.labels.push(detalle.get('zona'));
      var cantidad = detalle.get('cantidad');
      var porcentaje = Math.round(cantidad * 100 / totalRespuesta);

      this.data.push(porcentaje);
    },

    mostrarGraficoZona: function() {
      this.ctx = this.$("#chart-area")[0].getContext("2d");
      this.chart = new Chart(this.ctx).Bar(this.getBarData(), this.getBarOptions());
    },

    getBarOptions: function() {
      return options = {
        tooltipTemplate: '<%= value %> %'
      };
    },

    getBarData: function() {
      return data = {
        labels: this.labels,
        datasets: [this.dataset]
      };
    },

    parseDetallesEdad: function() {

      this.detalles.each(function(detalle) {
        this.parseDetalleEdad(detalle);
      }, this);

      this.dataset.label = 'Detalle de respuestas';
      this.dataset.fillColor = 'rgba(220,220,220,0.2)';
      this.dataset.strokeColor = 'rgba(220,220,220,1)';
      this.dataset.pointColor = 'rgba(220,220,220,1)';
      this.dataset.pointStrokeColor = '#fff';
      this.dataset.pointHighlightFill = '#fff';
      this.dataset.pointHighlightStroke = 'rgba(220,220,220,1)';
      this.dataset.data = this.data;

      var view = this;
      setTimeout(function(){
        view.mostrarGraficoEdad();
      }, 1000);
    },

    parseDetalleEdad: function(detalle) {
      var totalRespuesta = 0;
      this.detalles.each(function(detalle) {
        totalRespuesta = totalRespuesta + detalle.get('cantidad');
      }, this);

      this.labels.push(detalle.get('descripcion'));
      var cantidad = detalle.get('cantidad');
      var porcentaje = Math.round(cantidad * 100 / totalRespuesta);

      this.data.push(porcentaje);
    },

    mostrarGraficoEdad: function() {
      this.ctx = this.$("#chart-area")[0].getContext("2d");
      this.chart = new Chart(this.ctx).Line(this.getBarData(), this.getBarOptions());
    },

  });
});
