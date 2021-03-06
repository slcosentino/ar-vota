define(function(require) {
  var template = require('text!admin/templates/crear-encuesta.html'),
      PreguntaView = require('admin/views/PreguntaView'),
      Preguntas = require('admin/collections/Preguntas'),
      Encuesta = require('admin/models/Encuesta'),
      Pregunta = require('admin/models/Pregunta'),
      Respuestas = require('admin/collections/Respuestas'),
      Topicos = require('admin/collections/Topicos'),
      Respuesta = require('admin/models/Respuesta');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #agregar-pregunta-button': 'agregarPregunta',
      'click #guardar-encuesta-button': 'guardarEncuesta'
    },

    initialize: function(options) {
        this.preguntaViews = [];
        this.index = 0;
        this.getTopicos();
        this.collection = new Preguntas();
        this.topicosArray = [];
        this.editar = options.editar;

      if (this.editar == false) {
        this.listenTo(this.collection, 'add', this.refresh);
      } else {
        this.encuesta = new Encuesta();
        this.encuesta.url = this.encuesta.url + '/' + options.id_encuesta;
        var view = this;
        
        this.encuesta.fetch({
          success: function() {
            view.parseEncuesta();
          },
          error: function(collection, xhr, options) {
            ErrorHelper.showError(xhr);
          }
        });
      }
    },

    parseEncuesta: function() {
      if (this.editar) {
        var topicoTexto = this.encuesta.get('topico');
        var topico = _.select(this.topicosArray, function(item) {
          return item.text === topicoTexto;
        });

        this.$('#topico-select').select2('val',topico[0].id);
        this.$('#titulo-input').val(this.encuesta.get('titulo'));

        var preguntas = this.encuesta.get('preguntas');

        for (var i = 0; i < preguntas.length ; i++) {
          // Parse preguntas
          var pregunta = new Pregunta();
          pregunta.index = this.getIndex();
          pregunta.set('texto', preguntas[i].texto);

          // Parse respuestas
          var respuestasArray = preguntas[i].respuestas;
          var respuestas = new Respuestas();

          for (var j = 0; j < respuestasArray.length ; j++) {
            var respuesta = new Respuesta();
            respuesta.set('texto', respuestasArray[j].texto);
            respuesta.set('seleccionada', respuestasArray[j].seleccionada);
            respuestas.add(respuesta);
          }
          pregunta.set('respuestas', respuestas);

          // Add to collection
          this.incIndex();
          this.collection.add(pregunta);
        }

        this.renderCollection();
        this.listenTo(this.collection, 'add', this.refresh);
      }
    },

    getTopicos: function() {
      this.topicos = new Topicos();
      this.listenTo(this.topicos, 'reset', this.setTopicos);

      this.topicos.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
    },

    render: function() {
      this.$el.html(this.template());

      if (this.editar) {
        this.$('#titulo-vista').text('Edición de encuesta');
      }
      return this;
    },

    setTopicos: function() {
      var counter = 0;
      this.topicos.each(function(item) {
        this.topicosArray.push({id: counter, text: item.get('texto')});
        counter++;
      }, this);

      this.$('#topico-select').select2({
        theme: "bootstrap",
        data: this.topicosArray
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
        this.preguntaViews[i].cleanUp();
      }
    },

    renderCollection: function() {
      var nro_pregunta = 0;
      this.collection.sort();

      this.collection.each(function(item) {
        nro_pregunta++;
        item.set('nro_pregunta', nro_pregunta);
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

    guardarEncuesta: function() {
      this.$('#guardar-status').removeClass('hidden');
      var view = this;
      setTimeout(function(){
        if (this.editar) {
          view.actualizarEncuesta();
        } else {
          view.guardarEncuestaNueva();
        }
      }, 1000);
    },

    actualizarEncuesta: function () {
      var view = this;

      for (var i = 0; i < this.preguntaViews.length ; i++) {
        this.preguntaViews[i].updateModel();
      }

      this.encuesta.set('topico', this.$('#topico-select').find('option:selected').text());
      this.encuesta.set('titulo', this.$('#titulo-input').val());
      this.encuesta.set('preguntas', this.collection);

      var xhr = this.encuesta.save(null, {
        success: function() {
          view.$('#guardar-status').addClass('hidden');
          url = '#encuestas/' + xhr.responseJSON.id + '/preview';
          Backbone.history.navigate(url, true);
        },
        error: function() {
          view.$('#guardar-status').addClass('hidden');
          ErrorHelper.showError(xhr);
        }
      });
    },

    guardarEncuestaNueva: function() {
      var view = this;

      for (var i = 0; i < this.preguntaViews.length ; i++) {
        this.preguntaViews[i].updateModel();
      }

      var encuesta = new Encuesta();
      encuesta.set('topico', this.$('#topico-select').find('option:selected').text());
      encuesta.set('titulo', this.$('#titulo-input').val());
      encuesta.set('preguntas', this.collection);

      var xhr = encuesta.save(null, {
        success: function() {
          view.$('#guardar-status').addClass('hidden');
          url = '#encuestas/' + xhr.responseJSON.id + '/preview';
          Backbone.history.navigate(url, true);
        },
        error: function() {
          view.$('#guardar-status').addClass('hidden');
          ErrorHelper.showError(xhr);
        }
      });
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
    },

    eliminarPregunta: function(pregunta) {
      this.collection.remove(pregunta);
    }
  });
});
