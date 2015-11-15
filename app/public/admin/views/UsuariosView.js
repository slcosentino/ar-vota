define(function(require) {
  var template = require('text!admin/templates/usuarios.html'),
      Usuarios = require('admin/collections/Usuarios'),
      UsuarioView = require('admin/views/UsuarioView'),
      ErrorHelper = require('admin/helpers/ErrorHelper');

  return Backbone.View.extend({
    template: _.template(template),

    initialize: function(options) {
      this.candidatos = options.candidatos;
    },

    render: function() {
      this.$el.html(this.template({
        candidatos: this.candidatos
      }));

      this.collection = new Usuarios();
      if (this.candidatos) {
        this.collection.url = this.collection.url + '/candidatos'
      }
      this.listenTo(this.collection, 'reset', this.renderCollection);

      this.collection.fetch({
        reset: true,
        error: function(collection, xhr, options) {
          ErrorHelper.showError(xhr);
        }
      });
      return this;
    },

    renderCollection: function() {
      this.collection.each(function(item) {
        this.renderItem(item);
      }, this);
    },

    renderItem: function(item) {
      var usuarioView = new UsuarioView({
        model: item
      });

      this.$('#usuarios-container').append(usuarioView.render().el);
    }

  });
});
