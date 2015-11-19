define(function(require) {
var template = require('text!frontend/templates/publicaciones.html'), 
    ErrorHelper = require('frontend/helpers/ErrorHelper'),
    Publicaciones = require('frontend/collections/Publicaciones'),
    PublicacionView = require('frontend/views/PublicacionView'),
    Propuestas = require('frontend/collections/Propuestas'),
    GridView = require('frontend/views/GridView'),
    Quejas = require('frontend/collections/Quejas');

  return Backbone.View.extend({
    template : _.template(template),
    events : {
      'click #cambiar': 'cambiarOrden'
    },

    initialize: function(options) {
      this.propuestas = options.propuestas;
      this.populares = options.populares;
    },

    render : function() {
      this.$el.html(this.template({
        propuestas: this.propuestas,
        populares: this.populares
      }));


      var gridView = new GridView({
        todas: false,
        propuestas: this.propuestas,
        populares: this.populares
      });
      this.$('#grid-container').append(gridView.render().el);
	 

      return this;
    },
	
    cambiarOrden: function() {
      var url;
      if (this.propuestas) {
        url = '#propuestas/';
      } else {
        url = '#quejas/';
      }

      if(this.populares) {
        url = url + 'recientes'
      }
      else {
        url = url + 'populares'
      }

      this.$('#status-orden').removeClass('hidden');
      setTimeout(function(){
        Backbone.history.navigate(url, true); 
      }, 1000);
    }
  
  });
});
