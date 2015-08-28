define(function(require) {
  var template = require('text!admin/templates/perfil.html'),
      Usuario = require('admin/models/Usuario'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),

    render: function() {
      this.model = new Usuario();
      this.model.urlRoot = '/api/admin/usuarios/' + this.id_usuario;

      this.listenTo(this.model, 'change', this.renderModel);

      this.model.fetch({
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
      return this;
    },

    renderModel: function() {
      this.$el.html(this.template(this.model.attributes));
    }

  });
});
