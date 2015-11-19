define(function(require) {
var template = require('text!frontend/templates/quejas-aceptadas.html'), 
    ErrorHelper = require('frontend/helpers/ErrorHelper'),
    QuejasAceptadas = require('frontend/collections/QuejasAceptadas'),
    PublicacionView = require('frontend/views/PublicacionView');

  return Backbone.View.extend({
    template : _.template(template),
    events : {
    },

    initialize: function(options){
      this.id_usuario = options.id_usuario;
    },

    render : function() {
      console.log(this.id_usuario);
      this.$el.html(this.template({id_usuario: this.id_usuario}));
      this.collection = new QuejasAceptadas();
      this.collection.url = this.collection.url + '/' + this.id_usuario;

      this.listenTo(this.collection, 'reset', this.renderCollection);
      
      this.collection.fetch({
        reset : true,
        error : function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
      return this;
    },

    renderCollection: function() {	  
      this.collection.sort();
	  
      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);

      this.$('#publicaciones-container').pinterest_grid({
        no_columns: 4,
        padding_x: 10,
        padding_y: 10,
        margin_bottom: 50,
        single_column_breakpoint: 700
      });
    },

    renderItem: function(item) {
      var publicacionView = new PublicacionView({
        model: item
      });

      this.$('#publicaciones-container').append(publicacionView.render().el);
    }
  });
});
