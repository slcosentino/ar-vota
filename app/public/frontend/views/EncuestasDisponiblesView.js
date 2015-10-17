define(function(require) {
var template = require('text!frontend/templates/encuestas.html'), 
    ErrorHelper = require('frontend/helpers/ErrorHelper'),
    EncuestasDisponibles = require('frontend/collections/EncuestasDisponibles'),
    ItemEncuestaView = require('frontend/views/ItemEncuestaView');

  return Backbone.View.extend({
    template : _.template(template),
    events : {
    },

    initialize : function(options) {
      this.titulo_vista = 'Encuestas disponibles';
      this.id_usuario = options.id_usuario;

      this.encuestasDisponibles = new EncuestasDisponibles(null, {
        id_usuario: this.id_usuario
      });

      this.listenTo(this.encuestasDisponibles, 'reset', this.renderEncuestas);

      this.encuestasDisponibles.fetch({
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
      this.encuestasDisponibles.each(function(item) {
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
