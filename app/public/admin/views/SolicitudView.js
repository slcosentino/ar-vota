define(function(require) {
  var template = require('text!admin/templates/solicitud.html');

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
      url = '#usuarios/' + this.model.attributes.id_usuario;
      Backbone.history.navigate(url, true);
    }
  });
});
