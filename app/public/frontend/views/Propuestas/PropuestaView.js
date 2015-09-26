define(function(require) {
  var template = require('text!frontend/templates/Propuestas/propuesta.html');

  return Backbone.View.extend({
    tagName: 'tr',
    template: _.template(template),
    events: {
      'click #ver-button': 'perfil'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    perfil: function() {
      url = '#propuesta/' + this.model.attributes.id_propuesta;
      Backbone.history.navigate(url, true);
    }
  });
});
