define(function(require) {
  var template = require('text!frontend/templates/completar-encuesta.html'),
      Encuesta = require('frontend/models/Encuesta');


  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

         
    initialize : function(options) {
      this.id_encuesta = options.id_encuesta;
    },
    
    render: function() {
      this.model = new Encuesta();
      this.model.url = this.model.url + '/' + this.id_encuesta;

      this.listenTo(this.model, 'change', this.renderModel);

      this.model.fetch({
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
      return this;
    },

    renderModel: function() {
      this.$el.html(this.template(this.model.attributes));
    },

  });
});
