define(function(require) {
  var template = require('text!frontend/templates/propuestas/propuesta.html');

  return Backbone.View.extend({
    tagName: 'article',    
    template: _.template(template),
    events: {
      'click #abrir-propuesta-button': 'abrirPropuesta'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    abrirPropuesta: function() {
      url = '#propuestas/' + this.model.attributes.id;
      Backbone.history.navigate(url, true);
    }
  });
});
