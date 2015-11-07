define(function(require) {
var template = require('text!frontend/templates/propuestas-nuevas.html'), 
    ErrorHelper = require('frontend/helpers/ErrorHelper'),
    PropuestasNuevas = require('frontend/collections/PropuestasNuevas'),
    ItemPropuestaNuevaView = require('frontend/views/ItemPropuestaNuevaView');

  return Backbone.View.extend({
    template : _.template(template),
    events : {
    },

    initialize : function() {
      this.titulo_vista = 'Propuestas nuevas';
      this.propuestasNuevas = new PropuestasNuevas();


      this.listenTo(this.propuestasNuevas, 'doRender', this.renderPropuestasNuevas);

      view = this;
      this.propuestasNuevas.fetch({
        reset: true,
        success: function(collection, response ,options) {
          if (options.xhr.status == 204) {
            view.$('#status-container').html('No hay propuestas nuevas para mostrar');
          } else {
            view.propuestasNuevas.trigger('doRender');
          }
        }
      });
    },

    render: function() {
      this.$el.html(this.template(this.titulo_vista));
      return this;
    },

    renderPropuestasNuevas: function() {
      this.propuestasNuevas.each(function(item) {
        this.renderItem(item);
      }, this);
    },

    renderItem: function(item) {
      var itemPropuestaNuevaView = new ItemPropuestaNuevaView({
       model: item
     });

      this.$('#propuestas-nuevas-container').append(itemPropuestaNuevaView.render().el);
    }
  });
});
