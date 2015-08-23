define(function(require) {
  var template = require('text!admin/templates/usuario.html');

  return Backbone.View.extend({
    tagName: 'tr',
    template: _.template(template),

    render: function() {
      this.$el.html(this.template(this.model.attributes));
      return this;
    }
  });
});
