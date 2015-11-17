define(function(require) {
  var template = require('text!admin/templates/detalle-pregunta.html'),
      DetalleRespuestaView = require('admin/views/DetalleRespuestaView');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    initialize: function(options){
      this.id_encuesta = options.id_encuesta;
      this.nro_pregunta = options.nro_pregunta;
      this.tipo = options.tipo;
      this.pregunta = options.pregunta;

      this.childViews = [];
    },

    render: function() {
      this.$el.html(this.template());
      var respuestas = this.pregunta.respuestas;

      this.listenTo(this.detalles, 'reset', this.parseDetalles);

      for (i = 0 ; i < respuestas.length ; i++) {
        var detalleRespuestaView = new DetalleRespuestaView({
          id_encuesta: this.id_encuesta,
          nro_pregunta: this.nro_pregunta,
          tipo: this.tipo,
          pregunta: this.pregunta,
          respuesta: respuestas[i].texto
        });
        this.$('#detalle-respuesta-container').append(detalleRespuestaView.render().$el); 
      }

      return this;
    }

  });
});
