define(function(require) {
  var template = require('text!frontend/templates/propuestas/comentario.html');

  return Backbone.View.extend({
    template: _.template(template),
    events: {
    },

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });
});
