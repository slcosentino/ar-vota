define(function(require) {
  var template = require('text!frontend/templates/item-encuesta.html');

  return Backbone.View.extend({
   // tagName: 'tr',
    template: _.template(template),
    events: {
      'click #preview-button': 'previewEncuesta',
      'click #editar-button': 'editarEncuesta'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    initialize: function() {
      
    },
    
    previewEncuesta: function() {
      url = '#encuestas/' + this.model.get('id') + '/preview';
      Backbone.history.navigate(url, true);
    },

    editarEncuesta: function() {
      url = '#encuestas/' + this.model.get('id') + '/editar';
      Backbone.history.navigate(url, true);

    }

  });
});
