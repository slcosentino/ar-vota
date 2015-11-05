define(function(require) {
  var template = require('text!frontend/templates/completar-encuesta.html'),
      Encuesta = require('frontend/models/Encuesta'),
      PreguntaEncuesta = require('frontend/models/PreguntaEncuesta'),
      PreguntaEncuestaView = require('frontend/views/PreguntaEncuestaView');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #completar-button': 'completarEncuesta',
    },

         
    initialize : function(options) {
      this.id_encuesta = options.id_encuesta;
      this.preguntaEncuestaViews = [];

      this.model = new Encuesta();
      this.model.url = this.model.url + '/' + this.id_encuesta;

      this.listenTo(this.model, 'change', this.renderModel);

      this.model.fetch({
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
    },
    
    render: function() {
      return this;
    },

    renderModel: function() {
      this.$el.html(this.template(this.model.attributes));

      this.preguntas = this.model.attributes.preguntas;

      var view = this;
      $.each(this.preguntas, function(index, value) {
        var model = new PreguntaEncuesta();
        model.set('nro_pregunta', value.nro_pregunta);
        model.set('texto', value.texto);
        model.set('respuestas', value.respuestas);

        var preguntaEncuestaView = new PreguntaEncuestaView({
          model: model,
          parent: this
        });

        console.log(model);
        view.$('#preguntas-container').append(preguntaEncuestaView.render().el);

        view.preguntaEncuestaViews.push(preguntaEncuestaView);
      });
    },

    completarEncuesta: function() {
/*      var preguntas = [];
      for (var i = 1 ; i < this.preguntas.length + 1 ; i++) {
        var respuesta = this.$('input[name=pregunta-' + i + ']:checked').val();
        if (respuesta == undefined) {
          this.mostrarError();
          return;
        }
        preguntas.push(respuesta);
      }
*/
      var selectionArray = [];

      var view = this;
      $.each(this.preguntaEncuestaViews, function(index, value) {
        var selection = value.getSelection();
        if (selection == undefined) {
          view.$('#status')
            .html('Debe completar las preguntas en rojo')
            .addClass('text-danger');
        return;
        }
        var selectionObject = {};
        selectionObject.nro_pregunta = index + 1;
        selectionObject.nro_respuesta = selection;
        selectionArray.push(selectionObject);
      });      

      this.guardar(selectionArray);
    },

    guardar: function(selectionArray) {
      
      view = this;
      $.ajax({
        method: 'POST',
        url: '/api/usuarios/encuestas',
        contentType: 'application/json',
        data: JSON.stringify({
          'id_encuesta': view.model.get('id'),
          'resultado': selectionArray
        })
      })
      .done(
        function(data, textStatus, jqXHR) {
          console.log('listo');
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        ErrorHelper.showError(jqXHR);
      });
    }

  });
});
