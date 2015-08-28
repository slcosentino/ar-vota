define(function(require) {
  var template = require('text!admin/templates/bienvenida.html');

  return Backbone.View.extend({
    template: _.template(template),

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
});
