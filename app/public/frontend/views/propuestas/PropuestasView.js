define(function(require) {
  var template = require('text!frontend/templates/propuestas/propuestas.html'), 
      Propuestas = require('frontend/collections/Propuestas'),
      PublicacionView = require('frontend/views/PublicacionView'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template : _.template(template),

    render : function() {
      this.$el.html(this.template());

      this.collection = new Propuestas();
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
      
     this.$('#propuestas-container').pinterest_grid({
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

      this.$('#propuestas-container').append(publicacionView.render().el);
    }

  });
});
