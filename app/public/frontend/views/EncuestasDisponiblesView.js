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

      if (this.nuevas == true) {
        this.titulo_vista = 'Encuestas nuevas';
        this.encuestas = new EncuestasNuevas();
      } else {
        this.titulo_vista = 'Encuestas disponibles';
        this.encuestas = new EncuestasDisponibles();
      }


      this.listenTo(this.encuestas, 'doRender', this.renderEncuestas);

      view = this;
      this.encuestas.fetch({
        reset: true,
        success: function(collection, response ,options) {
          this.$('#titulo-status').addClass('hidden');
          if (options.xhr.status == 204) {
            view.$('#status-container').html('No hay encuestas para mostrar');
          } else {
            view.encuestas.trigger('doRender');
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
       model: item,
       nuevas: this.nuevas
     });

      this.$('#encuestas-container').append(itemEncuestaView.render().el);
    }
  });
});
