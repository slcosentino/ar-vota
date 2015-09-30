define(function(require) {
  var template = require('text!admin/templates/item-encuesta.html');

  return Backbone.View.extend({
    tagName: 'tr',
    template: _.template(template),
    events: {
      'click #preview-button': 'previewEncuesta'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    initialize: function() {
      
    },
    
    previewEncuesta: function() {
      url = '#encuestas/preview/' + this.model.get('id');
      Backbone.history.navigate(url, true);
    }

  });
});
