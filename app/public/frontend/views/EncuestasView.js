define(function(require) {
var template = require('text!frontend/templates/encuestas.html'), 
    ErrorHelper = require('frontend/helpers/ErrorHelper'),
    Encuestas = require('frontend/collections/Encuestas'),
    ItemEncuestaView = require('frontend/views/ItemEncuestaView');

  return Backbone.View.extend({
    template : _.template(template),
    events : {
    },

    initialize : function(options) {
      this.id_usuario = options.id_usuario;

      this.encuestas = new Encuestas(null, {
        id_usuario: this.id_usuario
      });

      this.listenTo(this.encuestas, 'reset', this.renderEncuestas);

      this.encuestas.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
    },

    render: function() {
      this.$el.html(this.template());
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
