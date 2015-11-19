define(function(require) {
var template = require('text!frontend/templates/grid-view.html'), 
    ErrorHelper = require('frontend/helpers/ErrorHelper'),
    Publicaciones = require('frontend/collections/Publicaciones'),
    PublicacionView = require('frontend/views/PublicacionView'),
    Propuestas = require('frontend/collections/Propuestas'),
    Quejas = require('frontend/collections/Quejas');

  return Backbone.View.extend({
    template : _.template(template),
    events : {
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
      if (this.propuestas == true) {
        this.collection = new Propuestas();
      } else {
        this.collection = new Quejas();
      }

      if (this.populares == true){
        this.collection.comparator = function(model) {
          return -(model.get('cantidad_likes') - model.get('cantidad_disLikes'));
        };
      } else {
        this.collection.comparator = function(model) {
          return -((new Date(model.get('fechaCreacion'))).getTime());
        };
      }
	 
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
