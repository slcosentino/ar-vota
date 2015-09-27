define(function(require) {
  var template = require('text!admin/templates/respuesta.html');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click #eliminar-respuesta-button': 'eliminarRespuesta'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    initialize: function(options) {
      this.parent = options.parent;
    },

    eliminarRespuesta: function() {
      this.parent.eliminarRespuesta(this.model, this);
      this.close();
    },

    updateModel: function() {
      this.model.set('texto', this.$('#respuesta-input').val());
      return this.model; 
    }
  });
});
