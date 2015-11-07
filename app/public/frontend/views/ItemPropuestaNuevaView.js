define(function(require) {
  var template = require('text!frontend/templates/item-propuesta-nueva.html');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
      'click': 'verPropuestaNueva',
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    initialize: function() {
    },
    
    verPropuestaNueva: function() {
      notificaciones.actualizarPropuestaLocal();
      url = '#propuestas/' + this.model.get('id_objeto');
      Backbone.history.navigate(url, true);
      
    },

  });
});
