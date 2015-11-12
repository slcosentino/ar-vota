define(function(require) {
  var template = require('text!admin/templates/item-encuesta-enviada.html');

  return Backbone.View.extend({
    tagName: 'tr',
    template: _.template(template),
    events: {
      'click #ver-button': 'verEncuesta'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    initialize: function() {
      
    },
    
    verEncuesta: function() {
      url = '#estadisticas/encuestas/' + this.model.get('id');
      Backbone.history.navigate(url, true);
    }
  });
});
