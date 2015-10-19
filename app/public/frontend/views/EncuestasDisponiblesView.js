define(function(require) {
var template = require('text!frontend/templates/encuestas.html'), 
    ErrorHelper = require('frontend/helpers/ErrorHelper'),
    EncuestasDisponibles = require('frontend/collections/EncuestasDisponibles'),
    EncuestasNuevas = require('frontend/collections/EncuestasNuevas'),
    ItemEncuestaView = require('frontend/views/ItemEncuestaView');

  return Backbone.View.extend({
    template : _.template(template),
    events : {
    },

    initialize : function(options) {
      this.nuevas = options.nuevas;
      this.id_usuario = options.id_usuario;

      if (this.nuevas == true) {
        this.titulo_vista = 'Encuestas nuevas';
        this.encuestas = new EncuestasNuevas(null, {
        id_usuario: this.id_usuario
      });
      } else {
        this.titulo_vista = 'Encuestas disponibles';
        this.encuestas = new EncuestasDisponibles(null, {
        id_usuario: this.id_usuario
      });
      }


      this.listenTo(this.encuestas, 'reset', this.renderEncuestas);

      this.encuestas.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          var status = $.parseJSON(xhr.status);
          var message = $.parseJSON(xhr.responseText).message;
          if (status == 404) {
            this.$('#status-container').html(message);
          } else {
            ErrorHelper.showError(xhr);
          }
        }
      });
    },

    render: function() {
      this.$el.html(this.template(this.titulo_vista));
      return this;
    },

    renderEncuestas: function() {
      this.encuestas.each(function(item) {
        this.renderItem(item);
      }, this);
    },

    renderItem: function(item) {
      var itemEncuestaView = new ItemEncuestaView({
       model: item
     });

      this.$('#encuestas-container').append(itemEncuestaView.render().el);
    }
  });
});
