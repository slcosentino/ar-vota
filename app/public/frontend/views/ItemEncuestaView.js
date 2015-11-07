define(function(require) {
  var template = require('text!frontend/templates/item-encuesta.html');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click': 'completarEncuesta',
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    initialize: function() {
    },
    
    completarEncuesta: function() {
      notificaciones.actualizarEncuestaLocal();
      url = '#encuestas/' + this.model.get('id_encuesta') + '/completar';
      Backbone.history.navigate(url, true);
      
    },

  });
});
