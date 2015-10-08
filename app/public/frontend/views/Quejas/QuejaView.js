define(function(require) {
  var template = require('text!frontend/templates/Quejas/queja.html');

  return Backbone.View.extend({
    tagName: 'article',    
    template: _.template(template),
    events: {
      'click #abrir-queja-button': 'abrirQueja'
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    },

    abrirQueja: function() {
      url = '#quejas/' + this.model.attributes.id;
      Backbone.history.navigate(url, true);
    }
  });
});
