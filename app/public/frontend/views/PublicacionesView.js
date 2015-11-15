define(function(require) {
var template = require('text!frontend/templates/publicaciones.html'), 
    ErrorHelper = require('frontend/helpers/ErrorHelper'),
    Publicaciones = require('frontend/collections/Publicaciones'),
    PublicacionView = require('frontend/views/PublicacionView'),
    Propuestas = require('frontend/collections/Propuestas'),
    Quejas = require('frontend/collections/Quejas');

  return Backbone.View.extend({
    template : _.template(template),
    events : {
      'change [name=orden]': 'cambiarOrden'
    },

    render : function() {
      if (this.propuestas == true) {
        this.$el.html(this.template({tipo: 'Propuestas'}));
        this.collection = new Propuestas();
      } else {
        this.$el.html(this.template({tipo: 'Quejas'}));
        this.collection = new Quejas();
      }
	  
	  this.collection.comparator = function(model) {
        return -((new Date(model.get('fechaCreacion'))).getTime());
	  };
	  this.collection.sort();
      
	  this.listenTo(this.collection, 'reset', this.renderCollection);

      this.collection.fetch({
        reset : true,
        error : function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
      
	  return this;
    },
	
	cambiarOrden: function() {
	  if($('[name=orden]').val() == 0)
	  {
		this.collection.comparator = function(model) {
          return -(model.get('cantidad_likes'));
	    };
	  }
	  else
	  {
		this.collection.comparator = function(model) {
          return -((new Date(model.get('fechaCreacion'))).getTime());
	    };
	  }

	  this.collection.sort();
	  
      this.$('#publicaciones-container').empty();
	  this.renderCollection();
	},
	
    renderCollection: function() {	
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
