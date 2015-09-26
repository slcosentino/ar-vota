define(function(require) {
  var template = require('text!frontend/templates/Propuestas/propuestas.html'),
      Propuestas = require('frontend/collections/Propuestas'),
      PropuestaView = require('frontend/views/Propuestas/PropuestaView'),
      ErrorHelper = require('frontend/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),

    render: function() {
      this.$el.html(this.template());

      this.collection = new Propuestas();
      this.listenTo(this.collection, 'reset', this.renderCollection);


      this.collection.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
      return this;
    },

    renderCollection: function() {
      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);
    },

    renderItem: function(item) {
      var propuestaView = new PropuestaView({
        model: item
      });

      this.$('#propuestas-container').append(propuestaView.render().el);
    }

  });
});
