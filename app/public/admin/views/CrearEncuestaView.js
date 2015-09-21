define(function(require) {
  var template = require('text!admin/templates/crear-encuesta.html'),
      PreguntaView = require('admin/views/PreguntaView'),
      Preguntas = require('admin/collections/Preguntas'),
      Encuesta = require('admin/models/Encuesta'),
      Pregunta = require('admin/models/Pregunta'),
      Respuestas = require('admin/collections/Respuestas'),
      Topicos = require('admin/collections/Topicos');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #agregar-pregunta-button': 'agregarPregunta',
      'click #crear-encuesta-button': 'crearEncuesta'
    },

    initialize: function() {
      this.preguntaViews = [];
      this.collection = new Preguntas();
      this.index = 0;

      this.topicos = new Topicos();

      this.listenTo(this.collection, 'add', this.refresh);
      this.listenTo(this.topicos, 'reset', this.setTopicos);

      this.topicos.fetch({
        reset: true
      });
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    setTopicos: function() {
      console.log(this.topicos);
      var topicos = [];
      var counter = 0;
      this.topicos.each(function(item) {
        topicos.push({id: counter, text: item.get('texto')});
        counter++;
      }, this);

      console.log(topicos)
        this.$('#topico-select').select2({
          theme: "bootstrap",
          data: topicos
        });

    },

    agregarPregunta: function() {
      var pregunta = new Pregunta(this.getAttributes());
      pregunta.index = this.getIndex();
      this.incIndex();
      this.collection.add(pregunta);
    },

    getAttributes: function() {
      return {
        texto: '',
        respuestas: new Respuestas()
      }
    },

    refresh: function() {
      this.updateModels(); 
      this.cleanUp();
      this.renderCollection();
    },

    cleanUp: function() {
      for (var i = 0; i < this.preguntaViews.length ; i++) {
        this.preguntaViews[i].eliminarPregunta();
      }
    },

    renderCollection: function() { 
      this.collection.sort();

      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);
    },

    renderItem: function(pregunta) {
      var preguntaView = new PreguntaView({
        model: pregunta,
      parent: this
      });

      this.preguntaViews.push(preguntaView);
      this.$('#preguntas-container').append(preguntaView.render().$el); 
    },

    crearEncuesta: function() {
      for (var i = 0; i < this.preguntaViews.length ; i++) {
        this.preguntaViews[i].updateModel();
      }

      var encuesta = new Encuesta();
      encuesta.set('topico', this.$('#topico-select').find('option:selected').text());
      encuesta.set('titulo', this.$('#titulo-input').val());
      encuesta.set('preguntas', this.collection);

      encuesta.save();
    },

    getIndex: function() {
      return this.index;
    },

    incIndex: function() {
      this.index++;
    },

    updateModels: function() {
      for (var i = 0; i < this.preguntaViews.length ; i++) {
        this.preguntaViews[i].updateModel();
      }
    }
  });
});
