define(function(require) {
  var template = require('text!admin/templates/pregunta.html'),
      RespuestaView = require('admin/views/RespuestaView'),
      Respuestas = require('admin/collections/Respuestas');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #agregar-respuesta-button': 'agregarRespuesta',
      'click #eliminar-pregunta-button': 'eliminarPregunta',
      'click #up-button': 'moveUp',
      'click #down-button': 'moveDown'
    },

    initialize: function(options) {
      this.parent = options.parent;
      this.preguntas = options.parent.collection; 
      this.respuestaViews = [];
      this.respuestas = this.model.get('respuestas');
      this.listenTo(this.respuestas, 'add', this.renderCollection);
    },

    render: function() {
      this.model.set('nro_pregunta', this.model.index);
      this.$el.html(this.template(this.model.attributes));
      this.renderCollection();
      return this;
    },

    renderCollection: function() {
      this.respuestas.each(function(respuesta) {
        this.renderItem(respuesta);
      }, this);

    },

    renderItem: function(respuesta) {       
      var respuestaView = new RespuestaView({
        model: respuesta
      });
      this.$('#respuestas-container').append(respuestaView.render().$el); 
      this.respuestaViews.push(respuestaView); 
    },

    agregarRespuesta: function() {
      this.respuestas.add(this.getAttributes());
      this.$('#agregar-respuesta-input').val('');
    },

    getAttributes: function() {
      return {
        texto: this.$('#agregar-respuesta-input').val()
      }
    },

    eliminarPregunta: function() {
      for (var i = 0 ; i < this.respuestaViews.length ; i++) {
        this.respuestasView[i].close();
      }
      this.close();
    },

    updateModel: function() {      
      this.model.set('texto',this.$('#pregunta-input').val());

      for (var i = 0 ; i < this.respuestaViews.length ; i++) {
        this.respuestas.add(this.respuestaViews[i].updateModel(), {merge: true});
      }
      this.model.set('respuestas', this.respuestas);
    },

    moveUp: function() {
      var currentIndex = this.model.index;
      if (currentIndex > 0) {
        this.preguntas.at(currentIndex - 1).index = currentIndex;
        this.model.index = currentIndex - 1;

        this.parent.refresh();

      }
    },

    moveDown: function() {
      var currentIndex = this.model.index;
      if (currentIndex < this.preguntas.length - 1) {
        this.preguntas.at(currentIndex + 1).index = currentIndex;
        this.model.index = currentIndex + 1;

        this.parent.refresh();
      }
    }
  });
});
